import type {
  IContentRepository,
  Program,
  BlogPost,
  ResourceCategory,
  ResourceItem,
} from '../../types/content';
import {
  GET_ALL_PROGRAMS_QUERY,
  GET_PROGRAM_BY_SLUG_QUERY,
  GET_ALL_POSTS_QUERY,
  GET_POST_BY_SLUG_QUERY,
  GET_ALL_RESOURCES_QUERY,
} from './queries';
import { StaticStubRepository } from '../content/contentService';

interface WPProgramNode {
  id: string;
  slug: string;
  title: string;
  content?: string;
  programFields?: {
    subtitle?: string;
    badge?: string;
    targetAudience?: string;
    problemBarriers?: Array<{ title?: string; description?: string }>;
    keyOutcomes?: Array<{ outcome?: string }>;
    deliveryFormat?: { duration?: string; mode?: string };
  };
}

interface WPPostNode {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date?: string;
  author?: { node?: { name?: string } };
  categories?: { nodes?: Array<{ name?: string }> };
  featuredImage?: { node?: { sourceUrl?: string } };
}

interface WPResourceNode {
  id: string;
  slug: string;
  title: string;
  resourceFields?: {
    resourceType?: 'Guide' | 'Template' | 'Whitepaper' | 'Assessment' | 'Playbook';
    downloadUrl?: string;
    readingTime?: string;
  };
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class WordPressRepository implements IContentRepository {
  private endpoint: string;
  private fallbackStub: StaticStubRepository;
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private cacheTtlMs: number = 5 * 60 * 1000;

  constructor(endpoint?: string, cacheTtlMs?: number) {
    this.endpoint =
      endpoint ||
      import.meta.env.VITE_WP_GRAPHQL_ENDPOINT ||
      'https://cms.forwardsurge.com/graphql';
    this.fallbackStub = new StaticStubRepository();
    if (cacheTtlMs) this.cacheTtlMs = cacheTtlMs;
  }

  private getCacheKey(query: string, variables: Record<string, unknown>): string {
    return `${query}:${JSON.stringify(variables)}`;
  }

  private async fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
    const key = this.getCacheKey(query, variables);
    const cached = this.cache.get(key) as CacheEntry<T> | undefined;
    const now = Date.now();

    if (cached) {
      const isFresh = now - cached.timestamp < this.cacheTtlMs;
      if (isFresh) {
        return cached.data;
      }
      this.executeNetworkFetch<T>(query, variables, key).catch(() => {});
      return cached.data;
    }

    return this.executeNetworkFetch<T>(query, variables, key);
  }

  private async executeNetworkFetch<T>(
    query: string,
    variables: Record<string, unknown>,
    key: string
  ): Promise<T | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[WordPressRepository] HTTP status ${response.status} from GraphQL endpoint.`);
        return null;
      }

      const json = await response.json();
      if (json.errors) {
        console.warn('[WordPressRepository] GraphQL payload returned errors:', json.errors);
        return null;
      }

      const payload = json.data as T;
      if (payload) {
        this.cache.set(key, { data: payload, timestamp: Date.now() });
      }
      return payload;
    } catch (error) {
      console.warn('[WordPressRepository] Network/Timeout failure during GraphQL fetch:', error);
      return null;
    }
  }

  public async getPrograms(): Promise<Program[]> {
    const responseData = await this.fetchGraphQL<{ programs: { nodes: WPProgramNode[] } }>(
      GET_ALL_PROGRAMS_QUERY
    );

    if (!responseData || !responseData.programs?.nodes?.length) {
      return this.fallbackStub.getPrograms();
    }

    return responseData.programs.nodes.map((node) => this.mapProgramNode(node));
  }

  public async getProgramById(id: string): Promise<Program | undefined> {
    const responseData = await this.fetchGraphQL<{ program: WPProgramNode | null }>(
      GET_PROGRAM_BY_SLUG_QUERY,
      { slug: id }
    );

    if (!responseData || !responseData.program) {
      return this.fallbackStub.getProgramById(id);
    }

    return this.mapProgramNode(responseData.program);
  }

  public async getBlogPosts(): Promise<BlogPost[]> {
    const responseData = await this.fetchGraphQL<{ posts: { nodes: WPPostNode[] } }>(
      GET_ALL_POSTS_QUERY
    );

    if (!responseData || !responseData.posts?.nodes?.length) {
      return this.fallbackStub.getBlogPosts();
    }

    return responseData.posts.nodes.map((node) => this.mapPostNode(node));
  }

  public async getBlogPostByIdOrSlug(identifier: string | number): Promise<BlogPost | undefined> {
    const slugStr = String(identifier);
    const responseData = await this.fetchGraphQL<{ post: WPPostNode | null }>(
      GET_POST_BY_SLUG_QUERY,
      { slug: slugStr }
    );

    if (responseData && responseData.post) {
      return this.mapPostNode(responseData.post);
    }

    const posts = await this.getBlogPosts();
    const matched = posts.find(
      (post) =>
        post.id === identifier ||
        post.slug === identifier ||
        String(post.id) === String(identifier)
    );
    if (matched) return matched;

    return this.fallbackStub.getBlogPostByIdOrSlug(identifier);
  }

  public async getResourceCategories(): Promise<ResourceCategory[]> {
    const responseData = await this.fetchGraphQL<{ resources: { nodes: WPResourceNode[] } }>(
      GET_ALL_RESOURCES_QUERY
    );

    if (!responseData || !responseData.resources?.nodes?.length) {
      return this.fallbackStub.getResourceCategories();
    }

    const resourceItems: ResourceItem[] = responseData.resources.nodes.map((node) => ({
      id: node.id,
      slug: node.slug,
      title: node.title,
      category: node.resourceFields?.resourceType || 'Guide',
      resourceType: node.resourceFields?.resourceType || 'Guide',
      downloadUrl: node.resourceFields?.downloadUrl,
      readingTime: node.resourceFields?.readingTime,
    }));

    return [
      {
        id: 'playbooks',
        title: 'Playbooks',
        description: 'Comprehensive guides to leadership and strategy execution.',
        items: resourceItems.filter((item) => item.resourceType === 'Playbook' || item.resourceType === 'Guide'),
      },
      {
        id: 'templates',
        title: 'Templates',
        description: 'Ready-to-use templates for strategic planning and operations.',
        items: resourceItems.filter((item) => item.resourceType === 'Template'),
      },
      {
        id: 'assessments',
        title: 'Self Assessment Tools',
        description: "Evaluate your organization's readiness and leadership capabilities.",
        items: resourceItems.filter((item) => item.resourceType === 'Assessment' || item.resourceType === 'Whitepaper'),
      },
    ];
  }

  public async getResourceItemByIdOrSlug(identifier: string | number): Promise<ResourceItem | undefined> {
    const categories = await this.getResourceCategories();
    for (const category of categories) {
      const resourceItem = category.items.find(
        (item, index) =>
          item.id === identifier ||
          item.slug === identifier ||
          String(item.id) === String(identifier) ||
          String(index + 1) === String(identifier)
      );
      if (resourceItem) return resourceItem;
    }
    return this.fallbackStub.getResourceItemByIdOrSlug(identifier);
  }

  private mapProgramNode(node: WPProgramNode): Program {
    const fields = node.programFields || {};
    return {
      id: node.slug || node.id,
      slug: node.slug,
      title: node.title,
      subtitle: fields.subtitle || '',
      description: node.content || '',
      problemHeadline: 'Are Barriers Stunting Your Business Growth?',
      problemCopy: fields.targetAudience || '',
      problemBarriers: (fields.problemBarriers || []).map((barrier) => ({
        title: barrier.title || '',
        description: barrier.description || '',
      })),
      solutionHeadline: 'Equip Your Managers to Drive Performance',
      solutionCopy: '',
      overviewHeadline: 'Program Overview',
      overviewCopy: node.content || '',
      overviewList: (fields.keyOutcomes || []).map((outcome) => outcome.outcome || ''),
      ctaHeadline: 'Ready to transform your leadership team?',
      ctaButtonText: 'Request Program Details',
      ctaLink: `/contact?program=${node.slug || node.id}`,
    };
  }

  private mapPostNode(node: WPPostNode): BlogPost {
    return {
      id: node.id,
      slug: node.slug,
      title: node.title,
      excerpt: node.excerpt || '',
      content: node.content || '',
      author: node.author?.node?.name || 'Forward Surge Team',
      date: node.date || new Date().toLocaleDateString(),
      category: node.categories?.nodes?.[0]?.name || 'Leadership',
      image:
        node.featuredImage?.node?.sourceUrl ||
        `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`,
    };
  }
}

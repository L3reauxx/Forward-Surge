import type { LucideIcon } from 'lucide-react';

export type ContentIconKey = 'BookOpen' | 'Compass' | 'Users' | 'Award' | string;

export interface ProgramBarrier {
  title: string;
  description: string;
}

export interface Program {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  iconKey?: ContentIconKey;
  description: string;
  problemHeadline: string;
  problemCopy: string;
  problemBarriers?: ProgramBarrier[];
  solutionHeadline: string;
  solutionCopy: string;
  overviewHeadline: string;
  overviewCopy: string;
  overviewList?: string[];
  ctaHeadline: string;
  ctaButtonText: string;
  ctaLink: string;
  discoveryHeadline?: string;
  discoverySubheadline?: string;
  discoveryDeliverables?: string[];
  discoveryChallenges?: string[];
  durationBadge?: string;
  formatBadge?: string;
}

export interface BlogPost {
  id: number | string;
  slug?: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface ResourceItem {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  resourceType?: 'Guide' | 'Template' | 'Whitepaper' | 'Assessment' | 'Playbook';
  description?: string;
  downloadUrl?: string;
  readingTime?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  items: ResourceItem[];
}

export interface IContentRepository {
  getPrograms(): Promise<Program[]>;
  getProgramById(id: string): Promise<Program | undefined>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostByIdOrSlug(identifier: string | number): Promise<BlogPost | undefined>;
  getResourceCategories(): Promise<ResourceCategory[]>;
  getResourceItemByIdOrSlug(identifier: string | number): Promise<ResourceItem | undefined>;
}

import { programs } from '../../data/programs';
import type {
  IContentRepository,
  Program,
  BlogPost,
  ResourceCategory,
  ResourceItem,
} from '../../types/content';

const staticBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'navigating-leadership-transitions-in-a-complex-world',
    title: 'Navigating Leadership Transitions in a Complex World',
    excerpt: 'How emerging leaders can successfully step into executive roles without losing their authentic edge.',
    author: 'Peril John Alubbe',
    date: 'Jun 15, 2026',
    category: 'Leadership',
    image: `${import.meta.env.BASE_URL}images/executive-speaking.jpg`,
  },
  {
    id: 2,
    slug: 'the-real-cost-of-misaligned-people-strategies',
    title: 'The Real Cost of Misaligned People Strategies',
    excerpt: 'When your talent pipeline doesn\'t match your strategic goals, business suffers. Here is how to realign.',
    author: 'Forward Surge Team',
    date: 'May 28, 2026',
    category: 'Strategy',
    image: `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`,
  },
  {
    id: 3,
    slug: 'board-harmonization-beyond-compliance',
    title: 'Board Harmonization: Beyond Compliance',
    excerpt: 'A functional board is more than just checking boxes. It requires trust, clear communication, and shared vision.',
    author: 'Moses Sitati Munoko',
    date: 'Apr 10, 2026',
    category: 'Governance',
    image: `${import.meta.env.BASE_URL}images/boardroom-meeting.jpg`,
  },
];

const staticResourceCategories: ResourceCategory[] = [
  {
    id: 'playbooks',
    title: 'Playbooks',
    description: 'Comprehensive guides to leadership and strategy execution.',
    items: [
      { id: '1', slug: 'modern-strategy-playbook', title: 'The Modern Strategy Playbook', category: 'Playbooks', resourceType: 'Playbook', description: 'A comprehensive playbook covering modern organizational strategy execution, alignment, and leadership development.' },
      { id: '2', slug: 'change-management-field-guide', title: 'Change Management Field Guide', category: 'Playbooks', resourceType: 'Guide', description: 'Step-by-step field guide for leading transformation initiatives across complex organizational structures.' },
      { id: '3', slug: 'executive-onboarding-blueprint', title: 'Executive Onboarding Blueprint', category: 'Playbooks', resourceType: 'Guide', description: 'Essential frameworks and 90-day action plans for newly appointed C-suite executives and senior managers.' },
      { id: '4', slug: 'board-harmonization-manual', title: 'Board Harmonization Manual', category: 'Playbooks', resourceType: 'Guide', description: 'Best practices for establishing alignment, trust, and productive working relationships across board members.' },
    ],
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Ready-to-use templates for strategic planning and operations.',
    items: [
      { id: '5', slug: 'strategic-priorities-matrix', title: 'Strategic Priorities Matrix', category: 'Templates', resourceType: 'Template', description: 'Practical matrix template to prioritize initiatives and allocate resources effectively across teams.' },
      { id: '6', slug: 'performance-review-template', title: 'Performance Review Template', category: 'Templates', resourceType: 'Template', description: 'Structured performance review evaluation document built around core leadership and growth competencies.' },
      { id: '7', slug: 'quarterly-planning-canvas', title: 'Quarterly Planning Canvas', category: 'Templates', resourceType: 'Template', description: 'Visual canvas framework for mapping quarterly objectives, key milestones, and departmental responsibilities.' },
      { id: '8', slug: 'leadership-branding-worksheet', title: 'Leadership Branding Worksheet', category: 'Templates', resourceType: 'Template', description: 'Interactive worksheet designed to help leaders define and refine their authentic executive presence.' },
    ],
  },
  {
    id: 'assessments',
    title: 'Self Assessment Tools',
    description: "Evaluate your organization's readiness and leadership capabilities.",
    items: [
      { id: '9', slug: 'leadership-3d-assessment', title: 'Leadership 3D Assessment', category: 'Self Assessment', resourceType: 'Assessment', description: 'Comprehensive self-diagnostic tool to assess multidimensional leadership capabilities across complex environments.' },
      { id: '10', slug: 'organizational-culture-audit', title: 'Organizational Culture Audit', category: 'Self Assessment', resourceType: 'Assessment', description: 'Detailed diagnostic survey for evaluating organizational culture, employee engagement, and structural health.' },
      { id: '11', slug: 'strategic-agility-scorecard', title: 'Strategic Agility Scorecard', category: 'Self Assessment', resourceType: 'Assessment', description: 'Scorecard designed to measure team responsiveness, market adaptability, and decision-making speed.' },
      { id: '12', slug: 'executive-presence-inventory', title: 'Executive Presence Inventory', category: 'Self Assessment', resourceType: 'Assessment', description: 'Assessment tool focused on measuring communication clarity, composure under pressure, and interpersonal influence.' },
    ],
  },
];

export class StaticStubRepository implements IContentRepository {
  public async getPrograms(): Promise<Program[]> {
    return Promise.resolve(programs);
  }

  public async getProgramById(id: string): Promise<Program | undefined> {
    const program = programs.find((p) => p.id === id);
    return Promise.resolve(program);
  }

  public async getBlogPosts(): Promise<BlogPost[]> {
    return Promise.resolve(staticBlogPosts);
  }

  public async getBlogPostByIdOrSlug(identifier: string | number): Promise<BlogPost | undefined> {
    const post = staticBlogPosts.find(
      (p) => p.id === identifier || p.slug === identifier || String(p.id) === String(identifier)
    );
    return Promise.resolve(post);
  }

  public async getResourceCategories(): Promise<ResourceCategory[]> {
    return Promise.resolve(staticResourceCategories);
  }

  public async getResourceItemByIdOrSlug(identifier: string | number): Promise<ResourceItem | undefined> {
    for (const category of staticResourceCategories) {
      const resourceItem = category.items.find(
        (item, index) =>
          item.id === identifier ||
          item.slug === identifier ||
          String(item.id) === String(identifier) ||
          String(index + 1) === String(identifier)
      );
      if (resourceItem) return Promise.resolve(resourceItem);
    }
    return Promise.resolve(undefined);
  }
}

import { WordPressRepository } from '../wordpress/wpRepository';

let activeRepository: IContentRepository | null = null;

export function getContentRepository(): IContentRepository {
  if (!activeRepository) {
    const mode = import.meta.env.VITE_CMS_MODE;
    if (mode === 'wordpress') {
      activeRepository = new WordPressRepository();
    } else {
      activeRepository = new StaticStubRepository();
    }
  }
  return activeRepository;
}

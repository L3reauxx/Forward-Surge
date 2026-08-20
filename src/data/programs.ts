import { BookOpen, Compass, Users, Award, LucideIcon } from 'lucide-react';

export type ProgramBarrier = {
  title: string;
  description: string;
};

export type Program = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
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
};

export const programs: Program[] = [
  {
    id: 'lamp',
    title: 'LAMP',
    subtitle: 'Leadership and Management Program',
    icon: BookOpen,
    durationBadge: '6-Month Cohort',
    formatBadge: 'Hybrid • 1-on-1 Coaching',
    description: 'A 6-month journey covering mission-critical areas of management to equip and empower managers to become better leaders who make quality decisions.',
    problemHeadline: 'Are Barriers Stunting Your Business Growth?',
    problemCopy: 'Many organizations face critical roadblocks that prevent scale and success. These include:',
    problemBarriers: [
      {
        title: 'The Vision Barrier',
        description: 'Only a small percentage of the workforce understands the vision and how it relates to daily strategy.'
      },
      {
        title: 'The Management Barrier',
        description: 'Executive teams spend less than one hour per month discussing strategy.'
      },
      {
        title: 'The People & Process Barrier',
        description: 'Do you have the right people in the right seats using the right systems?'
      }
    ],
    solutionHeadline: 'Equip Your Managers to Drive Performance',
    solutionCopy: 'The Leadership and Management Program (LAMP) is designed to equip and empower managers to become better leaders who make quality decisions. We help you effectively and efficiently drive performance, direct productivity, and propel business growth.',
    discoveryHeadline: 'Claim Your Management Readiness Assessment',
    discoverySubheadline: 'A complimentary 30-minute diagnostic session with a Senior Leadership Consultant to audit your management team\'s strategic alignment and execution readiness.',
    discoveryDeliverables: [
      'Management Alignment Diagnostic — Identify where strategic execution currently stalls.',
      'Curriculum Fit Assessment — Pinpoint the exact modules your managers need most.',
      'Customized 6-Month Roadmap — A tailored development plan with measurable milestones.'
    ],
    discoveryChallenges: [
      'Manager-to-leader mindset transition',
      'Strategic misalignment between executives and managers',
      'Team accountability and execution bottlenecks',
      'Delegation and cross-functional friction'
    ],
    overviewHeadline: 'A 6-Month Transformational Journey',
    overviewCopy: 'For training to have a lasting impact, leaders need a sustained curriculum. LAMP is a 6-month journey that covers mission-critical areas of management. Rather than standard classroom training, the LAMP methodology combines high-impact learning with one-on-one coaching to integrate new skills into day-to-day activities. We pair this with peer-to-peer conferences that surface shared experiences and offer vital accountability.',
    overviewList: [
      'Master the Leadership in 3D methodology for strategic execution.',
      'Transition from operational managing to high-impact leadership.',
      'Harmonize team workflows, reduce delegation friction, and enhance accountability.',
      'Combine 1-on-1 executive coaching with peer cohort accountability.'
    ],
    ctaHeadline: 'Want to see the exact modules and frameworks we use to transform managers into strategic leaders?',
    ctaButtonText: 'Download the Full LAMP Curriculum & Syllabus',
    ctaLink: '/contact?program=lamp'
  },
  {
    id: 'bold',
    title: 'BOLD',
    subtitle: 'Business Oversight Leadership Development',
    icon: Compass,
    durationBadge: 'Executive Intensive',
    formatBadge: 'Retreat & Advisory',
    description: 'Designed to help strategic and legacy leaders strip away the noise and cultivate the acute self-awareness necessary to define and own your unique leadership journey.',
    problemHeadline: 'What is the Real Job of a Leader?',
    problemCopy: '"The manager who comes up with the right solution to the wrong problem is more dangerous than the manager who comes up with the wrong solution to the right problem." — Peter F. Drucker\n\nLeadership at the highest level requires immense clarity, and the greatest threat to a strategic leader is a lack of prioritization.',
    solutionHeadline: 'Ruthless Prioritization and Self-Awareness',
    solutionCopy: 'Effective leaders make tough decisions through ruthless prioritization. This critical ability is brought on by an acute sense of self-awareness regarding your capabilities, strengths, and weaknesses.',
    discoveryHeadline: 'Claim Your Strategic Prioritization Audit',
    discoverySubheadline: 'A confidential 30-minute discovery consultation for board members and strategic leaders to identify organizational blind spots and clarify core priorities.',
    discoveryDeliverables: [
      'Strategic Blind-Spot & Noise Audit — Strip away low-leverage distractions.',
      'Ruthless Prioritization Matrix — Align board and C-suite on critical milestones.',
      'Leadership Journey Action Plan — Concrete steps to own your leadership narrative.'
    ],
    discoveryChallenges: [
      'Overwhelmed by competing strategic priorities',
      'Board & executive leadership misalignment',
      'Succession planning & legacy definition',
      'Translating high-level vision into decisive oversight'
    ],
    overviewHeadline: 'Program Overview & Core Focus',
    overviewCopy: 'BOLD (Business Oversight Leadership Development) is designed to help strategic and legacy leaders strip away the noise. We guide you to cultivate the acute self-awareness necessary to define and own your unique leadership journey.',
    overviewList: [
      'Cultivate acute self-awareness to define and own your leadership journey.',
      'Apply the Ruthless Prioritization Matrix to eliminate operational noise.',
      'Align board members and senior executives on high-leverage milestones.',
      'Confidential executive advisory tailored for strategic decision-makers.'
    ],
    ctaHeadline: 'Discover the frameworks we use to help executives define their leadership journey.',
    ctaButtonText: 'Request the BOLD Program Overview',
    ctaLink: '/contact?program=bold'
  },
  {
    id: 'lead-coach',
    title: 'LEAD COACH®',
    subtitle: 'Cultivate the right people-practices',
    icon: Users,
    durationBadge: 'Cohort Workshop',
    formatBadge: 'Interactive Labs & Mentorship',
    description: 'Workshops entirely focused on boosting a leader\'s capacity to foster growth in others by applying the Law of the Harvest.',
    problemHeadline: 'A Team is Only as Strong as Its Growth Environment',
    problemCopy: 'Managing differences, retaining great talent, and identifying barriers to success are some of the hardest challenges a leader will face. Without the right people-practices, even the most talented teams will stagnate.',
    solutionHeadline: 'Cultivate the Right People-Practices',
    solutionCopy: 'LEAD COACH® workshops are entirely focused on boosting a leader\'s capacity to foster growth in others. We teach you how to apply the Law of the Harvest when it comes to your talent: Condition the soil, Sow the seed, Water it, and Reap the harvest.',
    discoveryHeadline: 'Claim Your People-Practices & Coaching Diagnostic',
    discoverySubheadline: 'Evaluate your organization\'s talent environment and discover how embedding coaching conversations accelerates retention and employee engagement.',
    discoveryDeliverables: [
      'Talent Growth Environment Health Check — Audit your current people-practices.',
      'Coaching Capacity Assessment — Measure your leaders\' ability to develop others.',
      'Retention & High-Potential Roadmap — Specific strategies to groom top performers.'
    ],
    discoveryChallenges: [
      'High turnover among top-performing talent',
      'Managers struggling to have constructive coaching conversations',
      'Lack of a structured internal mentorship culture',
      'Siloed development and weak succession pipelines'
    ],
    overviewHeadline: 'Transforming Managers into Mentors',
    overviewCopy: 'Through the proprietary LEAD COACH® framework, your leaders will learn how to:',
    overviewList: [
      'Create a deeply embedded coaching culture.',
      'Sharpen coaching skills to attract and retain top-tier talent.',
      'Facilitate and catalyze crucial conversations.',
      'Groom high-potential performers and orchestrate learning opportunities.'
    ],
    ctaHeadline: 'Ready to transform your leadership team into world-class coaches?',
    ctaButtonText: 'Get the LEAD COACH® Workshop Details',
    ctaLink: '/contact?program=lead-coach'
  },
  {
    id: 'leadxprnc',
    title: 'LEADXPRNC®',
    subtitle: 'Executive Coaching Program',
    icon: Award,
    durationBadge: '8-Month Track',
    formatBadge: '1-on-1 Executive Coaching',
    description: 'A revolutionary and transformational 8-month Executive Coaching program curated around the proprietary Forward Surge 10Ps Leadership Framework.',
    problemHeadline: 'The Executive Isolation Challenge',
    problemCopy: 'For executives and C-suite leaders, maintaining a cutting-edge leadership presence while driving immense corporate performance can be an isolating and overwhelming task. How do you refine your personal influence to inspire an entire organization?',
    solutionHeadline: '8 Months to Executive Transformation',
    solutionCopy: 'LEADXPRNC® is a revolutionary and transformational 8-month Executive Coaching program. Curated around the proprietary Forward Surge 10Ps Leadership Framework, this platform uses personal leadership branding as an instrument for profound change.',
    discoveryHeadline: 'Claim Your Executive Presence & 10Ps Diagnostic',
    discoverySubheadline: 'An exclusive, confidential 30-minute 1-on-1 discovery consultation for C-suite leaders and senior executives exploring the 10Ps Leadership Framework.',
    discoveryDeliverables: [
      '10Ps Framework Diagnostic Scorecard — Assess personal and corporate leadership drivers.',
      'Executive Presence & Gravitas Review — Unpack influence dynamics and perception.',
      '8-Month Leadership Blueprint — A confidential roadmap for sustained transformation.'
    ],
    discoveryChallenges: [
      'Navigating executive isolation at the C-suite level',
      'Amplifying board-level influence and executive gravitas',
      'Balancing operational firefighting with visionary leadership',
      'Aligning personal leadership brand with corporate strategy'
    ],
    overviewHeadline: 'Program Overview & 10Ps Framework',
    overviewCopy: 'Over the course of 8 months, executives dive deep into understanding their personal influence and enhancing their self-awareness to drive both personal and corporate performance. The ultimate goal of LEADXPRNC® is to achieve unmatched competence, productivity, and profitability.',
    overviewList: [
      'Deep-dive immersion into the proprietary Forward Surge 10Ps Leadership Framework.',
      'Refine personal leadership branding to project authentic executive gravitas.',
      'Overcome executive isolation with confidential 1-on-1 strategic advisory.',
      'Drive sustained corporate governance, profitability, and leadership legacy.'
    ],
    ctaHeadline: 'Want to explore the proprietary 10Ps Leadership Framework and see if this coaching program is a fit for you?',
    ctaButtonText: 'Request the LEADXPRNC® Brochure',
    ctaLink: '/contact?program=leadxprnc'
  }
];

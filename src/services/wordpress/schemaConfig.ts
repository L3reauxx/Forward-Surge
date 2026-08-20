export interface WordPressCPTConfig {
  postType: string;
  graphqlSingleName: string;
  graphqlPluralName: string;
  rewriteSlug: string;
  showInGraphql: boolean;
}

export const WORDPRESS_CPT_REGISTRY: Record<string, WordPressCPTConfig> = {
  program: {
    postType: 'program',
    graphqlSingleName: 'program',
    graphqlPluralName: 'programs',
    rewriteSlug: 'programs',
    showInGraphql: true,
  },
  resource: {
    postType: 'resource',
    graphqlSingleName: 'resource',
    graphqlPluralName: 'resources',
    rewriteSlug: 'resources',
    showInGraphql: true,
  },
  post: {
    postType: 'post',
    graphqlSingleName: 'post',
    graphqlPluralName: 'posts',
    rewriteSlug: 'blog',
    showInGraphql: true,
  },
};

export const ACF_FIELD_GROUPS_SPEC = {
  programFields: {
    key: 'group_program_fields',
    title: 'Forward Surge - Program Fields',
    fields: [
      { key: 'field_program_subtitle', name: 'subtitle', type: 'text', required: true },
      { key: 'field_program_badge', name: 'badge', type: 'text', required: false },
      { key: 'field_program_target_audience', name: 'targetAudience', type: 'text', required: false },
      {
        key: 'field_program_problem_barriers',
        name: 'problemBarriers',
        type: 'repeater',
        subFields: [
          { key: 'field_barrier_title', name: 'title', type: 'text' },
          { key: 'field_barrier_desc', name: 'description', type: 'textarea' },
        ],
      },
      {
        key: 'field_program_key_outcomes',
        name: 'keyOutcomes',
        type: 'repeater',
        subFields: [
          { key: 'field_outcome_item', name: 'outcome', type: 'text' },
        ],
      },
      {
        key: 'field_program_delivery_format',
        name: 'deliveryFormat',
        type: 'group',
        subFields: [
          { key: 'field_format_duration', name: 'duration', type: 'text' },
          { key: 'field_format_mode', name: 'mode', type: 'text' },
        ],
      },
    ],
    location: [{ param: 'post_type', operator: '==', value: 'program' }],
    showInGraphql: true,
  },
  resourceFields: {
    key: 'group_resource_fields',
    title: 'Forward Surge - Resource Fields',
    fields: [
      {
        key: 'field_resource_type',
        name: 'resourceType',
        type: 'select',
        choices: {
          Guide: 'Guide',
          Template: 'Template',
          Whitepaper: 'Whitepaper',
          Playbook: 'Playbook',
          Assessment: 'Assessment',
        },
      },
      { key: 'field_resource_download_url', name: 'downloadUrl', type: 'url' },
      { key: 'field_resource_reading_time', name: 'readingTime', type: 'text' },
    ],
    location: [{ param: 'post_type', operator: '==', value: 'resource' }],
    showInGraphql: true,
  },
} as const;

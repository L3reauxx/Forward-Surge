import React from 'react';
import { sanitizeHtml } from '../../utils/security';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
}) => {
  const cleanContent = sanitizeHtml(content);

  return (
    <div
      className={`prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:font-semibold prose-blockquote:border-l-brand-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

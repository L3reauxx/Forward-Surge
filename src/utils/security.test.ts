import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeUrl } from './security';

describe('security utilities', () => {
  describe('sanitizeHtml', () => {
    it('removes script tags and inline event handlers', () => {
      const dirty = '<p>Hello <script>alert("xss")</script><img src="x" onerror="alert(1)" /></p>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('<script>');
      expect(clean).not.toContain('onerror');
      expect(clean).toContain('<img src="x"');
    });

    it('adds rel="noopener noreferrer" and target="_blank" to external links', () => {
      const dirty = '<a href="https://example.com">External Link</a>';
      const clean = sanitizeHtml(dirty);
      expect(clean).toContain('rel="noopener noreferrer"');
      expect(clean).toContain('target="_blank"');
    });

    it('does not add rel/target to relative links', () => {
      const dirty = '<a href="/about">Internal Link</a>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('rel="noopener noreferrer"');
    });
  });

  describe('sanitizeUrl', () => {
    it('allows http, https, mailto, and relative paths', () => {
      expect(sanitizeUrl('https://example.com/path')).toBe('https://example.com/path');
      expect(sanitizeUrl('/programs')).toBe('/programs');
      expect(sanitizeUrl('#contact')).toBe('#contact');
    });

    it('blocks javascript: URLs and falls back to #', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
      expect(sanitizeUrl('  javascript:alert(1)  ')).toBe('#');
    });
  });
});

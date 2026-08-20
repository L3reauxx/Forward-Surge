import DOMPurifyModule from 'dompurify';

function getDOMPurifyInstance() {
  const factoryOrInstance: any = (DOMPurifyModule as any).default || DOMPurifyModule;
  if (factoryOrInstance && typeof factoryOrInstance.addHook === 'function' && typeof factoryOrInstance.sanitize === 'function') {
    return factoryOrInstance;
  }
  if (typeof factoryOrInstance === 'function') {
    if (typeof window !== 'undefined' && window.document) {
      return factoryOrInstance(window);
    }
  }
  return null;
}

const purify = getDOMPurifyInstance();
if (purify && typeof purify.addHook === 'function') {
  purify.addHook('afterSanitizeAttributes', (node: Element) => {
    if (node.tagName === 'A') {
      const href = node.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        node.setAttribute('rel', 'noopener noreferrer');
        node.setAttribute('target', '_blank');
      }
    }
  });
}

export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return '';

  const p = getDOMPurifyInstance();
  if (p && typeof p.sanitize === 'function') {
    return p.sanitize(dirtyHtml, {
      ADD_ATTR: ['target', 'rel'],
      USE_PROFILES: { html: true },
    });
  }

  let cleaned = dirtyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');
  cleaned = cleaned.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    const hrefMatch = attrs.match(/href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (hrefMatch) {
      const href = hrefMatch[2] || hrefMatch[3] || hrefMatch[4];
      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (!attrs.includes('rel=')) attrs += ' rel="noopener noreferrer"';
        if (!attrs.includes('target=')) attrs += ' target="_blank"';
        return `<a${attrs}>`;
      }
    }
    return match;
  });
  return cleaned;
}

export function sanitizeUrl(url: string, fallback: string = '#'): string {
  if (!url) return fallback;

  const trimmed = url.trim();
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }

  try {
    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    const parsed = new URL(trimmed, baseOrigin);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    if (allowedProtocols.includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

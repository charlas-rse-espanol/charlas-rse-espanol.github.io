import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content.
 * 
 * This function uses DOMPurify to sanitize HTML strings from config.ts
 * before they are rendered using Astro's set:html directive.
 * 
 * Allowed tags: a, span, div, br, ul, li, strong, em, i, p
 * Allowed attributes: href, target, rel, style, class
 * 
 * @param dirty - The HTML string to sanitize
 * @returns Sanitized HTML string with only allowed tags and attributes
 */
export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['a', 'span', 'div', 'br', 'ul', 'li', 'strong', 'em', 'i', 'p'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
        ALLOW_UNKNOWN_PROTOCOLS: false, 
    });
}


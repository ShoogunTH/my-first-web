import sanitizeHtml from 'sanitize-html';

export function cleanRichText(input: string): string {
  if (!input) return '';
  return sanitizeHtml(input, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href', 'target'],
    },
  });
}

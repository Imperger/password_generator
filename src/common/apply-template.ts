export function applyTemplate (
  template: string,
  replacements: Record<string, () => string>
): string {
  return template.replace(/(\{+)(\w+)(\}+)/g, (match, l, key, r) => {
    if (l.length !== r.length) return match;

    const count = l.length;
    const resolver = replacements[key];

    if (count % 2 === 0) {
      return '{'.repeat(count / 2) + key + '}'.repeat(count / 2);
    }

    if (!resolver) return match;

    return (
      '{'.repeat(Math.floor(count / 2)) +
      resolver() +
      '}'.repeat(Math.floor(count / 2))
    );
  });
}

export function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsedDate = value.match(/(\[\[)?(?<date>[0-9-]+)(\]\])?/)
  if (!parsedDate || !parsedDate.groups) {
    return undefined;
  }
  return new Date(parsedDate.groups['date']);
}
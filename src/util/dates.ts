export function compareDatesOrNull(
  firstDate: Date | undefined,
  secondDate: Date | undefined
): number {
  const firstDateTime = firstDate?.getTime() ?? 0;
  const secondDateTime = secondDate?.getTime() ?? 0;
  return firstDateTime - secondDateTime;
}

export function diffDateToday(date: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();

  const diffDays = Math.round(
    Math.abs((today.getTime() - date.getTime()) / oneDay)
  );
  return diffDays;
}

export function evaluateFilterPredicate(data: any, filter: string): boolean {
  const filterMap = new Map<string, string>(JSON.parse(filter));

  for (const [key, value] of filterMap.entries()) {
    if (!value || value.trim() === '') continue;

    const cellValue = data[key as keyof any];
    if (cellValue === undefined || cellValue === null) continue;

    //Es werden nur Strings verglichen weil die Filterung auf Textfelder abzielt
    const cellValueStr = String(cellValue).toLowerCase();
    if (!cellValueStr.includes(value.toLowerCase())) {
      return false;
    }
  }
  return true;
}

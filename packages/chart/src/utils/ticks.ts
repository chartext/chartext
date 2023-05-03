function niceNum(range: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;

  const tickInterval = (() => {
    if (round) {
      if (fraction < 1.5) return 1;
      if (fraction < 3) return 2;
      if (fraction < 7) return 5;
    } else {
      if (fraction <= 1) return 1;
      if (fraction <= 2) return 2;
      if (fraction <= 5) return 5;
    }
    return 10;
  })();

  return tickInterval * 10 ** exponent;
}

export function numberTicks(
  min: number,
  max: number,
  maxTicks: number,
): [min: number, max: number, spacing: number] {
  const range = max - min;
  const niceRange = niceNum(range, false);
  const spacing = niceNum(niceRange / (maxTicks - 1), true);
  const niceMin = Math.floor(min / spacing) * spacing;
  const niceMax = Math.ceil(max / spacing) * spacing;

  return [niceMin, niceMax, spacing];
}

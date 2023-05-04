export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number) {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin) + ceilMin);
}

export function randomDate(min: Date, max: Date): Date {
  return new Date(
    min.getTime() + Math.random() * (max.getTime() - min.getTime()),
  );
}

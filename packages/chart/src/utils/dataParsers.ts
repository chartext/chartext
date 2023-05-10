import { CoordType, CoordTypeName } from '@/coord/Coord.types';

export function coordTypeName<T extends CoordType = CoordType>(
  coord: T,
): CoordTypeName | null {
  switch (typeof coord) {
    case 'string': {
      const date = Date.parse(coord);
      if (date) {
        return 'date';
      }

      if (Number.isInteger(coord)) {
        return 'integer';
      }

      const num = Number.parseFloat(coord);
      if (!Number.isNaN(num)) {
        return 'decimal';
      }

      return 'string';
    }
    case 'number':
      if (Number.isInteger(coord)) {
        return 'integer';
      }

      return 'decimal';
    case 'object':
      if (coord instanceof Date) {
        return 'date';
      }
  }

  return null;
}

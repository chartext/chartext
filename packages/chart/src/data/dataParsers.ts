import { CoordType, CoordTypeName } from '@/coord/coord.types';

export function parseCoord(coord: CoordType): CoordTypeName | null {
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
        return 'float';
      }

      return 'string';
    }
    case 'number':
      if (Number.isInteger(coord)) {
        return 'integer';
      }

      return 'float';
    case 'object':
      if (coord instanceof Date) {
        return 'date';
      }
  }

  return null;
}

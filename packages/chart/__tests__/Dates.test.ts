import { describe, expect, it } from 'vitest';
import { DatePart, randomDate, roundDate } from '@/data/Dates';

function mockDates(
  datePart: DatePart,
): [testDate: Date, floorDate: Date, ceilingDate: Date, roundedDate: Date] {
  const testDate = randomDate();
  const floorDate = roundDate(testDate, datePart, 'floor');
  const ceilingDate = roundDate(testDate, datePart, 'ceiling');
  const roundedDate = roundDate(testDate, datePart);

  console.log({
    datePart,
    testDate,
    floorDate,
    ceilingDate,
    roundedDate,
  });

  return [testDate, floorDate, ceilingDate, roundedDate];
}

describe('Dates test', () => {
  it('should round to the nearest [seconds]', () => {
    const datePart: DatePart = 'seconds';
    const [testDate, floorDate, ceilingDate, roundedDate] = mockDates(datePart);

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes(),
        testDate.getSeconds(),
      ),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes(),
        testDate.getSeconds() + 1,
      ),
    );
    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes(),
        testDate.getSeconds() + (testDate.getMilliseconds() < 500 ? 0 : 1),
      ),
    );
  });

  it('should round to the nearest [minutes]', () => {
    const datePart: DatePart = 'minutes';
    const [testDate, floorDate, ceilingDate, roundedDate] = mockDates(datePart);

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes(),
      ),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes() + 1,
      ),
    );
    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
        testDate.getMinutes() + (testDate.getSeconds() < 30 ? 0 : 1),
      ),
    );
  });

  it('should round to the nearest [hours]', () => {
    const datePart: DatePart = 'hours';
    const [testDate, floorDate, ceilingDate, roundedDate] = mockDates(datePart);

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours(),
      ),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours() + 1,
      ),
    );
    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate(),
        testDate.getHours() + (testDate.getMinutes() < 30 ? 0 : 1),
      ),
    );
  });

  it('should round to the nearest [dayOfMonth]', () => {
    const datePart: DatePart = 'dayOfMonth';
    const [testDate, floorDate, ceilingDate, roundedDate] = mockDates(datePart);

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate()),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate() + 1),
    );
    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate() + (testDate.getHours() < 12 ? 0 : 1),
      ),
    );
  });
});

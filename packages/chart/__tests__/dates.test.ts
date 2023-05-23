import { endOfQuarter, startOfQuarter } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { DatePart, MonthIndex, roundDate } from '@chartext/chart/utils/dates';
import { randomDate } from '@chartext/chart/utils/random';

type RandomDatesParams = {
  testDate?: Date;
  datePart: DatePart;
};

function randomDates(
  params: RandomDatesParams,
): [testDate: Date, floorDate: Date, ceilingDate: Date, roundedDate: Date] {
  const {
    testDate = randomDate(
      new Date(2010, MonthIndex.Jan, 1),
      new Date(2020, MonthIndex.Dec, 31),
    ),
    datePart,
  } = params;

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
  it('should round to the nearest [second]', () => {
    const datePart: DatePart = 'second';
    const [testDate, floorDate, ceilingDate, roundedDate] = randomDates({
      datePart,
    });

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

  it('should round to the nearest [minute]', () => {
    const datePart: DatePart = 'minute';
    const [testDate, floorDate, ceilingDate, roundedDate] = randomDates({
      datePart,
    });

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

  it('should round to the nearest [hour]', () => {
    const datePart: DatePart = 'hour';
    const [testDate, floorDate, ceilingDate, roundedDate] = randomDates({
      datePart,
    });

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
    const [testDate, floorDate, ceilingDate, roundedDate] = randomDates({
      datePart,
    });

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate()),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate() + 1,
      ),
    );
    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(
        testDate.getFullYear(),
        testDate.getMonth(),
        testDate.getDate() + (testDate.getHours() < 12 ? 0 : 1),
      ),
    );
  });

  it('should round to the nearest [quarter]', () => {
    const datePart: DatePart = 'quarter';

    const testDate = new Date(2020, MonthIndex.Mar, 5);

    const [, floorDate, ceilingDate] = randomDates({
      testDate,
      datePart,
    });

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      roundDate(startOfQuarter(testDate), 'month', 'floor'),
    );

    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      roundDate(endOfQuarter(testDate), 'month', 'ceiling'),
    );

    /* const expectedRoundDate =
      testDate.getMonth() % 4 < 2
        ? startOfQuarter(testDate)
        : endOfQuarter(testDate);

    expect(roundedDate, `round ${datePart}`).toStrictEqual(expectedRoundDate); */
  });

  it('should round to the nearest [year]', () => {
    const datePart: DatePart = 'year';
    const [testDate, floorDate, ceilingDate, roundedDate] = randomDates({
      datePart,
    });

    expect(floorDate, `round ${datePart} [floor]`).toStrictEqual(
      new Date(testDate.getFullYear(), 0),
    );
    expect(ceilingDate, `round ${datePart} [ceiling]`).toStrictEqual(
      new Date(testDate.getFullYear() + 1, 0),
    );

    expect(roundedDate, `round ${datePart}`).toStrictEqual(
      new Date(testDate.getFullYear() + (testDate.getMonth() < 6 ? 0 : 1), 0),
    );
  });
});

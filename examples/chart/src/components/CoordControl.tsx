import { CoordRange } from '@chartext/chart';
import { SegmentedControl, SegmentedControlProps, Stack } from '@mantine/core';
import { useCallback, useState } from 'react';
import {
  RangeControl,
  RangeControlProps,
  RangeControlTypeName,
} from '@/components/RangeControl';
import { Label } from '@/components/Label';

export type CoordControlValues = {
  typeName: RangeControlTypeName;
  numberRange: CoordRange<number>;
  dateRange: CoordRange<Date>;
};

type CoordControlProps = Omit<RangeControlProps, 'typeName'> & {
  coordTypeProps: Omit<SegmentedControlProps, 'data'>;
};

export function CoordControl(props: CoordControlProps) {
  const { label, numberRangeProps, dateRangeProps, coordTypeProps } = props;

  const [rangeControlTypeName, setRangeControlTypeName] =
    useState<RangeControlTypeName>('number');

  const onChangeCallback = useCallback(
    (value: string, props: Omit<SegmentedControlProps, 'data'>) => {
      setRangeControlTypeName(value as RangeControlTypeName);
      props.onChange?.(value);
    },
    [],
  );

  return (
    <Stack spacing={5}>
      <Label label={label} />
      <SegmentedControl
        {...coordTypeProps}
        size="xs"
        fullWidth
        onChange={(value) => onChangeCallback(value, coordTypeProps)}
        data={[
          { label: 'number', value: 'number' },
          { label: 'date', value: 'date' },
        ]}
      />
      <RangeControl
        typeName={rangeControlTypeName}
        dateRangeProps={dateRangeProps}
        numberRangeProps={numberRangeProps}
      />
    </Stack>
  );
}

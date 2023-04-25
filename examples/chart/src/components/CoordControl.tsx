import { NumberRangeControl } from '@/components/NumberRangeControl';
import { CoordRange, CoordType } from '@chartext/chart';
import {
  NumberInputProps,
  SegmentedControl,
  SegmentedControlProps,
  Stack,
  Text,
} from '@mantine/core';

export type CoordControlValues = {
  coordType: CoordType;
  range: CoordRange<CoordType>;
};

type CoordControlProps = {
  label: string;
  coordTypeProps: Omit<SegmentedControlProps, 'data'>;
  minProps: NumberInputProps;
  maxProps: NumberInputProps;
};

export function CoordControl(props: CoordControlProps) {
  const { label, minProps, maxProps, coordTypeProps } = props;

  return (
    <Stack spacing={5}>
      <Text
        align="center"
        size="xs"
        fw="bold"
      >
        {label}
      </Text>
      <SegmentedControl
        size="xs"
        fullWidth
        data={[
          { label: 'number', value: 'number' },
          { label: 'date', value: 'date' },
        ]}
        {...coordTypeProps}
      />
      <NumberRangeControl
        minProps={minProps}
        maxProps={maxProps}
      />
    </Stack>
  );
}

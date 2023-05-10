import { Group, NumberInput, NumberInputProps, Stack } from '@mantine/core';
import { DatePickerInputProps, DateTimePicker } from '@mantine/dates';
import { ReactElement } from 'react';
import { Label } from '@/components/Label';

export type RangeControlTypeName = 'date' | 'number';

export type RangeProps<T extends NumberInputProps | DatePickerInputProps> = {
  minProps: T;
  maxProps: T;
};

function minMaxControl(
  typeName: RangeControlTypeName,
  dateRangeProps: RangeProps<DatePickerInputProps>,
  numberRangeProps: RangeProps<NumberInputProps>,
): ReactElement {
  switch (typeName) {
    case 'date':
      return (
        <>
          <DateTimePicker
            label="min"
            size="xs"
            {...dateRangeProps.minProps}
          />
          <DateTimePicker
            label="max"
            size="xs"
            {...dateRangeProps.maxProps}
          />
        </>
      );
    case 'number':
      return (
        <>
          <NumberInput
            label="min"
            size="xs"
            hideControls
            {...numberRangeProps.minProps}
          />
          <NumberInput
            label="max"
            size="xs"
            hideControls
            {...numberRangeProps.maxProps}
          />
        </>
      );
  }
}

export type RangeControlProps = {
  label?: string;
  typeName: RangeControlTypeName;
  dateRangeProps: RangeProps<DatePickerInputProps>;
  numberRangeProps: RangeProps<NumberInputProps>;
};

export function RangeControl(props: RangeControlProps) {
  const { label, typeName, dateRangeProps, numberRangeProps } = props;

  return (
    <Stack spacing={0}>
      <Label label={label} />
      <Group spacing={0}>
        {minMaxControl(typeName, dateRangeProps, numberRangeProps)}
      </Group>
    </Stack>
  );
}

import { Group, NumberInput, NumberInputProps, Stack } from '@mantine/core';
import { DatePickerInputProps, DatePickerInput } from '@mantine/dates';
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
          <Group
            spacing={5}
            grow
          >
            <DatePickerInput
              label="min"
              size="xs"
              valueFormat="MM/DD/YYYY"
              {...dateRangeProps.minProps}
            />
            <DatePickerInput
              label="max"
              size="xs"
              valueFormat="MM/DD/YYYY"
              {...dateRangeProps.maxProps}
            />
          </Group>
        </>
      );
    case 'number':
      return (
        <>
          <Group
            spacing={5}
            grow
          >
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
          </Group>
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
      {minMaxControl(typeName, dateRangeProps, numberRangeProps)}
    </Stack>
  );
}

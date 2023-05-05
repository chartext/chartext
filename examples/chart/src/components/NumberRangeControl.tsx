import {
  Group,
  NumberInput,
  NumberInputProps,
  Stack,
  Text,
} from '@mantine/core';

export type NumberRangeControlProps = {
  label?: string;
  minProps: NumberInputProps;
  maxProps: NumberInputProps;
};

export function NumberRangeControl(props: NumberRangeControlProps) {
  const { label, minProps, maxProps } = props;

  return (
    <Stack spacing={0}>
      {label ? (
        <Text
          align="center"
          size="xs"
          fw="bold"
        >
          {label}
        </Text>
      ) : null}
      <Group
        grow
        spacing={5}
      >
        <NumberInput
          label="min"
          size="xs"
          hideControls
          {...minProps}
        />
        <NumberInput
          label="max"
          size="xs"
          hideControls
          {...maxProps}
        />
      </Group>
    </Stack>
  );
}

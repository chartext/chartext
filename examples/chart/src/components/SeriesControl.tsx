import { NumberInput, NumberInputProps, Stack, Text } from '@mantine/core';

type SeriesControlProps = {
  label: string;
  seriesCountProps: NumberInputProps;
  dataCountProps: NumberInputProps;
};

export function SeriesControl(props: SeriesControlProps) {
  const { dataCountProps, label, seriesCountProps } = props;

  return (
    <Stack spacing={0}>
      <Text
        align="center"
        size="xs"
        fw="bold"
      >
        {label}
      </Text>
      <NumberInput
        label="# Series"
        size="xs"
        {...seriesCountProps}
      />
      <NumberInput
        label="# Data"
        size="xs"
        {...dataCountProps}
      />
    </Stack>
  );
}

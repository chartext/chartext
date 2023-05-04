import {
  Group,
  NumberInput,
  NumberInputProps,
  Stack,
  Text,
} from '@mantine/core';

type SeriesControlProps = {
  label: string;
  seriesCountProps: NumberInputProps;
  dataCountProps: NumberInputProps;
};

export type SeriesControlValues = {
  count: number;
  dataCount: number;
};

export function SeriesControl(props: SeriesControlProps) {
  const { dataCountProps, label, seriesCountProps } = props;

  return (
    <Stack spacing={5}>
      <Text
        align="center"
        size="s"
        fw="bold"
      >
        {label}
      </Text>
      <Group
        grow
        spacing={5}
      >
        <NumberInput
          label="# Series"
          size="xs"
          {...seriesCountProps}
        />
        <NumberInput
          label="# Data"
          size="xs"
          hideControls
          {...dataCountProps}
        />
      </Group>
    </Stack>
  );
}

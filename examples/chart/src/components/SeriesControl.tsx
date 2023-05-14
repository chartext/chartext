import { Group, NumberInput, NumberInputProps, Stack } from '@mantine/core';
import { Label } from '@/components/Label';

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
      <Label label={label} />
      <Group
        grow
        spacing={5}
      >
        <NumberInput
          label="# series"
          size="xs"
          {...seriesCountProps}
        />
        <NumberInput
          label="# data"
          size="xs"
          hideControls
          {...dataCountProps}
        />
      </Group>
    </Stack>
  );
}

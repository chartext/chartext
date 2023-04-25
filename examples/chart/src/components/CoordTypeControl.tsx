import { Group, SegmentedControl, SegmentedControlProps, Stack, Text } from '@mantine/core';

type CoordTypeControlProps = Omit<SegmentedControlProps, 'data'> & {
  label: string;
};

export function CoordTypeControl(props: CoordTypeControlProps) {
  const { label } = props;

  return (
    <Stack spacing={0}>
      <Text
        align="center"
        size="xs"
        fw="bold"
      >
        {label}
      </Text>
      <SegmentedControl
        size="xs"
        orientation="vertical"
        fullWidth
        data={[
          { label: 'number', value: 'number' },
          { label: 'date', value: 'date' },
        ]}
        {...props}
      />
    </Stack>
  );
}

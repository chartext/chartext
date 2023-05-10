import { Text } from '@mantine/core';

type LabelProps = {
  label?: string | undefined;
};

export function Label(props: LabelProps) {
  const { label } = props;
  return label ? (
    <Text
      align="center"
      size="xs"
      fw="bold"
    >
      {label}
    </Text>
  ) : null;
}

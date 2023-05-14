import { Text, TextProps } from '@mantine/core';

type LabelProps = TextProps & {
  label?: string | undefined;
};

export function Label(props: LabelProps) {
  const { label } = props;
  return label ? (
    <Text
      align="center"
      size="xs"
      fw="bold"
      {...props}
    >
      {label}
    </Text>
  ) : null;
}

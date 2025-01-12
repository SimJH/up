import React, { type ComponentProps } from 'react';
import { View } from 'dripsy';
import { H3 } from './H3';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'H3',
  component: H3,
} as Meta<typeof H3>;

type H3Props = ComponentProps<typeof H3>;
type H3Story = StoryFn<typeof H3>;

const Template = (args: H3Props) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <H3 {...args} />
  </View>
);

export const Default: H3Story = (args: H3Props) => {
  return <Template {...args} />;
};

Default.args = {
  children: 'Heading 3',
};

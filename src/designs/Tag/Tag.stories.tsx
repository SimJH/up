import React from 'react';
import { View } from 'dripsy';
import { getColors } from 'src/themes/utils';
import { Tag, type TagProps } from './Tag';
import type { Meta } from '@storybook/react';

export default {
  title: 'Tag',
  component: Tag,
  args: {},
  argTypes: {
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      description: '태그 라벨',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    color: {
      name: 'color',
      description: '태그 색상',
      type: { name: 'string', required: true },
      options: getColors(),
      control: { type: 'select' },
    },
  },
} as Meta<typeof Tag>;

const Template = (args: TagProps) => (
  <View sx={{ padding: '$04', flexDirection: 'row' }}>
    <Tag {...args} />
  </View>
);

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  label: 'Tag',
  color: '$blue',
};

export const Tags = () => (
  <View sx={{ padding: '$04', flexDirection: 'row', gap: '$02' }}>
    <Tag color="$red" label="Red" />
    <Tag color="$yellow" label="Yellow" />
    <Tag color="$blue" label="Blue" />
  </View>
);

import type { Meta, StoryObj } from "@storybook/react";

import Header from "./header";

const meta: Meta<typeof Header> = {
  title: "ui/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {
  name: "Header",
  args: {
    title: "서비스 이름",
  },
};

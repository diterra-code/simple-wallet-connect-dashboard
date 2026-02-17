import type { Meta, StoryObj } from '@storybook/react';
import Footer from "./footer";

const FooterWithMocks = () => {
  return <Footer />;
};

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#FF6B35' }, // primary-orange approximation
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        {/* Simulate page content above footer */}
        <div className="h-96 bg-gray-100 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Page Content Above</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Footer>;

// Default Footer
export const Default: Story = {
  render: () => <FooterWithMocks />,
};

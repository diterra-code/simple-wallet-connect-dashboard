/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable storybook/no-redundant-story-name */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 16, max: 128, step: 8 },
      description: "Size of the logo in pixels",
    },
    color: {
      control: { type: "radio" },
      options: [undefined, "orange", "blue", "jade", "white"],
      description: "Color variant of the logo",
    },
    variant: {
      control: { type: "radio" },
      options: [undefined, "square", "line"],
      description: "Variant of the logo",
    },
    text: {
      control: "text",
      description: "Optional text to display next to the logo",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Default logo (no color, square, or line specified)
 */
export const Default: Story = {
  args: {
    size: 32,
  },
};

/**
 * Showcase of all color variants
 */
export const Colors: Story = {
  name: "All Colors",
  render: () =>
    React.createElement(
      "div",
      {
        className: "flex items-center gap-6 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "orange" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "blue" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "jade" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "white" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White"
        )
      )
    ),
};

/**
 * Showcase of square variants
 */
export const SquareVariants: Story = {
  name: "Square Variants",
  render: () =>
    React.createElement(
      "div",
      {
        className: "flex items-center gap-6 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "orange",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange Square"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "blue",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue Square"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "jade",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade Square"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "white",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White Square"
        )
      )
    ),
};

/**
 * Showcase of logo with text
 */
export const WithText: Story = {
  name: "With Text",
  render: () =>
    React.createElement(
      "div",
      {
        className: "flex items-center gap-6 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, text: "Bread" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Default with Text"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "blue", text: "Bread" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue with Text"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          variant: "square",
          text: "Bread",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Square with Text"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "jade",
          variant: "line",
          text: "Bread",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade Line with Text"
        )
      )
    ),
};

/**
 * Showcase of line variants
 */
export const LineVariant: Story = {
  name: "Line Variants",
  render: () =>
    React.createElement(
      "div",
      {
        className: "flex items-center gap-6 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange Line"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "blue", variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue Line"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "jade", variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade Line"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "white",
          variant: "line",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White Line"
        )
      )
    ),
};

/**
 * Complete showcase of all variants
 */
export const AllVariants: Story = {
  name: "All Variants",
  render: () =>
    React.createElement(
      "div",
      {
        className: "grid grid-cols-2 gap-8 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      // Default
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Default"
        )
      ),
      // Orange
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "orange" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange"
        )
      ),
      // Orange Square
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "orange",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange Square"
        )
      ),
      // Blue
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "blue" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue"
        )
      ),
      // Blue Square
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "blue",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue Square"
        )
      ),
      // Jade
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "jade" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade"
        )
      ),
      // Jade Square
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "jade",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade Square"
        )
      ),
      // Orange Line
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Orange Line"
        )
      ),
      // Blue Line
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "blue", variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Blue Line"
        )
      ),
      // Jade Line
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "jade", variant: "line" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "Jade Line"
        )
      ),
      // White
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32, color: "white" }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White"
        )
      ),
      // White Square
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "white",
          variant: "square",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White Square"
        )
      ),
      // White Line
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, {
          size: 32,
          color: "white",
          variant: "line",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "White Line"
        )
      )
    ),
};

/**
 * Showcase of different sizes
 */
export const Sizes: Story = {
  name: "Different Sizes",
  render: () =>
    React.createElement(
      "div",
      {
        className: "flex items-center gap-6 p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 16 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "16px"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 24 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "24px"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 32 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "32px"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 48 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "48px"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col items-center gap-2" },
        React.createElement(Logo, { size: 64 }),
        React.createElement(
          "span",
          { className: "text-sm text-gray-600" },
          "64px"
        )
      )
    ),
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  name: "Playground (Controls)",
  args: {
    size: 32,
    color: undefined,
    variant: undefined,
    text: undefined,
    className: "",
  },
  render: (args) =>
    React.createElement(
      "div",
      {
        className: "flex items-center justify-center p-8",
        style: { backgroundColor: "#f5f5f5" },
      },
      React.createElement(Logo, args)
    ),
};

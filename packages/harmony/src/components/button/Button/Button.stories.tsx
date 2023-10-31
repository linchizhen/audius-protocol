import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/testing-library'

import { Flex } from 'components/layout'
import { Text } from 'components/typography'

import { ButtonProps, ButtonSize, ButtonType } from '../types'

import { Button } from './Button'

const baseProps: ButtonProps = {
  children: 'Click Me'
}

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Button',
  component: Button,
  render: (props: ButtonProps) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
        <Button {...baseProps} size={ButtonSize.SMALL} {...props} />
        <Button {...baseProps} size={ButtonSize.DEFAULT} {...props} />
        <Button {...baseProps} size={ButtonSize.LARGE} {...props} />
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
        <Button {...baseProps} size={ButtonSize.SMALL} {...props} disabled />
        <Button {...baseProps} size={ButtonSize.DEFAULT} {...props} disabled />
        <Button {...baseProps} size={ButtonSize.LARGE} {...props} disabled />
      </div>
    </div>
  )
}

export default meta

type Story = StoryObj<typeof Button>

// Primary
export const Primary: Story = {
  render: (props: ButtonProps) => <Button {...props}>Button</Button>
}

export const Variants: Story = {
  render: () => (
    <Flex gap='3xl'>
      <Button variant={ButtonType.PRIMARY}>Primary</Button>
      <Button variant={ButtonType.SECONDARY}>Secondary</Button>
      <Button variant={ButtonType.TERTIARY}>Tertiary</Button>
      <Button variant={ButtonType.DESTRUCTIVE}>Destructive</Button>
    </Flex>
  )
}

export const Sizes: Story = {
  render: () => (
    <Flex gap='3xl' alignItems='end'>
      <Flex direction='column' alignItems='center' gap='m'>
        <Button size={ButtonSize.SMALL}>Small</Button>
        <Text>32px</Text>
      </Flex>

      <Flex direction='column' alignItems='center' gap='m'>
        <Button size={ButtonSize.DEFAULT}>Medium</Button>
        <Text>48px</Text>
      </Flex>
      <Flex direction='column' alignItems='center' gap='m'>
        <Button size={ButtonSize.LARGE}>Large</Button>
        <Text>64px</Text>
      </Flex>
    </Flex>
  )
}

// Primary w/ color
export const PrimaryWithColor: Story = { args: { hexColor: '#13C65A' } }

// Secondary
export const Secondary: Story = {
  args: { variant: ButtonType.SECONDARY }
}

// Tertiary
export const Tertiary: Story = { args: { variant: ButtonType.TERTIARY } }

// Destructive
export const Destructive: Story = { args: { variant: ButtonType.DESTRUCTIVE } }

// Hidden text at certain widths (e.g. mobile layouts)
export const HiddenTextAtWidth: Story = { args: { widthToHideText: 900 } }

export const Link: Story = {
  args: { asChild: true },
  render: (props: ButtonProps) => {
    return (
      <Button {...props} asChild>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault()
          }}
          style={{ textDecorationLine: 'unset' }}
        >
          Click Me
        </a>
      </Button>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: /click me/i })
    ).toBeInTheDocument()
  }
}

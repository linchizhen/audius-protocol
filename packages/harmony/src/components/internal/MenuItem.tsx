import { forwardRef, MouseEventHandler, Ref, useCallback } from 'react'

import { CSSObject } from '@emotion/react'

import { ButtonProps } from 'components'
import { BaseButton } from 'components/button/BaseButton/BaseButton'
import { IconComponent } from 'components/icon'
import { Text } from 'components/text/Text'
import { useTheme } from 'foundations'

export type MenuItemProps<Value extends string> = Omit<
  ButtonProps,
  'variant' | 'onChange'
> & {
  variant?: 'option' | 'button'
  label?: string
  icon?: IconComponent
  leadingElement?: JSX.Element
  isActive?: boolean
} & (
    | {
        variant: 'option'
        onChange: (option: Value) => void
        value: Value
      }
    | { variant: 'button' }
  )

export const MenuItem = forwardRef(function <Value extends string>(
  props: MenuItemProps<Value>,
  ref: Ref<HTMLButtonElement>
) {
  const { label, isActive, onClick, icon, leadingElement, variant, ...other } =
    props

  const { color, cornerRadius, spacing, typography } = useTheme()

  // Popup Styles
  const optionIconCss: CSSObject = {
    width: spacing.unit4,
    height: spacing.unit4
  }

  const activeOptionCss: CSSObject = {
    transform: 'none',
    backgroundColor: color.secondary.s300,
    color: color.static.white
  }

  const optionCss: CSSObject = {
    height: variant === 'option' ? 36 : 40,
    background: 'transparent',
    border: 'none',
    color: color.text.default,
    fontWeight: typography.weight.medium,
    gap: spacing.s,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    paddingTop: spacing.s,
    paddingBottom: spacing.s,
    width: '100%',
    borderRadius: cornerRadius.s,
    justifyContent: 'flex-start',

    '&:hover': activeOptionCss,
    '&:active': {
      transform: 'none'
    }
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation()
      onClick?.(e)

      if (variant === 'option') {
        props.onChange(props.value)
      }
    },
    [onClick, props, variant]
  )

  return (
    <BaseButton
      ref={ref}
      iconLeft={icon}
      styles={{
        button: {
          ...optionCss,
          ...(isActive ? activeOptionCss : {})
        },
        icon: optionIconCss
      }}
      onClick={handleClick}
      role={variant === 'option' ? 'option' : undefined}
      {...other}
      onChange={undefined}
    >
      {leadingElement ?? null}
      <Text
        variant='body'
        size={variant === 'option' ? 'l' : 'm'}
        strength={variant === 'button' ? 'strong' : 'default'}
      >
        {variant === 'option' ? label ?? props.value : label}
      </Text>
    </BaseButton>
  )
})

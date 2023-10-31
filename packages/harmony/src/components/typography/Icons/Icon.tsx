import type { ComponentType, SVGProps } from 'react'

import cn from 'classnames'

import type { ColorValue } from 'types/colors'
import { toCSSVariableName } from 'utils/styles'

import styles from './Icon.module.css'

// TODO use emotion theme's spacing and colors to generate the types here

type IconSize =
  | 'xxSmall' // 12
  | 'xSmall' // 14
  | 'small' // 16
  | 'medium' // 20
  | 'large' // 24
  | 'xLarge' // 30
  | 'xxLarge' // 32
  | 'xxxLarge' // 40

type IconProps = {
  color?: ColorValue
  size?: IconSize
} & SVGProps<SVGSVGElement>

export type IconComponent = ComponentType<IconProps>

/** Renders a harmony Icon component
 * Ex: `<Icon icon={IconKebabHorizontal} color='accentGreen' />`
 * Use `size` to render one of the standard sizes:
 * - xSmall: 14
 * - small: 16
 * - medium: 20
 * - large: 24
 * - xLarge: 30
 * - xxLarge: 32
 * - xxxLarge: 40
 */
export const Icon = (props: IconProps) => {
  const {
    className,
    color,
    children,
    size = 'large',
    style: styleProp,
    ...iconProps
  } = props

  const style = color
    ? {
        ...styleProp,
        '--icon-color': `var(${toCSSVariableName(color)})`
      }
    : styleProp

  const childProps = {
    ...iconProps,
    className: cn(
      styles.icon,
      { [styles.iconColor]: color },
      styles[size],
      className
    ),
    style
  }

  return <svg {...childProps}>{children}</svg>
}

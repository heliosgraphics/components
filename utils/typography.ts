import { getColor } from "../utils/color"
import { getTypographyUtility as getFUITypographyUtility } from '@heliosgraphics/library/utils/typography'
import type { FUITypographyUtility } from '@heliosgraphics/library/types/typography'

export const getTypographyUtility = (
  props: FUITypographyUtility,
  isHeader?: boolean
): string => {
  const typoClasses: Array<string> = getFUITypographyUtility(props).split(' ')

  // Classname
  if (props.className) typoClasses.push(props.className)

  // Colors
  const defaultColor = isHeader ? "fui-color-800" : "fui-color-700"
  const color: string | undefined = getColor(props.color)

  if (!!color) typoClasses.push(color)
  else typoClasses.push(defaultColor)

  return typoClasses.join(" ")
}

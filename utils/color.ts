import { getColor as getFUIColor } from '@heliosgraphics/library/utils/colors'
import type { FUIColors } from '@heliosgraphics/library/types/colors'

export const getColor = (
  color?: FUIColors,
  colorTone: 100 | 300 | 500 | 700 | 900 = 500,
  defaultClass?: string
): string | undefined => {
  const fuiColor: string | undefined = getFUIColor(color as FUIColors, colorTone)

  // Get the FUI
  if (!!fuiColor) return fuiColor;

  // Our fall back to Sora favours
  switch (color) {
    case "sora": return 'color-sora-primary'
    case "gray-25": return "gray-25"
    case "gray-50": return "gray-50"

    default: return !!defaultClass ? defaultClass : undefined
  }
}

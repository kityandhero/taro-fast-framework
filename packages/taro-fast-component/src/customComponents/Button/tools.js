import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isString,
} from 'easy-soft-utility';

import { handleInlayColor, transformSize } from 'taro-fast-common';

export function getStyle({
  backgroundColor = '',
  fill = 'solid',
  fontColor = '',
  borderColor = '',
  fontSize = 0,
  shadow = true,
  shadowColor = '',
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  borderRadius = 0,
}) {
  const sharpStyle = {
    ...(paddingTop > 0 ? { '--padding-top': transformSize(paddingTop) } : {}),
    ...(paddingBottom > 0
      ? { '--padding-bottom': transformSize(paddingBottom) }
      : {}),
    ...(paddingLeft > 0
      ? { '--padding-left': transformSize(paddingLeft) }
      : {}),
    ...(paddingRight > 0
      ? { '--padding-right': transformSize(paddingRight) }
      : {}),
    ...(borderRadius > 0
      ? { '--border-radius': transformSize(borderRadius) }
      : {}),
  };

  if (isString(backgroundColor)) {
    let color = backgroundColor;
    let shadowColorAdjust = shadowColor;

    if (checkStringIsNullOrWhiteSpace(color)) {
      return { ...sharpStyle };
    }

    color = handleInlayColor(color);

    if (color !== backgroundColor) {
      shadowColorAdjust = `var(--tfc-color-shadow-size) var(--tfc-color-${backgroundColor}-shadow)`;
    }

    if (fill === 'solid') {
      return {
        ...{
          '--background-color': color,
          '--border-color': 'transparent',
        },
        ...(checkStringIsNullOrWhiteSpace(fontColor)
          ? color !== backgroundColor
            ? { '--text-color': 'var(--tfc-color-white)' }
            : {}
          : {
              '--text-color': fontColor,
            }),
        ...(fontSize > 0 ? { '--font-size': transformSize(fontSize) } : {}),
        ...(shadow && !checkStringIsNullOrWhiteSpace(shadowColorAdjust)
          ? { boxShadow: shadowColorAdjust }
          : {}),
        ...sharpStyle,
      };
    }

    if (fill === 'outline') {
      return {
        ...{
          '--background-color': 'transparent',
          '--border-color': checkStringIsNullOrWhiteSpace(borderColor)
            ? color !== backgroundColor
              ? color
              : handleInlayColor('back')
            : borderColor,
        },
        ...(checkStringIsNullOrWhiteSpace(fontColor)
          ? color !== backgroundColor
            ? { '--text-color': color }
            : {}
          : {
              '--text-color': fontColor,
            }),
        ...(fontSize > 0 ? { '--font-size': transformSize(fontSize) } : {}),
        ...(shadow && !checkStringIsNullOrWhiteSpace(shadowColorAdjust)
          ? { boxShadow: shadowColorAdjust }
          : {}),
        ...sharpStyle,
      };
    }

    if (fill === 'none') {
      return {
        ...{
          '--background-color': 'transparent',
          '--border-color': 'transparent',
        },
        ...(checkStringIsNullOrWhiteSpace(fontColor)
          ? color !== backgroundColor
            ? { '--text-color': color }
            : {}
          : {
              '--text-color': fontColor,
            }),
        ...(fontSize > 0 ? { '--font-size': transformSize(fontSize) } : {}),
        ...sharpStyle,
      };
    }

    return {
      ...(fontSize > 0 ? { '--font-size': transformSize(fontSize) } : {}),
      ...sharpStyle,
    };
  }

  if (isArray(backgroundColor)) {
    const a = backgroundColor.filter(
      (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
    );

    if (a.length > 0) {
      return {
        ...{
          '--background-image': `linear-gradient(45deg, ${handleInlayColor(
            a,
          ).join()})`,
        },
        ...sharpStyle,
      };
    }
  }

  return {
    ...(checkStringIsNullOrWhiteSpace(fontColor)
      ? {}
      : {
          '--text-color': fontColor,
        }),
    ...sharpStyle,
  };
}

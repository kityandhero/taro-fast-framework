import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isNumber,
  toNumber,
  toString,
} from 'easy-soft-utility';

/**
 * handle inlay color
 * @param {String} color the color will handle
 * @param {String} suffix if color is inlay color, default is "", suffix will add to result when it is not empty
 */
export function handleInlayColor(color, suffix = '') {
  return checkInCollection(
    [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'cyan',
      'blue',
      'purple',
      'mauve',
      'pink',
      'brown',
      'grey',
      'gray',
      'black',
    ],
    color,
  )
    ? `var(--tfc-color-${color}${
        checkStringIsNullOrWhiteSpace(suffix) ? '' : suffix
      })`
    : color;
}

/**
 * transform size
 * @param {Number} size
 * @returns
 */
export function transformSize(size) {
  if (isNumber(size)) {
    const s = toNumber(size);

    if (s >= -2000 && s <= 2000) {
      if (s === 0) {
        return '0';
      }

      if (s > 0) {
        let v = Math.round(s);

        v = v === 0 ? v + 1 : v;

        return `var(--tfc-${v})`;
      } else {
        let v = Math.round(Math.abs(s));

        v = v === 0 ? v + 1 : v;

        return `calc(var(--tfc-${v}) * -1)`;
      }
    }

    return `${s}px`;
  }

  return toString(size);
}

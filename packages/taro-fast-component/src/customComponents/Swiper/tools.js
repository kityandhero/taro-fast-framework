import { checkInCollection } from 'easy-soft-utility';

const transformCollection = ['slide'];

export const classPrefix = `tfc-swiper`;

/**
 * 校验参数
 * @param {*} transform
 * @returns
 */
export function checkTransform(transform) {
  return checkInCollection(transformCollection, transform)
    ? transform
    : 'slide';
}

import { inCollection } from 'taro-fast-common/es/utils/tools';

const transformCollection = ['slide'];

export const classPrefix = `tfc-swiper`;

/**
 * 校验参数
 * @param {*} transform
 * @returns
 */
export function checkTransform(transform) {
  return inCollection(transformCollection, transform) ? transform : 'slide';
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}

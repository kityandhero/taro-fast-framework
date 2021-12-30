export function seededRandom({ seed, min, max }: {
    seed: any;
    min: any;
    max: any;
}): any;
/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({ seed, hue, luminosity, count, format, alpha, }: any): string;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport(): {};

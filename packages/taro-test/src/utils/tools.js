export function seededRandom({ seed, min, max }) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;

  return minValue + rnd * (maxValue - minValue);
}

/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({
  seed,
  hue = null,
  luminosity = null,
  count = null,
  format = null,
  alpha = null,
}) {
  return `#${`00000${((seededRandom(seed) * 0x1000000) << 0).toString(
    16
  )}`.substr(-6)}`;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}

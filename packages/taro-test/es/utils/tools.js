function seededRandom(_ref) {
  var seed = _ref.seed,
      min = _ref.min,
      max = _ref.max;
  var maxValue = max || 1;
  var minValue = min || 0;
  var seedValue = (seed * 9301 + 49297) % 233280;
  var rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}
/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */

function getRandomColor(_ref2) {
  var seed = _ref2.seed,
      _ref2$hue = _ref2.hue,
      _ref2$luminosity = _ref2.luminosity,
      _ref2$count = _ref2.count,
      _ref2$format = _ref2.format,
      _ref2$alpha = _ref2.alpha;
  return "#".concat("00000".concat((seededRandom(seed) * 0x1000000 << 0).toString(16)).substr(-6));
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function emptyExport() {
  return {};
}

export { emptyExport, getRandomColor, seededRandom };

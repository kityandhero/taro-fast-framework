import { request } from '../utils/requestAssistor';

export async function getWeatherData(params) {
  return request({
    api: `https://wis.qq.com/weather/common`,
    urlParams: params,
    method: 'GET',
  });
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

import {
  checkStringIsNullOrWhiteSpace,
  navigateTo,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { QQMapKey } from '../../customConfig';
import QQMapWX from '../../libs/qqmap-wx-jssdk.min';

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getQQMapWX() {
  const key = QQMapKey;

  if (checkStringIsNullOrWhiteSpace(key)) {
    throw new Error(
      '未配置腾讯地图key, 请在 "customConfig/custom/constants.js" 中配置常量 "QQMapKey"',
    );
  }

  const mapSdk = new QQMapWX({ key });

  return mapSdk;
}

export function goToGeneralWebPage({ path, title, url }) {
  if (checkStringIsNullOrWhiteSpace(url)) {
    const text = '缺少目标页面地址, 无法跳转';

    showSimpleErrorMessage(text);

    return;
  }

  const titleEncode = encodeURIComponent(title || '');
  const urlEncode = encodeURIComponent(url);

  navigateTo(`${path}?title=${titleEncode}&url=${urlEncode}`);
}

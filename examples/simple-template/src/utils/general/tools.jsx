import { View } from '@tarojs/components';

import {
  canToNumber,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  navigateTo,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { ImageBox, Space } from 'taro-fast-component';

import { jsonItemTypeCollection, QQMapKey } from '../../customConfig';
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

function buildItem(o) {
  if ((o || null) == null) {
    return null;
  }

  const { key, type, value } = {
    key: '',
    type: '',
    value: '',
    ...o,
  };

  if (checkStringIsNullOrWhiteSpace(value)) {
    return null;
  }

  if (!canToNumber(type)) {
    return null;
  }

  const typeValue = toNumber(type);

  if (
    checkInCollection(
      [jsonItemTypeCollection.text, jsonItemTypeCollection.multiText],
      typeValue,
    )
  ) {
    return (
      <View
        key={key}
        style={{
          textIndent: transformSize(2),
          marginTop: transformSize(5),
          marginBottom: transformSize(5),
        }}
      >
        {value}
      </View>
    );
  }

  if (checkInCollection([jsonItemTypeCollection.image], typeValue)) {
    return (
      <View
        style={{
          marginTop: transformSize(10),
          marginBottom: transformSize(10),
        }}
      >
        <ImageBox showMode="pure" src={value} />
      </View>
    );
  }

  return null;
}

export function ContentStructureBox({ list = [] }) {
  if (!isArray(list)) {
    const text = '构建数据格式无效';

    showSimpleErrorMessage(text);

    return null;
  }

  if (isEmptyArray(list)) {
    return null;
  }

  const listData = list.map((item, index) => {
    return { ...item, key: `item_${index}` };
  });

  if (list.length === 0) {
    return null;
  }

  return (
    <>
      <Space direction="vertical" size={4} fillWidth>
        {listData.map((o) => {
          return buildItem(o);
        })}
      </Space>
    </>
  );
}

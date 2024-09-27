import { whetherString, zeroString } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

export const fontFamilyStyle = {
  // fontFamily: 'fangsong',
};

export const colorDefault = '#000';

export const colorStyle = {
  color: colorDefault,
};

export const lineStyle = {};

export const documentTitleStyle = {
  fontSize: transformSize(36),
};

export const labelFrontStyle = {
  fontSize: transformSize(28),
  lineHeight: transformSize(36),
};

export const valueFrontStyle = {
  fontSize: transformSize(28),
  lineHeight: transformSize(36),
};

export const highlightModeCollection = {
  none: 'none',
  label: 'label',
  value: 'value',
  all: 'all',
};

export const currencyDisplayStyle = {
  borderBottom: `${transformSize(2)} solid #999`,
};

export const defaultConfig = {
  labelWidth: '180',
  width: zeroString,
  minHeight: '50',
  // height: 'auto',
  fullLine: whetherString.yes,
  currencyDisplay: whetherString.no,
  firstPosition: whetherString.no,
  enumList: [],
};

export const valueDisplayModeCollection = {
  text: 'text',
  enum: 'enum',
};

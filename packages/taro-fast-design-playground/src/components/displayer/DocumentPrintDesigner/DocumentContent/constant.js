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
  fontSize: transformSize(34),
  lineHeight: transformSize(54),
  paddingBottom: transformSize(10),
};

export const labelFrontStyle = {
  fontSize: transformSize(30),
  lineHeight: transformSize(38),
  paddingTop: transformSize(6),
  paddingBottom: transformSize(6),
};

export const valueFrontStyle = {
  fontSize: transformSize(30),
  lineHeight: transformSize(38),
  paddingTop: transformSize(6),
  paddingBottom: transformSize(6),
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
  minHeight: '70',
  // height: 'auto',
  fullLine: whetherString.yes,
  currencyDisplay: whetherString.no,
  firstPosition: whetherString.no,
  enumList: [],
  lineStyle: {},
};

export const valueDisplayModeCollection = {
  text: 'text',
  enum: 'enum',
};

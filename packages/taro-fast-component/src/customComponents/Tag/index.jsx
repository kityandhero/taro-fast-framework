import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  mergeProps,
  withNativeProps,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import './index.less';

const classPrefix = `tfc-tag`;

const colorRecord = {
  default: '#666666',
  primary: 'var(--tfc-color-primary, #1677ff)',
  success: 'var(--tfc-color-success, #00b578)',
  warning: 'var(--tfc-color-warning, #ff8f1f)',
  danger: 'var(--tfc-color-danger, #ff3141)',
};

const colorCollection = ['default', 'primary', 'success', 'warning', 'danger'];

const fillCollection = ['solid', 'outline'];

const defaultProps = {
  color: 'default',
  fill: 'solid',
  round: false,
  style: {},
  onClick: null,
};

export const Tag = (p) => {
  const props = mergeProps(defaultProps, p);

  const {
    color: colorSource,
    fill: fillSource,
    round,
    style: styleOther,
    onClick,
  } = props;

  const color = inCollection(colorCollection, colorSource)
    ? colorRecord[colorSource]
    : colorSource;

  const fill = inCollection(fillCollection, fillSource) ? fillSource : 'solid';

  const style = {
    ...{
      '--border-color': color,
      '--text-color': fill === 'outline' ? color : '#ffffff',
      '--background-color': fill === 'outline' ? 'transparent' : color,
    },
    ...styleOther,
  };

  return withNativeProps(
    props,
    <View
      style={style}
      onClick={() => {
        if (isFunction(onClick)) {
          onClick();
        }
      }}
      className={classNames(classPrefix, {
        [`${classPrefix}-round`]: round,
      })}
    >
      {props.children}
    </View>,
  );
};

Tag.defaultProps = {
  ...defaultProps,
};

import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  withNativeProps,
  mergeProps,
} from 'taro-fast-common/es/utils/tools';

import ActivityIndicator from '../ActivityIndicator';

const classPrefix = `tfc-button`;

const colorCollection = ['default', 'primary', 'success', 'warning', 'danger'];
const fillCollection = ['solid', 'outline', 'none'];
const sizeCollection = ['mini', 'small', 'middle', 'large'];
const typeCollection = ['submit', 'reset', 'button'];
const shapeCollection = ['default', 'rounded', 'rectangular'];

const defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  loadingText: '',
  disabled: false,
  type: 'button',
  shape: 'default',
  size: 'middle',
  onClick: null,
};

export const Button = (p) => {
  const props = mergeProps(defaultProps, p);

  const {
    color: colorSource,
    fill: fillSource,
    block,
    loading,
    loadingText,
    disabled: disabledSource,
    type: typeSource,
    shape: shapeSource,
    size: sizeSource,
    onClick,
  } = props;

  const color = inCollection(colorCollection, colorSource)
    ? colorSource
    : 'default';
  const fill = inCollection(fillCollection, fillSource) ? fillSource : 'solid';
  const type = inCollection(typeCollection, typeSource) ? typeSource : 'button';
  const shape = inCollection(shapeCollection, shapeSource)
    ? shapeSource
    : 'default';
  const size = inCollection(sizeCollection, sizeSource) ? sizeSource : 'middle';

  const disabled = disabledSource || loading;
  return withNativeProps(
    props,
    <View
      type={type}
      onClick={onClick}
      className={classNames(
        classPrefix,
        color ? `${classPrefix}-${color}` : null,
        {
          [`${classPrefix}-block`]: block,
          [`${classPrefix}-disabled`]: disabled,
          [`${classPrefix}-fill-outline`]: fill === 'outline',
          [`${classPrefix}-fill-none`]: fill === 'none',
          [`${classPrefix}-mini`]: size === 'mini',
          [`${classPrefix}-small`]: size === 'small',
          [`${classPrefix}-large`]: size === 'large',
          [`${classPrefix}-loading`]: loading,
        },
        `${classPrefix}-shape-${shape}`,
      )}
      disabled={disabled}
    >
      {loading ? (
        <View className={`${classPrefix}-loading-wrapper`}>
          <ActivityIndicator content={loadingText} />
        </View>
      ) : (
        props.children
      )}
    </View>,
  );
};

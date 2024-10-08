import classNames from 'classnames';
import { Icon, View } from '@tarojs/components';

import { checkInCollection, isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { FlexBox } from '../FlexBox';
import { VerticalBox } from '../VerticalBox';

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
const shapeCollection = ['rectangle', 'circle', 'circleLeft', 'circleRight'];

const fillCollection = ['solid', 'outline'];

const defaultProps = {
  color: 'default',
  fill: 'solid',
  shape: 'rectangle',
  style: {},
  closeable: false,
  closeColor: '#ccc',
  onClick: null,
};

class Tag extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      show: true,
    };
  }

  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  triggerClose = () => {
    this.setState({
      show: false,
    });

    const { onClose } = this.props;

    if (isFunction(onClose)) {
      onClose();
    }
  };

  renderFurther() {
    const {
      color: colorSource,
      fill: fillSource,
      shape: shapeSource,
      style: styleOther,
      hidden,
      closeable,
      closeColor,
      children,
    } = this.props;
    const { show } = this.state;

    if (hidden || !show) {
      return null;
    }

    const color = checkInCollection(colorCollection, colorSource)
      ? colorRecord[colorSource]
      : colorSource;

    const shape = checkInCollection(shapeCollection, shapeSource)
      ? shapeSource
      : 'rectangle';

    const fill = checkInCollection(fillCollection, fillSource)
      ? fillSource
      : 'solid';

    const style = {
      '--border-color': color,
      '--text-color': fill === 'outline' ? color : '#ffffff',
      '--background-color': fill === 'outline' ? 'transparent' : color,
      ...styleOther,
    };

    return (
      <View
        style={style}
        className={classNames(classPrefix, {
          [`${classPrefix}-circle`]: shape === 'circle',
          [`${classPrefix}-circle-left`]: shape === 'circleLeft',
          [`${classPrefix}-circle-right`]: shape === 'circleRight',
        })}
      >
        <FlexBox
          flexAuto="left"
          left={
            <VerticalBox onClick={this.triggerClick}> {children}</VerticalBox>
          }
          right={
            closeable ? (
              <VerticalBox onClick={this.triggerClose}>
                <Icon size={12} type="clear" color={closeColor || '#ccc'} />
              </VerticalBox>
            ) : null
          }
          rightStyle={
            closeable
              ? {
                  paddingLeft: transformSize(12),
                }
              : {}
          }
        />
      </View>
    );
  }
}

Tag.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Tag };

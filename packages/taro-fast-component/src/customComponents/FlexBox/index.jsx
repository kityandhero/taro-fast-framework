import { View } from '@tarojs/components';

import {
  inCollection,
  showErrorMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import Col from '../Flex/Col';
import Row from '../Flex/Row';

const defaultProps = {
  flexAuto: 'left',
  allowWrap: false,
  verticalHeightAdjust: '100%',
  left: null,
  leftStyle: {},
  right: null,
  rightStyle: {},
  top: null,
  topStyle: {},
  bottom: null,
  bottomStyle: {},
  style: null,
  alignItems: 'center',
  stretch: true,
  onClick: null,
};

const flexAutoCollection = ['left', 'right', 'top', 'bottom'];

class FlexBox extends BaseComponent {
  getDirection = () => {
    const { flexAuto } = this.props;

    if (!inCollection(flexAutoCollection, flexAuto)) {
      const text = 'flexAuto 只能配置为 left/right/top/bottom';

      showErrorMessage({
        message: text,
      });

      return 'horizontal';
    }

    return inCollection(['left', 'right'], flexAuto)
      ? 'horizontal'
      : inCollection(['top', 'bottom'], flexAuto)
      ? 'vertical'
      : 'horizontal';
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const {
      style: styleSource,
      allowWrap,
      flexAuto: flexAutoSource,
      left,
      leftStyle,
      right,
      rightStyle,
      top,
      topStyle,
      bottom,
      bottomStyle,
      alignItems,
      verticalHeight,
      stretch,
    } = this.props;

    const direction = this.getDirection();

    let flexAuto = flexAutoSource;

    if (direction === 'horizontal') {
      flexAuto = inCollection(['left', 'right'], flexAutoSource)
        ? flexAutoSource
        : 'left';
    }

    if (direction === 'vertical') {
      flexAuto = inCollection(['top', 'bottom'], flexAutoSource)
        ? flexAutoSource
        : 'top';
    }

    if (direction === 'horizontal') {
      const style = {
        ...(styleSource || {}),
        ...(!(allowWrap || false) ? { flexWrap: 'nowrap' } : {}),
      };

      if (left == null || right == null) {
        if (left == null && right == null) {
          return null;
        }

        if (left == null) {
          return right;
        }

        if (right == null) {
          return left;
        }
      }

      const styleCore = {
        display: 'flex',
        alignItems: alignItems || defaultProps.alignItems,
      };

      if (flexAuto === 'left') {
        return (
          <Row style={style} onClick={this.triggerClick}>
            <Col
              auto
              align={stretch ? 'stretch' : ''}
              style={{ ...(leftStyle || {}), ...styleCore }}
            >
              {left}
            </Col>

            {(right || null) == null ? null : (
              <Col
                align={stretch ? 'stretch' : ''}
                style={{ ...(rightStyle || {}), ...styleCore }}
              >
                {right}
              </Col>
            )}
          </Row>
        );
      }

      return (
        <Row style={style} onClick={this.triggerClick}>
          <Col
            align={stretch ? 'stretch' : ''}
            style={{ ...(leftStyle || {}), ...styleCore }}
          >
            {left}
          </Col>
          <Col
            auto
            align={stretch ? 'stretch' : ''}
            style={{ ...(rightStyle || {}), ...styleCore }}
          >
            {right}
          </Col>
        </Row>
      );
    }

    const verticalHeightAdjust = transformSize(verticalHeight);

    if (top == null || bottom == null) {
      if (top == null && bottom == null) {
        return null;
      }

      if (top == null) {
        return bottom;
      }

      if (bottom == null) {
        return top;
      }
    }

    return (
      <View
        style={{
          ...{
            height: verticalHeightAdjust,
          },
          ...styleSource,
          ...{
            display: 'flex',
            flexFlow: 'column',
          },
          ...(stretch
            ? {
                alignItems: 'stretch',
              }
            : {}),
        }}
        onClick={this.triggerClick}
      >
        <View
          style={{
            ...topStyle,
            ...(flexAuto === 'top' ? { flex: '1 1 auto' } : {}),
          }}
        >
          {top}
        </View>

        <View
          style={{
            ...bottomStyle,
            ...(flexAuto === 'bottom' ? { flex: '1 1 auto' } : {}),
          }}
        >
          {bottom}
        </View>
      </View>
    );
  }
}

FlexBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default FlexBox;

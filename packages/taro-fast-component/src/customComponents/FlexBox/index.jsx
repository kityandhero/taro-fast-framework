import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import Col from '../Flex/Col';
import Row from '../Flex/Row';

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  direction: 'horizontal',
  flexAuto: 'left',
  allowWrap: false,
  verticalHeightAdjust: '100%',
  left: null,
  leftStyle: {},
  right: null,
  leftStyle: {},
  top: null,
  topStyle: {},
  bottom: null,
  bottomStyle: {},
  style: null,
  alignItems: 'center',
};

class FlexBox extends BaseComponent {
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
      direction: directionSource,
      alignItems,
      verticalHeight,
    } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

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
          <Row style={style}>
            <Col
              auto
              align="stretch"
              style={{ ...(leftStyle || {}), ...styleCore }}
            >
              {left}
            </Col>

            {(right || null) == null ? null : (
              <Col
                align="stretch"
                style={{ ...(rightStyle || {}), ...styleCore }}
              >
                {right}
              </Col>
            )}
          </Row>
        );
      }

      return (
        <Row style={style}>
          <Col align="stretch" style={{ ...(leftStyle || {}), ...styleCore }}>
            {left}
          </Col>
          <Col
            auto
            align="stretch"
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
            alignItems: 'stretch',
          },
        }}
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
  ...defaultProps,
};

export default FlexBox;

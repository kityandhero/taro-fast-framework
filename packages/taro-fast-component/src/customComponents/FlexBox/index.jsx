import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import Col from '../Flex/Col';
import Row from '../Flex/Row';

const directionCollection = ['horizontal', 'vertical'];
const flexAutoCollection = ['left', 'right'];

const defaultProps = {
  direction: 'horizontal',
  flexAuto: 'left',
  allowWrap: false,
  vertical: {
    minHeight: 'auto',
    bottomHeight: transformSize(180),
  },
  left: null,
  leftStyle: {},
  right: null,
  leftStyle: {},
  top: null,
  topStyle: {},
  bottom: null,
  bottomStyle: {},
  style: null,
  center: true,
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
      vertical,
      center,
    } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    if (direction === 'horizontal') {
      const flexAuto = inCollection(flexAutoCollection, flexAutoSource)
        ? flexAutoSource
        : 'left';

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
        alignItems: 'center',
      };

      if (flexAuto === 'left') {
        return (
          <Row style={style}>
            <Col
              auto
              align={center ? 'center' : 'stretch'}
              style={{ ...(leftStyle || {}), ...(center ? {} : styleCore) }}
            >
              {left}
            </Col>

            {(right || null) == null ? null : (
              <Col
                align={center ? 'center' : 'stretch'}
                style={{ ...(rightStyle || {}), ...(center ? {} : styleCore) }}
              >
                {right}
              </Col>
            )}
          </Row>
        );
      }

      return (
        <Row style={style}>
          <Col
            align={center ? 'center' : 'stretch'}
            style={{ ...(leftStyle || {}), ...(center ? {} : styleCore) }}
          >
            {left}
          </Col>
          <Col
            auto
            align={center ? 'center' : 'stretch'}
            style={{ ...(rightStyle || {}), ...(center ? {} : styleCore) }}
          >
            {right}
          </Col>
        </Row>
      );
    }

    const { minHeight, bottomHeight } = {
      ...{
        bottomHeight: transformSize(80),
      },
      ...(vertical || {}),
    };

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
            height: '100%',
            minHeight: minHeight,
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
            ...{
              flex: '1 1 auto',
            },
          }}
        >
          {top}
        </View>

        <View
          style={{
            ...bottomStyle,
            ...{
              flex: `0 1 ${bottomHeight}`,
            },
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

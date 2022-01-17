import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { inCollection } from 'taro-fast-common/es/utils/tools';

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
    bottomHeight: '180rpx',
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
};

class FlexBox extends ComponentBase {
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

      if (flexAuto === 'left') {
        return (
          <Row style={style}>
            <Col auto style={leftStyle || null}>
              {left}
            </Col>

            {(right || null) == null ? null : (
              <Col style={rightStyle || null}>{right}</Col>
            )}
          </Row>
        );
      }

      return (
        <Row style={style}>
          <Col style={leftStyle || null}>{left}</Col>

          {(right || null) == null ? null : (
            <Col auto style={rightStyle || null}>
              {right}
            </Col>
          )}
        </Row>
      );
    }

    const { minHeight, bottomHeight } = {
      ...{
        bottomHeight: '180rpx',
      },
      ...(vertical || {}),
    };

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
          <View>{top}</View>
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

import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isString } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import Col from '../Flex/Col';
import Row from '../Flex/Row';
import FlexBox from '../FlexBox';
import ProgressBox from '../ProgressBox';
import VerticalBox from '../VerticalBox';

const layoutCollection = ['horizontal', 'vertical'];

const defaultProps = {
  layout: '',
  label: '',
  labelStyle: {},
  labelContainerStyle: {},
  extra: null,
  extraContainerStyle: {},
  progressContainerStyle: {},
  icon: null,
  iconContainerStyle: {},
  percent: 0,
  showInfo: false,
  strokeWidth: 10,
  activeColor: '#09BB07',
  backgroundColor: '#EBEBEB',
  animation: false,
  useBorderRadius: true,
  borderRadius: 8,
  fontSize: 28,
};

class ProgressItem extends BaseComponent {
  getLayout = () => {
    const { layout } = this.props;

    return inCollection(layoutCollection, layout) ? layout : 'horizontal';
  };

  renderFurther() {
    const {
      label,
      labelStyle,
      labelContainerStyle,
      extra,
      extraContainerStyle,
      progressContainerStyle,
      icon,
      iconContainerStyle: iconContainerStyleSource,
      percent,
      showInfo,
      animation,
      strokeWidth,
      activeColor,
      backgroundColor,
      useBorderRadius,
      borderRadius,
      fontSize,
    } = this.props;

    const layout = this.getLayout();

    let labelComponent = label;

    if (isString(label)) {
      if (!stringIsNullOrWhiteSpace(label)) {
        labelComponent = (
          <VerticalBox>
            <View
              style={{
                ...{
                  fontSize: transformSize(30),
                  paddingRight: transformSize(20),
                },
                ...labelStyle,
              }}
            >
              {label}
            </View>
          </VerticalBox>
        );
      } else {
        labelComponent = null;
      }
    }

    if (layout == 'horizontal') {
      return (
        <FlexBox
          flexAuto="right"
          left={labelComponent}
          leftStyle={labelContainerStyle}
          right={
            <FlexBox
              style={{ height: '100%' }}
              left={
                <ProgressBox
                  style={{ height: '100%' }}
                  progressContainerStyle={progressContainerStyle}
                  icon={icon}
                  iconContainerStyle={iconContainerStyleSource}
                  percent={percent}
                  showInfo={showInfo}
                  animation={animation}
                  strokeWidth={strokeWidth}
                  activeColor={activeColor}
                  backgroundColor={backgroundColor}
                  useBorderRadius={useBorderRadius}
                  borderRadius={borderRadius}
                  fontSize={fontSize}
                />
              }
              right={extra ? extra : null}
              rightStyle={
                extra
                  ? {
                      ...(isString(extra)
                        ? {
                            fontSize: transformSize(28),
                            paddingLeft: transformSize(20),
                          }
                        : {}),

                      ...extraContainerStyle,
                    }
                  : null
              }
            />
          }
        />
      );
    }

    return (
      <View style={{ width: '100%' }}>
        {labelComponent != null ? (
          <Row>
            <Col size={12} style={labelContainerStyle}>
              {labelComponent}
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col size={12}>
            <FlexBox
              style={{ height: '100%' }}
              left={
                <ProgressBox
                  style={{ height: '100%' }}
                  progressContainerStyle={progressContainerStyle}
                  icon={icon}
                  iconContainerStyle={iconContainerStyleSource}
                  percent={percent}
                  showInfo={showInfo}
                  animation={animation}
                  strokeWidth={strokeWidth}
                  activeColor={activeColor}
                  backgroundColor={backgroundColor}
                  useBorderRadius={useBorderRadius}
                  borderRadius={borderRadius}
                  fontSize={fontSize}
                />
              }
              right={extra ? extra : null}
              rightStyle={
                extra
                  ? {
                      ...(isString(extra)
                        ? {
                            fontSize: transformSize(28),
                            paddingLeft: transformSize(20),
                          }
                        : {}),

                      ...extraContainerStyle,
                    }
                  : null
              }
            />
          </Col>
        </Row>
      </View>
    );
  }
}

ProgressItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ProgressItem;

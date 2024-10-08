import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { Col } from '../Flex/Col';
import { Row } from '../Flex/Row';
import { FlexBox } from '../FlexBox';
import { ProgressBox } from '../ProgressBox';
import { VerticalBox } from '../VerticalBox';

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

    return checkInCollection(layoutCollection, layout) ? layout : 'horizontal';
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
      labelComponent = checkStringIsNullOrWhiteSpace(label) ? null : (
        <VerticalBox>
          <View
            style={{
              fontSize: transformSize(30),
              paddingRight: transformSize(20),
              ...labelStyle,
            }}
          >
            {label}
          </View>
        </VerticalBox>
      );
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
              right={extra ?? null}
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
        {labelComponent == null ? null : (
          <Row>
            <Col size={12} style={labelContainerStyle}>
              {labelComponent}
            </Col>
          </Row>
        )}

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
              right={extra ?? null}
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

export { ProgressItem };

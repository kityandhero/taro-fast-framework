import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isString } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import VerticalBox from '../VerticalBox';
import FlexBox from '../FlexBox';
import AdvanceProgress from '../AdvanceProgress';
import Row from '../Flex/Row';
import Col from '../Flex/Col';

const layoutCollection = ['horizontal', 'vertical'];

const activeModeCollection = ['backwards', 'forwards'];

const defaultProps = {
  layout: '',
  hidden: false,
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
  borderRadius: 0,
  fontSize: 16,
  strokeWidth: 6,
  activeColor: '#09BB07',
  backgroundColor: '#EBEBEB',
  active: false,
  activeMode: 'backwards',
  duration: 30,
  onActiveEnd: null,
};

class AdvanceProgressBox extends ComponentBase {
  renderFurther() {
    const {
      layout: layoutSource,
      hidden,
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
      borderRadius,
      fontSize,
      strokeWidth,
      activeColor,
      backgroundColor,
      active,
      activeMode: activeModeSource,
      duration,
      onActiveEnd,
    } = this.props;

    if (!!hidden) {
      return null;
    }

    const layout = inCollection(layoutCollection, layoutSource)
      ? layoutSource
      : 'horizontal';

    const activeMode = inCollection(activeModeCollection, activeModeSource)
      ? activeModeSource
      : 'backwards';

    let labelComponent = label;

    if (isString(label)) {
      if (!stringIsNullOrWhiteSpace(label)) {
        labelComponent = (
          <VerticalBox>
            <View
              style={{ ...{ paddingRight: 'var(--tfc-px-20)' }, ...labelStyle }}
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
                <AdvanceProgress
                  style={{ height: '100%' }}
                  progressContainerStyle={progressContainerStyle}
                  icon={icon}
                  iconContainerStyle={iconContainerStyleSource}
                  percent={percent}
                  showInfo={showInfo}
                  borderRadius={borderRadius}
                  fontSize={fontSize}
                  strokeWidth={strokeWidth}
                  activeColor={activeColor}
                  backgroundColor={backgroundColor}
                  active={active}
                  activeMode={activeMode}
                  duration={duration}
                  onActiveEnd={onActiveEnd}
                />
              }
              right={extra ? extra : null}
              rightStyle={extra ? extraContainerStyle : null}
            />
          }
        />
      );
    }

    return (
      <View>
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
                <AdvanceProgress
                  style={{ height: '100%' }}
                  progressContainerStyle={progressContainerStyle}
                  icon={icon}
                  iconContainerStyle={iconContainerStyleSource}
                  percent={percent}
                  showInfo={showInfo}
                  borderRadius={borderRadius}
                  fontSize={fontSize}
                  strokeWidth={strokeWidth}
                  activeColor={activeColor}
                  backgroundColor={backgroundColor}
                  active={active}
                  activeMode={activeMode}
                  duration={duration}
                  onActiveEnd={onActiveEnd}
                />
              }
              right={extra ? extra : null}
              rightStyle={extra ? extraContainerStyle : null}
            />
          </Col>
        </Row>
      </View>
    );
  }
}

AdvanceProgressBox.defaultProps = {
  ...defaultProps,
};

export default AdvanceProgressBox;

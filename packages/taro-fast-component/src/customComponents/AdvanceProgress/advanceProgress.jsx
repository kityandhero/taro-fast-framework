import { Progress } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

const activeModeCollection = ['backwards', 'forwards'];

const defaultProps = {
  hidden: false,
  style: {},
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

class AdvanceProgress extends ComponentBase {
  triggerActiveEnd = (e) => {
    const { onActiveEnd } = this.props;

    if (isFunction(onActiveEnd)) {
      onActiveEnd(e);
    }
  };

  renderFurther() {
    const {
      hidden,
      style,
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
    } = this.props;

    if (!!hidden) {
      return null;
    }

    const activeMode = inCollection(activeModeCollection, activeModeSource)
      ? activeModeSource
      : 'backwards';

    const iconContainerStyle = {
      ...{
        paddingLeft: 'var(--tfc-px-10)',
      },
      ...iconContainerStyleSource,
      ...{},
    };

    return (
      <FlexBox
        style={style}
        left={
          <VerticalBox>
            <Progress
              style={{ width: '100%' }}
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
              onActiveEnd={this.triggerActiveEnd}
            />
          </VerticalBox>
        }
        leftStyle={progressContainerStyle}
        right={icon ? <VerticalBox>{icon}</VerticalBox> : null}
        rightStyle={icon ? iconContainerStyle : null}
      />
    );
  }
}

AdvanceProgress.defaultProps = {
  ...defaultProps,
};

export default AdvanceProgress;

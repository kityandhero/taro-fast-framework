import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';
import Progress from '../Progress';

const defaultProps = {
  hidden: false,
  style: {},
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

class ProgressBox extends BaseComponent {
  triggerActiveEnd = (e) => {
    const { onActiveEnd } = this.props;

    if (isFunction(onActiveEnd)) {
      onActiveEnd(e);
    }
  };

  renderFurther() {
    const {
      style,
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

    const iconContainerStyle = {
      ...{
        paddingLeft: transformSize(10),
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
              animation={animation}
              strokeWidth={strokeWidth}
              activeColor={activeColor}
              backgroundColor={backgroundColor}
              useBorderRadius={useBorderRadius}
              borderRadius={borderRadius}
              fontSize={fontSize}
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

ProgressBox.defaultProps = {
  ...defaultProps,
};

export default ProgressBox;

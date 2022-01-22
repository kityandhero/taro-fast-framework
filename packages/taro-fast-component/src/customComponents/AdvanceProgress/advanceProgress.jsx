import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

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
  status: 'progress',
  showInfo: false,
  strokeWidth: 10,
  activeColor: '#09BB07',
  backgroundColor: '#EBEBEB',
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
      status,
      showInfo,
      strokeWidth,
      activeColor,
      backgroundColor,
    } = this.props;

    if (!!hidden) {
      return null;
    }

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
              status={status}
              showInfo={showInfo}
              strokeWidth={strokeWidth}
              activeColor={activeColor}
              backgroundColor={backgroundColor}
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

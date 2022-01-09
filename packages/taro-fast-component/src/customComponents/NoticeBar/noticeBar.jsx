import { View } from '@tarojs/components';
import classNames from 'classnames';

import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import Icon from '../Icon';

const { IconClose } = Icon;

const defaultProps = {
  hidden: false,
  closeable: false,
  single: false,
  marquee: false,
  extra: null,
  icon: '',
  duration: 10,
  customStyle: {},
  afterClose: null,
  afterClickMore: null,
};

class NoticeBar extends ComponentBase {
  constructor(props) {
    super(props);

    const animElemId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`;

    this.state = {
      ...this.state,
      ...{
        show: true,
        animElemId,
        durationValue: 8,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { duration: durationNext } = {
      ...defaultProps,
      ...nextProps,
    };

    return {
      durationValue: isNumber(durationNext)
        ? toNumber(durationNext)
        : defaultProps.duration,
    };
  }

  componentDidMount() {
    if (!this.props.marquee) return;
  }

  onClose() {
    this.setState({
      show: false,
    });

    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      afterClose();
    }
  }

  render() {
    const {
      hidden,
      closeable: closeableSource,
      single,
      icon,
      marquee,
      customStyle,
      className,
      extra: extraSource,
    } = this.props;

    if (!!hidden) {
      return null;
    }

    const { durationValue, show, animElemId } = this.state;
    const rootClassName = ['tfc-notice-bar'];

    let extra = extraSource;

    if (!single) {
      extra = null;
    }

    const style = {};
    const innerClassName = ['tfc-notice-bar__content-inner'];

    let closeable = !!closeableSource;

    if (marquee) {
      closeable = false;
      style['animation-duration'] = `${durationValue}s`;
      innerClassName.push(animElemId);
    }

    const classObject = {
      'tfc-notice-bar--marquee': marquee,
      'tfc-notice-bar--single': !marquee && single,
    };

    return (
      show && (
        <View
          className={classNames(rootClassName, classObject, className)}
          style={customStyle}
        >
          {single ? (
            <FlexBox
              flexAuto="right"
              left={
                closeable ? (
                  <View
                    className="tfc-notice-bar__close"
                    onClick={() => {
                      this.onClose();
                    }}
                  >
                    <IconClose size={19} />
                  </View>
                ) : null
              }
              right={
                <FlexBox
                  left={
                    <View className="tfc-notice-bar__content">
                      {!!icon ? (
                        <View className="tfc-notice-bar__content-icon">
                          {icon}
                        </View>
                      ) : null}

                      <View className="tfc-notice-bar__content-text">
                        <View
                          id={animElemId}
                          className={classNames(innerClassName)}
                          style={style}
                        >
                          {this.props.children}
                        </View>
                      </View>
                    </View>
                  }
                  right={extra ? extra : null}
                />
              }
            />
          ) : (
            <View className="tfc-notice-bar__content">
              {!!icon ? (
                <View className="tfc-notice-bar__content-icon">{icon}</View>
              ) : null}

              <View className="tfc-notice-bar__content-text">
                <View
                  id={animElemId}
                  className={classNames(innerClassName)}
                  style={style}
                >
                  {this.props.children}
                </View>
              </View>
            </View>
          )}
        </View>
      )
    );
  }
}

NoticeBar.defaultProps = {
  ...defaultProps,
};

export default NoticeBar;

import classNames from 'classnames';
import { Icon, View } from '@tarojs/components';

import { isFunction, isNumber, toNumber } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { FlexBox } from '../FlexBox';
import { VerticalBox } from '../VerticalBox';

import './index.less';

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
};

class NoticeBar extends BaseComponent {
  constructor(properties) {
    super(properties);

    const animElementId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`;

    this.state = {
      ...this.state,
      show: true,
      animElemId: animElementId,
      durationValue: 8,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { duration: durationNext } = {
      ...defaultProps,
      ...nextProperties,
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

  renderFurther() {
    const {
      closeable: closeableSource,
      single,
      icon,
      marquee,
      customStyle,
      className,
      extra: extraSource,
    } = this.props;

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
                    <VerticalBox>
                      <Icon size={14} type="clear" color="#ccc" />
                    </VerticalBox>
                  </View>
                ) : null
              }
              right={
                <FlexBox
                  left={
                    <View className="tfc-notice-bar__content">
                      {icon ? (
                        <View className="tfc-notice-bar__content-icon">
                          <CenterBox>{icon}</CenterBox>
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
                  right={extra ? <CenterBox>{extra}</CenterBox> : null}
                />
              }
            />
          ) : (
            <View className="tfc-notice-bar__content">
              {icon ? (
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { NoticeBar };

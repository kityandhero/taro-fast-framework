import { Text, View } from '@tarojs/components';
import classNames from 'classnames';

import { isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const defaultProps = {
  close: false,
  single: false,
  marquee: false,
  moreText: '查看详情',
  showMore: false,
  icon: '',
  duration: 10,
  customStyle: {},
};

export default class NoticeBar extends ComponentBase {
  constructor(props) {
    super(props);

    const animElemId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`;

    this.state = {
      show: true,
      animElemId,
      durationValue: 10,
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

  onClose(event) {
    this.setState({
      show: false,
    });
    this.props.onClose && this.props.onClose(event);
  }

  onGotoMore(event) {
    this.props.onGotoMore && this.props.onGotoMore(event);
  }

  render() {
    const {
      single,
      icon,
      marquee,
      customStyle,
      className,
      moreText = '查看详情',
    } = this.props;
    let { showMore, close } = this.props;
    const { durationValue, show, animElemId, isWEAPP, isALIPAY } = this.state;
    const rootClassName = ['tfc-notice-bar'];

    if (!single) showMore = false;

    const style = {};
    const innerClassName = ['tfc-notice-bar__content-inner'];

    if (marquee) {
      close = false;
      style['animation-duration'] = `${durationValue}s`;
      innerClassName.push(animElemId);
    }

    const classObject = {
      'tfc-notice-bar--marquee': marquee,
      'tfc-notice-bar--weapp': marquee && (isWEAPP || isALIPAY),
      'tfc-notice-bar--single': !marquee && single,
    };

    return (
      show && (
        <View
          className={classNames(rootClassName, classObject, className)}
          style={customStyle}
        >
          {close && (
            <View
              className="tfc-notice-bar__close"
              onClick={this.onClose.bind(this)}
            >
              <Text className="tfc-icon tfc-icon-close"></Text>
            </View>
          )}

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

          {showMore && (
            <View
              className="tfc-notice-bar__more"
              onClick={this.onGotoMore.bind(this)}
            >
              <Text className="text">{moreText}</Text>
              <View className="tfc-notice-bar__more-icon">
                <Text className="tfc-icon tfc-icon-chevron-right"></Text>
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

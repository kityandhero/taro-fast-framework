import classNames from 'classnames';
import { Button as ButtonWxApp, View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import ActivityIndicator from '../ActivityIndicator';
import BaseComponent from '../BaseComponent';
import ColorText from '../ColorText';
import { Spin } from '../Spin';

import { getStyle } from './tools';

const classPrefix = `tfc-button`;

const fillCollection = ['solid', 'outline', 'none'];
const sizeCollection = ['mini', 'small', 'middle', 'large'];
const typeCollection = ['submit', 'reset', 'button'];
const shapeCollection = ['default', 'rounded', 'rectangular'];
const scopeCollection = ['userInfo', 'phoneNumber'];
const openTypeCollection = [
  '',
  'contact',
  'contactShare',
  'share',
  'getRealnameAuthInfo',
  'getAuthorize',
  'getPhoneNumber',
  'getUserInfo',
  'lifestyle',
  'launchApp',
  'openSetting',
  'feedback',
];

const defaultProps = {
  hidden: false,
  ripple: false,
  style: {},
  icon: null,
  text: '',
  backgroundColor: '',
  fontColor: '',
  borderColor: '',
  borderWidth: 0,
  fontSize: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: 0,
  shadow: true,
  shadowColor: '',
  fill: 'solid',
  block: false,
  loading: false,
  loadingMode: '',
  loadingSize: 0,
  loadingText: '',
  loadingColor: '',
  loadingType: 'ring',
  disabled: false,
  type: 'button',
  shape: 'default',
  size: 'middle',
  weappButton: false,
  openType: '',
  scope: '',
  onClick: null,
  onGetUserInfo: null,
  onGetAuthorize: null,
  onContact: null,
  onGetPhoneNumber: null,
  onGetRealnameAuthInfo: null,
  onError: null,
  onOpenSetting: null,
};

class Button extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        rippleStyle: {},
      },
    };
  }

  getFill = () => {
    const { fill } = this.props;

    return inCollection(fillCollection, fill) ? fill : 'solid';
  };

  getType = () => {
    const { type } = this.props;

    return inCollection(typeCollection, type) ? type : 'button';
  };

  getShape = () => {
    const { shape } = this.props;

    return inCollection(shapeCollection, shape) ? shape : 'default';
  };

  getSize = () => {
    const { size } = this.props;

    return inCollection(sizeCollection, size) ? size : 'middle';
  };

  triggerClick = (e) => {
    const { ripple, onClick } = this.props;

    if (ripple) {
      const that = this;

      const {
        touches,
        mpEvent: {
          currentTarget: { offsetLeft, offsetTop },
        },
      } = e;

      const x = touches[0].pageX;
      const y = touches[0].pageY;

      this.setState({
        rippleStyle: {
          top: `${y - offsetTop}px`,
          left: `${x - offsetLeft}px`,
          width: transformSize(40),
          height: transformSize(40),
          animation: 'tfc-button-ripple 0.4s linear',
        },
      });

      setTimeout(function () {
        that.setState({
          rippleStyle: {},
        });
      }, 500);
    }

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  buildInner = () => {
    const { fontColor, fontSize, icon, text, children } = this.props;

    return children ? (
      children
    ) : text && !icon ? (
      text
    ) : text && icon ? (
      <ColorText
        color={fontColor}
        fontSize={fontSize}
        icon={icon}
        text={text}
      />
    ) : icon ? (
      icon
    ) : null;
  };

  renderFurther() {
    const {
      style,
      ripple,
      backgroundColor,
      fontColor,
      borderColor,
      borderWidth,
      fontSize,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      borderRadius,
      shadow,
      shadowColor,
      block,
      loading,
      loadingMode,
      loadingSize,
      loadingText,
      loadingColor,
      loadingType,
      disabled: disabledSource,
      weappButton,
      openType,
      scope,
      onGetUserInfo,
      onGetAuthorize,
      onContact,
      onGetPhoneNumber,
      onGetRealnameAuthInfo,
      onError,
      onOpenSetting,
    } = this.props;
    const { rippleStyle } = this.state;

    const fill = this.getFill();

    const type = this.getType();
    const shape = this.getShape();
    const size = this.getSize();

    const isCustom =
      paddingTop > 0 ||
      paddingBottom > 0 ||
      paddingLeft > 0 ||
      paddingRight > 0 ||
      borderRadius > 0;

    const scopeAdjust = inCollection(scopeCollection, scope)
      ? scope
      : defaultProps.scope;

    const openTypeAdjust = inCollection(openTypeCollection, openType)
      ? openType
      : defaultProps.openType;

    const disabled = disabledSource || loading;

    const cn = classNames(
      classPrefix,
      backgroundColor ? null : `${classPrefix}-default`,
      {
        [`${classPrefix}--active`]: !ripple,
        [`${classPrefix}-block`]: block,
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-fill-outline`]: fill === 'outline',
        [`${classPrefix}-fill-none`]: fill === 'none',
        [`${classPrefix}-mini`]: !isCustom && size === 'mini',
        [`${classPrefix}-small`]: !isCustom && size === 'small',
        [`${classPrefix}-large`]: !isCustom && size === 'large',
        [`${classPrefix}-custom`]: isCustom,
        [`${classPrefix}-loading`]: loading,
      },
      `${classPrefix}-shape-${shape}`,
    );

    const styleAdjust = {
      ...style,
      ...getStyle({
        backgroundColor,
        fill,
        fontColor,
        borderColor,
        borderWidth: borderWidth > 0 ? borderWidth : 2,
        fontSize: fontSize > 0 ? fontSize : 30,
        shadow,
        shadowColor,
        paddingTop: paddingTop > 0 ? paddingTop : 15,
        paddingBottom: paddingBottom > 0 ? paddingBottom : 15,
        paddingLeft: paddingLeft > 0 ? paddingLeft : 24,
        paddingRight: paddingRight > 0 ? paddingRight : 24,
        borderRadius: borderRadius > 0 ? borderRadius : 8,
      }),
      ...(shape === 'rounded'
        ? { '--border-radius': transformSize(2000) }
        : {}),
    };

    if (weappButton) {
      return (
        <ButtonWxApp
          plain
          type={type}
          onClick={this.triggerClick}
          className={cn}
          hoverClass={ripple ? `${classPrefix}--hover` : 'button-hover'}
          style={{
            ...styleAdjust,
          }}
          disabled={disabled}
          openType={openTypeAdjust}
          scope={scopeAdjust}
          onGetUserInfo={onGetUserInfo}
          onGetAuthorize={onGetAuthorize}
          onContact={onContact}
          onGetPhoneNumber={onGetPhoneNumber}
          onGetRealnameAuthInfo={onGetRealnameAuthInfo}
          onError={onError}
          onOpenSetting={onOpenSetting}
        >
          {ripple ? (
            <View
              className={classNames(`${classPrefix}__ripple`)}
              style={rippleStyle}
            />
          ) : null}

          {loadingMode === 'overlay' ? (
            <Spin
              spin={!!loading}
              spinColor={loadingColor}
              spinType={loadingType}
              text={loadingText}
              overlayBackgroundColor=""
            >
              {this.buildInner()}
            </Spin>
          ) : loading ? (
            <View className={`${classPrefix}-loading-wrapper`}>
              <ActivityIndicator
                size={loadingSize}
                type={loadingType}
                color={loadingColor}
                content={loadingText}
              />
            </View>
          ) : (
            this.buildInner()
          )}
        </ButtonWxApp>
      );
    }

    return (
      <View
        onClick={this.triggerClick}
        className={cn}
        hoverClass={ripple ? `${classPrefix}--hover` : 'button-hover'}
        style={styleAdjust}
        disabled={disabled}
      >
        {ripple ? (
          <View
            className={classNames(`${classPrefix}__ripple`)}
            style={rippleStyle}
          />
        ) : null}

        {loadingMode === 'overlay' ? (
          <Spin
            spin={!!loading}
            spinColor={loadingColor}
            spinType={loadingType}
            text={loadingText}
            overlayBackgroundColor=""
          >
            {this.buildInner()}
          </Spin>
        ) : loading ? (
          <View className={`${classPrefix}-loading-wrapper`}>
            <ActivityIndicator
              size={loadingSize}
              type={loadingType}
              color={loadingColor}
              content={loadingText}
            />
          </View>
        ) : (
          this.buildInner()
        )}
      </View>
    );
  }
}

Button.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Button;

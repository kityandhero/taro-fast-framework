import classNames from 'classnames';
import { View, Button as ButtonWxApp } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { Spin } from '../Spin';
import ActivityIndicator from '../ActivityIndicator';

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
  style: {},
  backgroundColor: '',
  fontColor: '',
  borderColor: '',
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

class Button extends ComponentBase {
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

  renderFurther() {
    const {
      style,
      backgroundColor,
      fontColor,
      borderColor,
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
      onClick,
      onGetUserInfo,
      onGetAuthorize,
      onContact,
      onGetPhoneNumber,
      onGetRealnameAuthInfo,
      onError,
      onOpenSetting,
      children,
    } = this.props;

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
        fontSize,
        shadow,
        shadowColor,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        borderRadius,
      }),
    };

    if (weappButton) {
      return (
        <ButtonWxApp
          plain
          type={type}
          onClick={onClick}
          className={cn}
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
          {loadingMode === 'overlay' ? (
            <Spin
              spin={!!loading}
              spinColor={loadingColor}
              spinType={loadingType}
              text={loadingText}
              overlayBackgroundColor=""
            >
              {children}
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
            children
          )}
        </ButtonWxApp>
      );
    }

    return (
      <View
        onClick={(e) => {
          if (isFunction(onClick)) {
            onClick(e);
          }
        }}
        className={cn}
        style={styleAdjust}
        disabled={disabled}
      >
        {loadingMode === 'overlay' ? (
          <Spin
            spin={!!loading}
            spinColor={loadingColor}
            spinType={loadingType}
            text={loadingText}
            overlayBackgroundColor=""
          >
            {children}
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
          children
        )}
      </View>
    );
  }
}

Button.defaultProps = {
  ...defaultProps,
};

export default Button;

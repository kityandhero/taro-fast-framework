import classNames from 'classnames';
import { Button } from '@tarojs/components';

import {
  inCollection,
  mergeProps,
  withNativeProps,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isString } from 'taro-fast-common/es/utils/typeCheck';
import { Spin } from 'taro-fast-component/es/customComponents';

import './index.less';

const classPrefix = `tfc-button`;

const colorCollection = ['default', 'primary', 'success', 'warning', 'danger'];
const fillCollection = ['solid', 'outline', 'none'];
const sizeCollection = ['mini', 'small', 'middle', 'large'];
const typeCollection = ['default', 'primary', 'warn'];
const shapeCollection = ['default', 'rounded', 'rectangular'];
const formTypeCollection = ['submit', 'reset'];
const scopeCollection = ['userInfo', 'phoneNumber'];
const langCollection = ['', 'en', 'zh_CN', 'zh_TW'];
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
  color: 'default',
  fill: 'solid',
  block: false,
  shape: 'default',
  additionalClassName: [],
  size: 'middle',
  type: 'default',
  plain: false,
  disabled: false,
  loading: false,
  loadingColor: '',
  loadingText: '',
  formType: '',
  openType: '',
  hoverClass: 'button-hover',
  hoverStyle: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  lang: '',
  sessionFrom: '',
  sendMessageTitle: null,
  sendMessagePath: null,
  sendMessageImg: null,
  appParameter: null,
  scope: '',
  showMessageCard: false,
  onGetUserInfo: null,
  onGetAuthorize: null,
  onContact: null,
  onGetPhoneNumber: null,
  onGetRealnameAuthInfo: null,
  onError: null,
  onOpenSetting: null,
  onLaunchApp: null,
  onClick: null,
};

export const AdvanceButton = (p) => {
  const props = mergeProps(defaultProps, p);

  const {
    style,
    color,
    fill,
    block,
    shape,
    additionalClassName,
    size,
    type,
    plain,
    hoverClass,
    hoverStyle,
    disabled,
    loading,
    loadingColor,
    loadingText,
    formType,
    openType,
    scope,
    hoverStopPropagation,
    hoverStartTime,
    hoverStayTime,
    lang,
    sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    appParameter,
    showMessageCard,
    onGetUserInfo,
    onGetAuthorize,
    onContact,
    onGetPhoneNumber,
    onGetRealnameAuthInfo,
    onError,
    onOpenSetting,
    onLaunchApp,
    onClick,
  } = props;

  const colorAdjust = inCollection(colorCollection, color)
    ? color
    : defaultProps.color;

  const formTypeAdjust = inCollection(formTypeCollection, formType)
    ? formType
    : defaultProps.formType;

  const langAdjust = inCollection(langCollection, lang)
    ? lang
    : defaultProps.lang;

  const scopeAdjust = inCollection(scopeCollection, scope)
    ? scope
    : defaultProps.scope;

  const fillAdjust = inCollection(fillCollection, fill)
    ? fill
    : defaultProps.fill;

  const sizeAdjust = inCollection(sizeCollection, size)
    ? size
    : defaultProps.size;

  const typeAdjust = inCollection(typeCollection, type)
    ? type
    : defaultProps.type;

  const shapeAdjust = inCollection(shapeCollection, shape)
    ? shape
    : defaultProps.shape;

  const openTypeAdjust = inCollection(openTypeCollection, openType)
    ? openType
    : defaultProps.openType;

  const disabledAdjust = disabled || loading;

  const styleAdjust = {
    ...{
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-color)',
      borderWidth: 0,
    },
    ...style,
  };

  const cn = [
    classPrefix,
    colorAdjust ? `${classPrefix}-${colorAdjust}` : null,
    {
      [`${classPrefix}-block`]: block,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-fill-outline`]: fillAdjust === 'outline',
      [`${classPrefix}-fill-none`]: fillAdjust === 'none',
      [`${classPrefix}-mini`]: sizeAdjust === 'mini',
      [`${classPrefix}-small`]: sizeAdjust === 'small',
      [`${classPrefix}-large`]: sizeAdjust === 'large',
      [`${classPrefix}-loading`]: loading,
    },
    `${classPrefix}-shape-${shapeAdjust}`,
    ...(isString(additionalClassName) ? [additionalClassName] : []),
    ...(isArray(additionalClassName) ? additionalClassName : []),
  ];

  return withNativeProps(
    props,
    <Button
      className={classNames(...cn)}
      style={styleAdjust}
      onClick={onClick}
      type={typeAdjust}
      plain={!!plain}
      disabled={disabledAdjust}
      formType={formTypeAdjust}
      openType={openTypeAdjust}
      hoverClass={hoverClass}
      hoverStyle={hoverStyle}
      hoverStopPropagation={!!hoverStopPropagation}
      hoverStartTime={hoverStartTime}
      hoverStayTime={hoverStayTime}
      lang={langAdjust}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      appParameter={appParameter}
      scope={scopeAdjust}
      showMessageCard={!!showMessageCard}
      onGetUserInfo={onGetUserInfo}
      onGetAuthorize={onGetAuthorize}
      onContact={onContact}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetRealnameAuthInfo={onGetRealnameAuthInfo}
      onError={onError}
      onOpenSetting={onOpenSetting}
      onLaunchapp={onLaunchApp}
    >
      <Spin
        spin={!!loading}
        spinColor={loadingColor}
        text={loadingText}
        overlayBackgroundColor=""
      >
        {props.children}
      </Spin>
    </Button>,
  );
};

AdvanceButton.defaultProps = {
  ...defaultProps,
};

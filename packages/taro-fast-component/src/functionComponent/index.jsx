import { Swiper, SwiperItem } from '@tarojs/components';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import { ColorText, AdvanceButton } from '../customComponents';

export function buildAdvanceButton({
  style,
  color,
  fill,
  block,
  shape,
  additionalClassName,
  inner,
  size = 'default',
  type = 'default',
  plain = false,
  disabled = false,
  loading = false,
  loadingColor = '',
  loadingText = '',
  formType = '',
  openType = '',
  hoverClass = 'button-hover',
  hoverStyle = 'none',
  hoverStopPropagation = false,
  hoverStartTime = 20,
  hoverStayTime = 70,
  lang = '',
  sessionFrom = '',
  sendMessageTitle = null,
  sendMessagePath = null,
  sendMessageImg = null,
  appParameter = null,
  scope = '',
  showMessageCard = false,
  onGetUserInfo = null,
  onGetAuthorize = null,
  onContact = null,
  onGetPhoneNumber = null,
  onGetRealnameAuthInfo = null,
  onError = null,
  onOpenSetting = null,
  onLaunchApp = null,
  onClick = null,
}) {
  return (
    <AdvanceButton
      style={style}
      color={color}
      fill={fill}
      block={block}
      shape={shape}
      additionalClassName={additionalClassName}
      onClick={onClick}
      size={size}
      type={type}
      plain={plain}
      disabled={disabled}
      loading={loading}
      loadingColor={loadingColor}
      loadingText={loadingText}
      formType={formType}
      openType={openType}
      hoverClass={hoverClass}
      hoverStyle={hoverStyle}
      hoverStopPropagation={hoverStopPropagation}
      hoverStartTime={hoverStartTime}
      hoverStayTime={hoverStayTime}
      lang={lang}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      appParameter={appParameter}
      scope={scope}
      showMessageCard={showMessageCard}
      onGetUserInfo={onGetUserInfo}
      onGetAuthorize={onGetAuthorize}
      onContact={onContact}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetRealnameAuthInfo={onGetRealnameAuthInfo}
      onError={onError}
      onOpenSetting={onOpenSetting}
      onLaunchapp={onLaunchApp}
    >
      {inner}
    </AdvanceButton>
  );
}

export function buildSwiper({
  keyPrefix = '',
  style = {},
  className = '',
  indicatorDots = false,
  indicatorColor = 'rgba(0, 0, 0, .3)',
  indicatorActiveColor = '#000000',
  autoplay = false,
  current = 0,
  currentItemId = '',
  interval = 5000,
  duration = 500,
  circular = false,
  vertical = false,
  previousMargin = '0',
  nextMargin = '0',
  displayMultipleItems = 1,
  skipHiddenItemLayout = false,
  easingFunction = 'default',
  items = [],
  itemBuilder = null,
  onChange = null,
  onTransition = null,
  onAnimationFinish = null,
}) {
  const list = [];

  if (isFunction(itemBuilder)) {
    (isArray(items) ? items : []).map((o, index) => {
      const key = `${keyPrefix}_swiper-item_${index}`;

      list.push(<SwiperItem key={key}>{itemBuilder(o)}</SwiperItem>);
    });
  }

  return (
    <Swiper
      style={style}
      className={className}
      indicatorDots={indicatorDots}
      indicatorColor={indicatorColor}
      indicatorActiveColor={indicatorActiveColor}
      autoplay={autoplay}
      current={current}
      currentItemId={currentItemId}
      interval={interval}
      duration={duration}
      circular={circular}
      vertical={vertical}
      previousMargin={previousMargin}
      nextMargin={nextMargin}
      displayMultipleItems={displayMultipleItems}
      skipHiddenItemLayout={skipHiddenItemLayout}
      easingFunction={easingFunction}
      onChange={(e) => {
        if (isFunction(onChange)) {
          onChange(e);
        }
      }}
      onTransition={(e) => {
        if (isFunction(onTransition)) {
          onTransition(e);
        }
      }}
      onAnimationFinish={(e) => {
        if (isFunction(onAnimationFinish)) {
          onAnimationFinish(e);
        }
      }}
    >
      {list.map((o) => {
        return o;
      })}
    </Swiper>
  );
}

/**
 * 构建彩色文本
 */
export function buildColorText({
  canCopy = false,
  randomSeed = 0,
  seedOffset = 0,
  randomColor = false,
  color = '',
  textPrefix = null,
  textPrefixStyle = null,
  text = '',
  separator = '：',
  separatorStyle = null,
  wrapperBuilder = null,
}) {
  const colorText = (
    <ColorText
      canCopy={canCopy || false}
      randomSeed={randomSeed || 0}
      seedOffset={seedOffset || 0}
      randomColor={randomColor || false}
      color={color || ''}
      textPrefix={textPrefix || null}
      textPrefixStyle={textPrefixStyle || null}
      text={text || ''}
      separator={separator || '：'}
      separatorStyle={separatorStyle || null}
    />
  );

  if (!isFunction(wrapperBuilder)) {
    return colorText;
  }

  return wrapperBuilder(colorText);
}

export function buildOption({
  label,
  value,
  title = '',
  description = '',
  disabled = false,
  style = {},
  extra = null,
  prefix = null,
}) {
  return {
    label,
    value,
    title,
    description,
    disabled,
    style,
    extra,
    prefix,
  };
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}

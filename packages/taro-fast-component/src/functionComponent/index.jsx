import { Swiper, SwiperItem } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import {
  ActivityIndicator,
  Button,
  CenterBox,
  ColorText,
  Empty,
  FadeInBox,
} from '../customComponents';

export function buildButton({
  style = {},
  backgroundColor = '',
  fontColor = '',
  borderColor = '',
  fontSize = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  borderRadius = 0,
  shadow = true,
  shadowColor = '',
  fill = 'solid',
  block = false,
  loading = false,
  loadingMode = '',
  loadingSize = 0,
  loadingText = '',
  loadingColor = '',
  loadingType = 'ring',
  disabled = false,
  type = 'button',
  shape = 'default',
  size = 'middle',
  weappButton = false,
  openType = '',
  scope = '',
  onClick = null,
  onGetUserInfo = null,
  onGetAuthorize = null,
  onContact = null,
  onGetPhoneNumber = null,
  onGetRealnameAuthInfo = null,
  onError = null,
  onOpenSetting = null,
  inner,
}) {
  return (
    <Button
      style={style}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      borderColor={borderColor}
      fontSize={fontSize}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      borderRadius={borderRadius}
      shadow={shadow}
      shadowColor={shadowColor}
      fill={fill}
      block={block}
      loading={loading}
      loadingMode={loadingMode}
      loadingSize={loadingSize}
      loadingText={loadingText}
      loadingColor={loadingColor}
      loadingType={loadingType}
      disabled={disabled}
      type={type}
      shape={shape}
      size={size}
      weappButton={weappButton}
      openType={openType}
      scope={scope}
      onClick={onClick}
      onGetUserInfo={onGetUserInfo}
      onGetAuthorize={onGetAuthorize}
      onContact={onContact}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetRealnameAuthInfo={onGetRealnameAuthInfo}
      onError={onError}
      onOpenSetting={onOpenSetting}
    >
      {this.buildSimpleItemInner(inner)}
    </Button>
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
 * ??????????????????
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
  separator = ': ',
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
      separator={separator || ': '}
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
 * ?????????????????????
 */
export function buildEmptyPlaceholder({
  icon = '',
  iconSize = 180,
  iconStyle = {},
  image = '',
  imageStyle = {},
  imageWidth = 140,
  imageAspectRatio = 1,
  description = '????????????',
  onImageClick = null,
  onDescriptionClick = null,
}) {
  return (
    <FadeInBox style={{ margin: 'var(--tfc-20) 0' }}>
      <CenterBox>
        <Empty
          icon={
            stringIsNullOrWhiteSpace(icon) && stringIsNullOrWhiteSpace(image)
              ? 'alert-circle'
              : icon
          }
          iconSize={iconSize}
          iconStyle={iconStyle}
          image={image}
          imageStyle={imageStyle}
          imageWidth={imageWidth}
          imageAspectRatio={imageAspectRatio}
          description={description}
          onImageClick={onImageClick}
          onDescriptionClick={onDescriptionClick}
        />
      </CenterBox>
    </FadeInBox>
  );
}

/**
 * ???????????????????????????
 */
export function buildInitialActivityIndicator({
  type = 'comet',
  description = '?????????',
}) {
  return (
    <FadeInBox duration={200} style={{ height: transformSize(340) }}>
      <CenterBox>
        <ActivityIndicator type={type} content={description} />
      </CenterBox>
    </FadeInBox>
  );
}

/**
 * ????????????
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}

import { Swiper, SwiperItem, Text } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { ActivityIndicator } from '../ActivityIndicator';
import { Button } from '../Button';
import { CenterBox } from '../CenterBox';
import { ColorText } from '../ColorText';
import { Divider } from '../Divider';
import { Empty } from '../Empty';
import { FadeInBox } from '../FadeInBox';
import { Space } from '../Space';

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
      {inner}
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
      onChange={(event) => {
        if (isFunction(onChange)) {
          onChange(event);
        }
      }}
      onTransition={(event) => {
        if (isFunction(onTransition)) {
          onTransition(event);
        }
      }}
      onAnimationFinish={(event) => {
        if (isFunction(onAnimationFinish)) {
          onAnimationFinish(event);
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
 * 构建空数据占位
 */
export function buildEmptyPlaceholder({
  icon = '',
  iconSize = 180,
  iconStyle = {},
  image = '',
  imageStyle = {},
  imageWidth = 140,
  imageAspectRatio = 1,
  description = '暂无数据',
  onImageClick = null,
  onDescriptionClick = null,
}) {
  return (
    <FadeInBox style={{ margin: 'var(--tfc-20) 0' }}>
      <CenterBox>
        <Empty
          icon={
            checkStringIsNullOrWhiteSpace(icon) &&
            checkStringIsNullOrWhiteSpace(image)
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
 * 构建初始加载提示器
 */
export function buildInitialActivityIndicator({
  type = 'comet',
  description = '加载中',
}) {
  return (
    <FadeInBox duration={200} style={{ height: transformSize(340) }}>
      <CenterBox>
        <ActivityIndicator type={type} content={description} />
      </CenterBox>
    </FadeInBox>
  );
}

export function buildDivider({
  contentPosition = 'center',
  style: styleSource = {},
  icon = null,
  text = '',
}) {
  return (
    <Divider contentPosition={contentPosition} style={styleSource}>
      {icon || text ? (
        <Space>
          {icon}
          <Text userSelect>{text}</Text>
        </Space>
      ) : null}
    </Divider>
  );
}

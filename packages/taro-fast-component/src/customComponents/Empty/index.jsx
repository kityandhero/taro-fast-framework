import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isNull,
  mergeProperties,
} from 'easy-soft-utility';

import { transformSize, withNativeProperties } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { Icon } from '../Icon';
import { ImageBox } from '../ImageBox';

import './index.less';

const classPrefix = `tfc-empty`;

const defaultProps = {
  icon: 'alert-circle',
  iconSize: 180,
  iconStyle: {},
  image: '',
  imageStyle: {},
  imageWidth: 100,
  imageAspectRatio: 1,
  description: '',
  onImageClick: null,
  onDescriptionClick: null,
};

const Empty = (p) => {
  const properties = mergeProperties(defaultProps, p);

  const {
    icon,
    iconSize,
    iconStyle,
    image,
    imageStyle,
    imageWidth,
    imageAspectRatio,
    description,
    onImageClick,
    onDescriptionClick,
  } = properties;

  const iconNode = checkStringIsNullOrWhiteSpace(icon) ? null : (
    <Icon value={icon} size={iconSize} style={iconStyle} />
  );

  const imageNode =
    typeof image === 'string' ? (
      checkStringIsNullOrWhiteSpace(image) ? null : (
        <View style={{ width: transformSize(imageWidth) }}>
          <ImageBox
            style={imageStyle}
            src={image}
            alt="empty"
            aspectRatio={imageAspectRatio}
          />
        </View>
      )
    ) : (
      image
    );

  const descriptionNode =
    typeof description === 'string' ? (
      checkStringIsNullOrWhiteSpace(description) ? null : (
        <View
          className={classNames(`${classPrefix}-description`)}
          onClick={onDescriptionClick}
        >
          {description}
        </View>
      )
    ) : isNull(description) ? null : (
      description
    );

  return withNativeProperties(
    properties,
    <View className={classPrefix}>
      {iconNode || imageNode ? (
        <View
          className={`${classPrefix}-image-container`}
          onClick={onImageClick}
        >
          {iconNode || imageNode}
        </View>
      ) : null}

      {descriptionNode}
    </View>,
  );
};

Empty.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Empty };

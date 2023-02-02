import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isNull,
  mergeProps,
} from 'easy-soft-utility';

import { transformSize, withNativeProps } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import Icon from '../Icon';
import ImageBox from '../ImageBox';

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

export const Empty = (p) => {
  const props = mergeProps(defaultProps, p);

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
  } = props;

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
      !checkStringIsNullOrWhiteSpace(description) ? (
        <View
          className={classNames(`${classPrefix}-description`)}
          onClick={onDescriptionClick}
        >
          {description}
        </View>
      ) : null
    ) : !isNull(description) ? (
      description
    ) : null;

  return withNativeProps(
    props,
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

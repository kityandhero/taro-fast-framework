import classNames from 'classnames';
import { View, Image } from '@tarojs/components';

import {
  mergeProps,
  stringIsNullOrWhiteSpace,
  withNativeProps,
} from 'taro-fast-common/es/utils/tools';
import { isNull } from 'taro-fast-common/es/utils/typeCheck';

import './index.less';

const classPrefix = `tfc-empty`;

const defaultProps = {
  image: '',
  imageStyle: {},
  description: '',
  onImageClick: null,
  onDescriptionClick: null,
};

export const Empty = (p) => {
  const props = mergeProps(defaultProps, p);

  const { image, imageStyle, description, onImageClick, onDescriptionClick } =
    props;

  const imageNode =
    typeof image === 'string' ? (
      stringIsNullOrWhiteSpace(image) ? null : (
        <Image
          className={`${classPrefix}-image`}
          style={imageStyle}
          src={image}
          alt="empty"
        />
      )
    ) : (
      image
    );

  const descriptionNode =
    typeof description === 'string' ? (
      !stringIsNullOrWhiteSpace(description) ? (
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
      {imageNode ? (
        <View
          className={`${classPrefix}-image-container`}
          onClick={onImageClick}
        >
          {imageNode}
        </View>
      ) : null}

      {descriptionNode}
    </View>,
  );
};

Empty.defaultProps = {
  ...defaultProps,
};

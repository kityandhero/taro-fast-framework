import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  withNativeProps,
  mergeProps,
  inCollection,
} from 'taro-fast-common/es/utils/tools';

const classPrefix = `tfc-step`;

const statusCollection = ['wait', 'process', 'finish', 'error'];

const defaultProps = {
  title: '',
  description: '',
  icon: null,
  status: 'wait',
};

export const Step = (p) => {
  const props = mergeProps(defaultProps, p);

  const { title, description, icon, status: statusSource } = props;

  const status = inCollection(statusCollection, statusSource)
    ? statusSource
    : 'wait';

  return withNativeProps(
    props,
    <View
      className={classNames(
        `${classPrefix}`,
        `${classPrefix}-status-${status}`,
      )}
    >
      <View className={`${classPrefix}-indicator`}>
        <View className={`${classPrefix}-icon-container`}>{icon}</View>
      </View>
      <View className={`${classPrefix}-content`}>
        <View className={`${classPrefix}-title`}>{title}</View>
        {!!description && (
          <View className={`${classPrefix}-description`}>{description}</View>
        )}
      </View>
    </View>,
  );
};

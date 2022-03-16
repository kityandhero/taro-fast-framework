import { View } from '@tarojs/components';
import classNames from 'classnames';

import { inCollection } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

const classPrefix = `tfc-step`;

const statusCollection = ['wait', 'process', 'finish', 'error'];

const defaultProps = {
  title: '',
  description: '',
  icon: null,
};

class Step extends BaseComponent {
  getStatus = () => {
    const { status } = this.props;

    return inCollection(statusCollection, status) ? status : 'wait';
  };

  renderFurther() {
    const { title, description, icon } = this.props;

    const status = this.getStatus();

    return (
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
      </View>
    );
  }
}

Step.defaultProps = {
  ...defaultProps,
};

export default Step;

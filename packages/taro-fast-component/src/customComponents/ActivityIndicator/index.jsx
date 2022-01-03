import { PureComponent } from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';

import Loading from '../Loading';

import './index.less';

class ActivityIndicator extends PureComponent {
  render() {
    const { color, size, mode, content, isOpened } = this.props;

    const rootClass = classNames(
      'tfc-activity-indicator',
      {
        'tfc-activity-indicator--center': mode === 'center',
        'tfc-activity-indicator--isopened': isOpened,
      },
      this.props.className,
    );

    return (
      <View className={rootClass}>
        <View className="tfc-activity-indicator__body">
          <Loading size={size} color={color} />
        </View>
        {content && (
          <Text className="tfc-activity-indicator__content">{content}</Text>
        )}
      </View>
    );
  }
}

ActivityIndicator.defaultProps = {
  size: 0,
  mode: 'normal',
  color: '',
  content: '',
  className: '',
  isOpened: true,
};

export default ActivityIndicator;

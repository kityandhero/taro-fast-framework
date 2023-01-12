import classNames from 'classnames';
import { Text, View } from '@tarojs/components';

import BaseComponent from '../BaseComponent';
import Loading from '../Loading';

import './index.less';

const defaultProps = {
  visible: true,
  size: 0,
  borderWidth: 0,
  color: '',
  type: 'ring',
  mode: 'normal',
  content: '',
  className: '',
  style: {},
};

class ActivityIndicator extends BaseComponent {
  render() {
    const { color, size, type, borderWidth, mode, content, visible, style } =
      this.props;

    const rootClass = classNames(
      'tfc-activity-indicator',
      {
        'tfc-activity-indicator--center': mode === 'center',
        'tfc-activity-indicator--isopened': visible,
      },
      this.props.className,
    );

    return (
      <View className={rootClass} style={style}>
        <View className="tfc-activity-indicator__body">
          <Loading
            size={size}
            color={color}
            type={type}
            borderWidth={borderWidth}
          />
        </View>
        {content && (
          <Text className="tfc-activity-indicator__content" userSelect>
            {content}
          </Text>
        )}
      </View>
    );
  }
}

ActivityIndicator.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ActivityIndicator;

import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  customStyle: '',
  className: '',
  /**
   * Tab 方向，请跟 AtTabs 保持一致
   * @default 'horizontal'
   */
  direction: 'horizontal' | 'vertical',
  /**
   * 当前选中的标签索引值，从 0 计数，请跟 AtTabs 保持一致
   * @default 0
   */
  current: 0,
  /**
   * tabPane 排序，从 0 计数
   * @default 0
   */
  index: 0,
};

class AtTabsPane extends ComponentBase {
  render() {
    const {
      customStyle,
      className,
      direction: directionSource,
      index,
      current,
    } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return (
      <View
        className={classNames(
          {
            'tfc-tabs-pane': true,
            'tfc-tabs-pane--vertical': direction === 'vertical',
            'tfc-tabs-pane--active': index === current,
            'tfc-tabs-pane--inactive': index !== current,
          },
          className,
        )}
        style={customStyle}
      >
        {this.props.children}
      </View>
    );
  }
}

AtTabsPane.defaultProps = {
  ...defaultProps,
};

export default AtTabsPane;

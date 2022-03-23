import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  style: {},
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

class TabPanel extends BaseComponent {
  renderFurther() {
    const {
      style,
      className,
      direction: directionSource,
      index,
      current,
      children,
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
        style={style}
      >
        {children}
      </View>
    );
  }
}

TabPanel.defaultProps = {
  ...defaultProps,
};

export default TabPanel;

import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

const classPrefix = `tfc-tabs`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  style: {},
  panelStyle: {},
  /**
   * Tab 方向，请跟 AtTabs 保持一致
   * @default 'horizontal'
   */
  direction: 'horizontal' | 'vertical',
};

class TabPanel extends BaseComponent {
  renderFurther() {
    const {
      style,
      panelStyle,
      direction: directionSource,
      children,
    } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return (
      <View
        className={classNames(`${classPrefix}__pane`, {
          [`${classPrefix}__pane-horizontal`]: direction === 'horizontal',
          [`${classPrefix}__pane-vertical`]: direction === 'vertical',
        })}
        style={style}
      >
        <View style={panelStyle}> {children}</View>
      </View>
    );
  }
}

TabPanel.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default TabPanel;

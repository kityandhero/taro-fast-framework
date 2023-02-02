import classNames from 'classnames';
import { View } from '@tarojs/components';

import { checkInCollection, isObject } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

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

    const direction = checkInCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    let hasPanelStyle = false;

    if (isObject(panelStyle) && Object.keys(panelStyle).length > 0) {
      hasPanelStyle = true;
    }

    return (
      <View
        className={classNames(`${classPrefix}__pane`, {
          [`${classPrefix}__pane-horizontal`]: direction === 'horizontal',
          [`${classPrefix}__pane-vertical`]: direction === 'vertical',
        })}
        style={style}
      >
        {hasPanelStyle ? <View style={panelStyle}> {children}</View> : children}
      </View>
    );
  }
}

TabPanel.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { TabPanel };

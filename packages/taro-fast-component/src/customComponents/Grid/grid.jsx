import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

const classPrefix = `tfc-grid`;

const defaultProps = {
  /**
   * 列数
   */
  columns: 3,
  /**
   * 格子之间的间距
   */
  gap: 0,
};

class Grid extends ComponentBase {
  renderFurther() {
    const { gap, columns } = this.props;

    const style = {
      '--columns': columns.toString(),
    };

    if (gap !== undefined) {
      if (Array.isArray(gap)) {
        style['--gap-horizontal'] = `${gap[0]}px`;
        style['--gap-vertical'] = `${gap[1]}px`;
      } else {
        style['--gap'] = `${gap}px`;
      }
    }

    return (
      <View className={classPrefix} style={style}>
        {this.props.children}
      </View>
    );
  }
}

Grid.defaultProps = {
  ...defaultProps,
};

export default Grid;

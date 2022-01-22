import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
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
        style['--gap-horizontal'] = transformSize(gap[0]);
        style['--gap-vertical'] = transformSize(gap[1]);
      } else {
        style['--gap'] = transformSize(gap);
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

import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
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
  backgroundColor: '',
  onClick: null,
};

class Grid extends ComponentBase {
  triggerClick = (option) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(option.value);
    }
  };

  renderFurther() {
    const { gap, columns, backgroundColor } = this.props;

    const style = {
      ...(!!backgroundColor
        ? {
            backgroundColor: backgroundColor,
          }
        : {}),
      ...{
        '--columns': columns.toString(),
      },
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
      <View className={classPrefix} style={style} onClick={this.triggerClick}>
        {this.props.children}
      </View>
    );
  }
}

Grid.defaultProps = {
  ...defaultProps,
};

export default Grid;

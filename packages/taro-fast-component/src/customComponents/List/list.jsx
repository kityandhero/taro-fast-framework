import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const classPrefix = `tfc-list`;

const modeCollection = ['default', 'card'];

const defaultProps = {
  mode: 'default',
  style: {},
  header: null,
  headerStyle: {},
  bodyStyle: {},
};

class List extends ComponentBase {
  render() {
    const {
      style,
      header,
      headerStyle,
      bodyStyle,
      mode: modeSource,
      children,
    } = this.props;

    const mode = inCollection(modeCollection, modeSource)
      ? modeSource
      : 'default';

    return (
      <View
        className={classNames(classPrefix, `${classPrefix}-${mode}`)}
        style={style}
      >
        {header ? (
          <View className={`${classPrefix}-header`} style={headerStyle}>
            {header}
          </View>
        ) : null}

        <View className={`${classPrefix}-body`} style={bodyStyle}>
          <View className={`${classPrefix}-body-inner`}>{children}</View>
        </View>
      </View>
    );
  }
}

List.defaultProps = {
  ...defaultProps,
};

export default List;

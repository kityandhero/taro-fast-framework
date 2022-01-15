import { Text, View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {
  num: 0,
  separator: ':',
};

class Item extends ComponentBase {
  formatNum(num) {
    return num <= 9 ? `0${num}` : `${num}`;
  }

  render() {
    const { num, separator } = this.props;

    return (
      <View className="tfc-countdown__item">
        <View className="tfc-countdown__time-box">
          <Text className="tfc-countdown__time">{this.formatNum(num)}</Text>
        </View>

        <View className="tfc-countdown__separator">
          <Text>{separator}</Text>
        </View>
      </View>
    );
  }
}

Item.defaultProps = {
  ...defaultProps,
};

export default Item;

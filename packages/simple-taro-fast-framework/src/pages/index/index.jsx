import { Component } from "react";
import { View, Text } from "@tarojs/components";

import { formatMoney, notifySuccess } from "taro-fast-framework/es/utils/tools";

import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <Text>{formatMoney({ number: 1.54 })}</Text>
      </View>
    );
  }
}

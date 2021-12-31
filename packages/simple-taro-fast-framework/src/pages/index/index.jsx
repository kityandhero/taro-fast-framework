import { Component } from "react";
import { View, Text } from "@tarojs/components";

import {
  formatMoney,
  getTaroGlobalData,
} from "taro-fast-framework/es/utils/tools";
import VerticalBox from "taro-fast-framework/es/customComponents/VerticalBox";

import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const a = getTaroGlobalData();

    if (a) {
      console.log(a);
    }

    return (
      <View className="index">
        <Text>Hello world!</Text>

        <VerticalBox style={{ height: "100rpx" }} alignJustify="center">
          <Text>{formatMoney({ number: 1.54 })}</Text>
        </VerticalBox>
      </View>
    );
  }
}

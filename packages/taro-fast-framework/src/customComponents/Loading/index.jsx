import { Component } from "react";
import { View } from "@tarojs/components";

import { pxTransform } from "../../utils/tools";
import { toNumber, toString } from "../../utils/typeConvert";

import styles from "./index.less";

class Loading extends Component {
  render() {
    const { color, size } = this.props;
    const loadingSize = typeof size === "string" ? size : toString(size);
    const sizeStyle = {
      width: size ? `${pxTransform(toNumber(loadingSize))}` : "",
      height: size ? `${pxTransform(toNumber(loadingSize))}` : "",
    };
    const colorStyle = {
      border: color ? `1px solid ${color}` : "",
      borderColor: color ? `${color} transparent transparent transparent` : "",
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);

    return (
      <View className={styles.loading} style={sizeStyle}>
        <View className={styles.ring} style={ringStyle}></View>
        <View className={styles.ring} style={ringStyle}></View>
        <View className={styles.ring} style={ringStyle}></View>
      </View>
    );
  }
}

Loading.defaultProps = {
  size: 0,
  color: "",
};

export default Loading;

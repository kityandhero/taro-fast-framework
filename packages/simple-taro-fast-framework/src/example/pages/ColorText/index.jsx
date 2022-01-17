import { View } from '@tarojs/components';

import { Card, ColorText } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="一般用法">
          <ColorText textPrefix="前缀" text="文本文字" />
        </Card>

        <Card header="自定义分隔符">
          <ColorText textPrefix="前缀" separator="@" text="文本文字" />
        </Card>

        <Card header="点击复制">
          <ColorText textPrefix="前缀" separator="@" text="文本文字" canCopy />
        </Card>

        <Card header="点击复制并进行回调">
          <ColorText
            textPrefix="前缀"
            separator="@"
            text="文本文字"
            canCopy
            copySuccessCallback={(v) => {
              console.log(`copySuccessCallback: ${v}`);
            }}
          />
        </Card>

        <Card header="颜色">
          <ColorText textPrefix="前缀" text="文本文字" color="#e54321" />
        </Card>

        <Card header="随机颜色">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            randomColor
            randomSeed={43}
            seedOffset={23}
          />
        </Card>

        <Card header="前缀样式">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            textPrefixStyle={{ color: '#67ca31' }}
          />
        </Card>

        <Card header="分隔符样式">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{ color: '#67ca31', margin: '0 24rpx' }}
          />
        </Card>
      </View>
    );
  }
}

import { View } from '@tarojs/components';

import { BlockArea, ColorText } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="一般用法">
          <ColorText textPrefix="前缀" text="文本文字" />
        </BlockArea>

        <BlockArea title="自定义分隔符">
          <ColorText textPrefix="前缀" separator="@" text="文本文字" />
        </BlockArea>

        <BlockArea title="点击复制">
          <ColorText textPrefix="前缀" separator="@" text="文本文字" canCopy />
        </BlockArea>

        <BlockArea title="点击复制并进行回调">
          <ColorText
            textPrefix="前缀"
            separator="@"
            text="文本文字"
            canCopy
            copySuccessCallback={(v) => {
              console.log(`copySuccessCallback: ${v}`);
            }}
          />
        </BlockArea>

        <BlockArea title="颜色">
          <ColorText textPrefix="前缀" text="文本文字" color="#e54321" />
        </BlockArea>

        <BlockArea title="随机颜色">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            randomColor
            randomSeed={43}
            seedOffset={23}
          />
        </BlockArea>

        <BlockArea title="前缀样式">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            textPrefixStyle={{ color: '#67ca31' }}
          />
        </BlockArea>

        <BlockArea title="分隔符样式">
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{ color: '#67ca31', margin: '0 24rpx' }}
          />
        </BlockArea>
      </View>
    );
  }
}

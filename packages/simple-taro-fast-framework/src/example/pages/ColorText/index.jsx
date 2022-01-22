import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-component/es/utils/tools';
import {
  Card,
  Icon,
  ImageBox,
  ColorText,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconEdit } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="一般用法" headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" text="文本文字" />
        </Card>

        <Card header="自定义分隔符" headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" separator="@" text="文本文字" />
        </Card>

        <Card header="点击复制" headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" separator="@" text="文本文字" canCopy />
        </Card>

        <Card header="点击复制并进行回调" headerStyle={cardHeaderStyle}>
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

        <Card header="颜色" headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" text="文本文字" color="#e54321" />
        </Card>

        <Card header="随机颜色" headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            randomColor
            randomSeed={43}
            seedOffset={23}
          />
        </Card>

        <Card header="前缀样式" headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            textPrefixStyle={{ color: '#67ca31' }}
          />
        </Card>

        <Card header="附带图标" headerStyle={cardHeaderStyle}>
          <ColorText
            icon={<IconEdit size={36} color="#ff3ce7" />}
            text="文本文字"
          />
        </Card>

        <Card header="附带图片" headerStyle={cardHeaderStyle}>
          <ColorText
            icon={
              <View style={{ width: transformSize(40) }}>
                <ImageBox circle src="https://jdc.jd.com/img/200" />
              </View>
            }
            text="文本文字"
          />
        </Card>

        <Card header="分隔符样式" headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{ color: '#67ca31', margin: '0 var(--tfc-24)' }}
          />
        </Card>

        <Card header="复杂样例" headerStyle={cardHeaderStyle}>
          <ColorText
            icon={<IconEdit size={32} color="#ff3ce7" />}
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{ color: '#67ca31', margin: '0 var(--tfc-24)' }}
          />
        </Card>
      </View>
    );
  }
}

import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Icon,
  ImageBox,
  ColorText,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import logoImg from '../../../assets/images/logo.png';

const { IconEdit } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ColorText',
    name: '装饰文字',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="一般用法" style={style} headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" text="文本文字" />
        </Card>

        <Card header="自定义分隔符" style={style} headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" separator="@" text="文本文字" />
        </Card>

        <Card header="点击复制" style={style} headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" separator="@" text="文本文字" canCopy />
        </Card>

        <Card
          header="点击复制并进行回调"
          style={style}
          headerStyle={cardHeaderStyle}
        >
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

        <Card header="颜色" style={style} headerStyle={cardHeaderStyle}>
          <ColorText textPrefix="前缀" text="文本文字" color="#e54321" />
        </Card>

        <Card header="随机颜色" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            randomColor
            randomSeed={43}
            seedOffset={23}
          />
        </Card>

        <Card header="前缀样式" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            textPrefixStyle={{ color: '#67ca31' }}
          />
        </Card>

        <Card header="附带图标" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            icon={<IconEdit size={36} color="#ff3ce7" />}
            text="文本文字"
          />
        </Card>

        <Card header="附带图片" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            icon={
              <View style={{ width: transformSize(40) }}>
                <ImageBox circle src={logoImg} />
              </View>
            }
            text="文本文字"
          />
        </Card>

        <Card header="分隔符样式" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{
              color: '#67ca31',
              margin: `0 ${transformSize(24)}`,
            }}
          />
        </Card>

        <Card header="复杂样例" style={style} headerStyle={cardHeaderStyle}>
          <ColorText
            icon={<IconEdit size={32} color="#ff3ce7" />}
            textPrefix="前缀"
            text="文本文字"
            separatorStyle={{
              color: '#67ca31',
              margin: `0 ${transformSize(24)}`,
            }}
          />
        </Card>
      </Space>
    );
  };
}

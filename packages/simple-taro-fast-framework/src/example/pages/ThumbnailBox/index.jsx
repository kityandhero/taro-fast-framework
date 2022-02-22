import { View } from '@tarojs/components';

import {
  Card,
  Space,
  ThumbnailBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const boxStyle = {
  backgroundColor: '',
};

const contentText =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字';

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ThumbnailBox',
    name: '缩略容器',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="简单使用" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox>{contentText}</ThumbnailBox>
          </View>
        </Card>

        <Card header="设置文字" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox expandText="展开" shrinkText="收缩">
              {contentText}
            </ThumbnailBox>
          </View>
        </Card>

        <Card header="可收缩" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox repeatShrink>{contentText}</ThumbnailBox>
          </View>
        </Card>

        <Card header="设置收缩高度" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox height={400} repeatShrink>
              {contentText}
            </ThumbnailBox>
          </View>
        </Card>

        <Card header="背景" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox backgroundColor="blue" repeatShrink>
              {contentText}
            </ThumbnailBox>
          </View>
        </Card>

        <Card header="操作栏背景" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox actionBackgroundColor="blue" repeatShrink>
              {contentText}
            </ThumbnailBox>
          </View>
        </Card>

        <Card header="操作栏颜色" style={style} headerStyle={cardHeaderStyle}>
          <View style={boxStyle}>
            <ThumbnailBox actionColor="green" repeatShrink>
              {contentText}
            </ThumbnailBox>
          </View>
        </Card>
      </Space>
    );
  };
}

import { View } from '@tarojs/components';

import { Card, HelpBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const list = [
  {
    text: 'Html数据展示，空白将替换为Empty.',
  },
  {
    text: '帮助条目2.',
  },
  {
    text: '帮助条目3.',
  },
  {
    text: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的帮助条目.',
  },
];

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="一般用法" headerStyle={cardHeaderStyle}>
          <HelpBox list={list} />
        </Card>

        <Card header="隐藏标题" headerStyle={cardHeaderStyle}>
          <HelpBox list={list} showTitle={false} />
        </Card>

        <Card header="不显示行号" headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle showNumber={false} list={list} />
        </Card>

        <Card header="标题宽度" headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle labelWidth={80} list={list} />
        </Card>

        <Card header="无背景" headerStyle={cardHeaderStyle}>
          <HelpBox
            title="操作说明"
            showTitle
            useBackground={false}
            list={list}
          />
        </Card>

        <Card header="隐藏" headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle hidden list={list} />
        </Card>
      </View>
    );
  }
}
import { View } from '@tarojs/components';

import { BlockArea, HelpBox } from 'taro-fast-component/es/customComponents';

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
        <BlockArea title="一般用法">
          <HelpBox list={list} />
        </BlockArea>

        <BlockArea title="隐藏标题">
          <HelpBox list={list} showTitle={false} />
        </BlockArea>

        <BlockArea title="不显示行号">
          <HelpBox title="操作说明" showTitle showNumber={false} list={list} />
        </BlockArea>

        <BlockArea title="标题宽度">
          <HelpBox title="操作说明" showTitle labelWidth={80} list={list} />
        </BlockArea>

        <BlockArea title="无背景">
          <HelpBox
            title="操作说明"
            showTitle
            useBackground={false}
            list={list}
          />
        </BlockArea>

        <BlockArea title="隐藏">
          <HelpBox title="操作说明" showTitle hidden list={list} />
        </BlockArea>
      </View>
    );
  }
}

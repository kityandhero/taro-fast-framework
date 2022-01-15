import { View } from '@tarojs/components';

import { BlockArea, HelpBox } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="一般用法">
          <HelpBox
            list={[
              {
                text: 'Html数据展示，空白将替换为Empty',
              },
              {
                text: '帮助条目2',
              },
              {
                text: '帮助条目3',
              },
              {
                text: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的帮助条目',
              },
            ]}
          />
        </BlockArea>
      </View>
    );
  }
}

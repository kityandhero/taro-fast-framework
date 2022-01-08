import { View } from '@tarojs/components';

import { BlockArea, Divider } from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="基础分割线">
          <Divider />
        </BlockArea>

        <BlockArea title="带内容的分割线">
          <Divider>默认内容在中间</Divider>
          <Divider contentPosition="left">左侧内容</Divider>
          <Divider contentPosition="right">右侧内容</Divider>
        </BlockArea>

        <BlockArea title="自定义样式">
          <Divider
            style={{
              color: '#1677ff',
              borderColor: '#1677ff',
              borderStyle: 'dashed',
            }}
          >
            自定义样式
          </Divider>
        </BlockArea>
      </View>
    );
  }
}

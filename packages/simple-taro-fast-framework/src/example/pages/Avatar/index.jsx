import { View } from '@tarojs/components';

import {
  BlockArea,
  Space,
  Avatar,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="Avatar">
          <Space wrap>
            <Avatar circle text="头像" />
            <Avatar text="头像" />
            <Avatar circle image="https://jdc.jd.com/img/200" />
            <Avatar image="https://jdc.jd.com/img/200" />
          </Space>
        </BlockArea>
      </View>
    );
  }
}

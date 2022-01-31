import { View } from '@tarojs/components';

import {
  Card,
  Copyright,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="用法展示" headerStyle={cardHeaderStyle}>
            <Copyright logo="https://jdc.jd.com/img/200" />
          </Card>

          <Card header="用法展示" headerStyle={cardHeaderStyle}>
            <Copyright name="*******有限公司" />
          </Card>

          <Card header="用法展示" headerStyle={cardHeaderStyle}>
            <Copyright copyright="Copyright © 2018-2022 all rights reserved" />
          </Card>

          <Card header="用法展示" headerStyle={cardHeaderStyle}>
            <Copyright
              circle
              logo="https://jdc.jd.com/img/200"
              name="*******有限公司"
              copyright="Copyright © 2018-2022 all rights reserved"
            />
          </Card>
        </Space>
      </View>
    );
  }
}

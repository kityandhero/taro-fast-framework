import { View } from '@tarojs/components';

import { Card, Copyright } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="用法展示">
          <Copyright logo="https://jdc.jd.com/img/200" />
        </Card>

        <Card header="用法展示">
          <Copyright name="*******有限公司" />
        </Card>

        <Card header="用法展示">
          <Copyright copyright="Copyright © 2018-2022 all rights reserved" />
        </Card>

        <Card header="用法展示">
          <Copyright
            circle
            logo="https://jdc.jd.com/img/200"
            name="*******有限公司"
            copyright="Copyright © 2018-2022 all rights reserved"
          />
        </Card>
      </View>
    );
  }
}

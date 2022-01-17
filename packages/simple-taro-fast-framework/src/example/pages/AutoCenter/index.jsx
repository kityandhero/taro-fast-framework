import { View } from '@tarojs/components';

import { AutoCenter, Card } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="AutoCenter">
          <AutoCenter>
            Esse ad minim incididunt elit veniam elit deserunt. Enim nisi duis
            aliquip mollit adipisicing. Dolor excepteur ipsum in quis magna
            irure exercitation ad anim adipisicing irure commodo. Culpa
            adipisicing duis est irure occaecat officia reprehenderit nisi magna
            nulla enim nostrud. Nisi commodo excepteur do sint Lorem qui laboris
            incididunt id. Elit ex dolor minim ullamco ex mollit commodo laboris
            voluptate aute nostrud Lorem. Nulla et elit in anim incididunt id
            culpa Lorem. Dolore ullamco aliqua do reprehenderit consectetur
            proident occaecat laborum tempor proident ipsum labore quis culpa.
          </AutoCenter>
        </Card>
      </View>
    );
  }
}

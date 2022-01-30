import { View } from '@tarojs/components';

import { Card, Collapse } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

// const style = {
//   height: transformSize(400),
//   backgroundColor: '#ccc',
// };

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card
          header="基本展示"
          headerStyle={cardHeaderStyle}
          style={{ backgroundColor: '#fff' }}
          space={false}
        >
          <Collapse
            // style={style}
            list={[
              {
                label: '标题1',
                body: '面板1',
              },
              {
                label: '标题2',
                body: '面板2',
              },
            ]}
          />
        </Card>
      </View>
    );
  }
}

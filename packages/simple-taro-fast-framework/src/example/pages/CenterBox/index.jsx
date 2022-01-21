import { View } from '@tarojs/components';

import { Card, CenterBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const boxStyle = {
  width: 'var(--tfc-px-80)',
  height: 'var(--tfc-px-80)',
  backgroundColor: 'blue',
};

const style = {
  height: 'var(--tfc-px-400)',
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="布局展示" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <CenterBox style={style}>
              <View style={boxStyle}></View>
            </CenterBox>
          </View>
        </Card>
      </View>
    );
  }
}

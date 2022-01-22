import { View } from '@tarojs/components';

import {
  Card,
  HorizontalCenterBox,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = {
  border: 'var(--tfc-2) solid #ccc',
  height: 'var(--tfc-200)',
};

const boxStyle = {
  width: 'var(--tfc-80)',
  height: 'var(--tfc-80)',
  backgroundColor: 'blue',
  margin: 'var(--tfc-20)',
};

const horizontalCenterBoxStyle = {
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="默认布局" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <HorizontalCenterBox style={horizontalCenterBoxStyle}>
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </Card>

        <Card header="不自动使用父级高度" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <HorizontalCenterBox
              style={horizontalCenterBoxStyle}
              fillHeight={false}
            >
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </Card>

        <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            list={[
              {
                text: 'style: 默认值为 null.',
              },
              {
                text: 'fillHeight: 默认值为 true.',
              },
            ]}
          />
        </Card>
      </View>
    );
  }
}

import { View } from '@tarojs/components';

import { Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Css 全局变量',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: 'Css 全局变量',
    description: 'Css全局变量说明',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="像素变量"
          description={[
            {
              text: '1000 ~ 2000 之间,步长变更为10',
            },
          ]}
        >
          <Space wrap>
            <View>--tfc-1 ~ --tfc-2000</View>
          </Space>
        </SimpleBox>

        <SimpleBox header="其他" style={style} headerStyle={cardHeaderStyle}>
          <View>请参阅 taro-fast-common/es/constants.css</View>
        </SimpleBox>
      </Space>
    );
  };
}

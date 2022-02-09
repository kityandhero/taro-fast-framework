import { View } from '@tarojs/components';

import { Card, Space, HelpBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: '颜色',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="像素变量"
            style={style}
            headerStyle={cardHeaderStyle}
            footer={
              <HelpBox
                showTitle={false}
                showNumber={false}
                list={[
                  {
                    text: '1000 ~ 2000 之间,步长变更为10',
                  },
                ]}
              />
            }
          >
            <Space wrap>
              <View>--tfc-1 ~ --tfc-2000</View>
            </Space>
          </Card>

          <Card header="其他" style={style} headerStyle={cardHeaderStyle}>
            <View>请参阅 taro-fast-common/es/constants.css</View>
          </Card>
        </Space>
      </View>
    );
  };
}

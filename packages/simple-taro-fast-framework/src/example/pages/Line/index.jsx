import {
  Card,
  Line,
  VerticalBox,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

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
    id: 'Line',
    name: '线条',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="水平线 默认" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Line />
          </VerticalBox>
        </Card>

        <Card header="水平线 宽度" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Line width={400} />
          </VerticalBox>
        </Card>

        <Card header="水平线 高度" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Line height={12} />
          </VerticalBox>
        </Card>

        <Card header="水平线 颜色" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Line color="#45672e" />
          </VerticalBox>
        </Card>

        <Card
          header="水平线 颜色渐变"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <VerticalBox>
            <Line color={['#45672e', '#01e456', '#de1245']} height={12} />
          </VerticalBox>
        </Card>

        <Card header="垂直线" style={style} headerStyle={cardHeaderStyle}>
          <CenterBox>
            <Line direction="vertical" width={4} height={40} />
          </CenterBox>
        </Card>
      </Space>
    );
  };
}

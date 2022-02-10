import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Row, Col, Card, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const rowStyle = {
  height: transformSize(80),
  backgroundColor: '#ccc',
};

const blueStyle = {
  backgroundColor: 'blue',
};

const greenStyle = {
  backgroundColor: 'green',
};

const redStyle = {
  backgroundColor: '#a51278',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Flex',
    name: '弹性布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="布局展示"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="center size: 1"
        >
          <Row justify="center" style={rowStyle}>
            <Col size={1} style={blueStyle}></Col>
            <Col size={1} style={greenStyle}></Col>
          </Row>
        </Card>

        <Card
          header="布局展示"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="size: 4"
        >
          <Row style={rowStyle}>
            <Col size={4} style={blueStyle}></Col>
            <Col size={4} style={redStyle}></Col>
            <Col size={4} style={greenStyle}></Col>
          </Row>
        </Card>

        <Card
          header="布局展示"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="size: 6"
        >
          <Row style={rowStyle}>
            <Col size={6} style={blueStyle}></Col>
            <Col size={6} style={greenStyle}></Col>
          </Row>
        </Card>
      </Space>
    );
  };
}

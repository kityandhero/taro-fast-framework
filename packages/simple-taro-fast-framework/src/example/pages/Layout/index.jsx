import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Row, Col, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const blueStyle = {
  backgroundColor: 'blue',
};

const greenStyle = {
  backgroundColor: 'green',
};

const redStyle = {
  backgroundColor: '#a51278',
};

const style = {
  height: transformSize(80),
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="布局展示 center size: 1"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Row justify="center" style={style}>
              <Col size={1} style={blueStyle}></Col>
              <Col size={1} style={greenStyle}></Col>
            </Row>
          </Card>

          <Card
            header="布局展示 size: 4"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Row style={style}>
              <Col size={4} style={blueStyle}></Col>
              <Col size={4} style={redStyle}></Col>
              <Col size={4} style={greenStyle}></Col>
            </Row>
          </Card>

          <Card
            header="布局展示 size: 6"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Row style={style}>
              <Col size={6} style={blueStyle}></Col>
              <Col size={6} style={greenStyle}></Col>
            </Row>
          </Card>
        </Space>
      </View>
    );
  }
}

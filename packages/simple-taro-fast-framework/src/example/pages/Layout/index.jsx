import { View } from '@tarojs/components';

import { Card, Row, Col } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
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
  height: 'var(--tfc-80)',
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="布局展示 center size: 1" headerStyle={cardHeaderStyle}>
          <Row justify="center" style={style}>
            <Col size={1} style={blueStyle}></Col>
            <Col size={1} style={greenStyle}></Col>
          </Row>
        </Card>

        <Card header="布局展示 size: 4" headerStyle={cardHeaderStyle}>
          <Row style={style}>
            <Col size={4} style={blueStyle}></Col>
            <Col size={4} style={redStyle}></Col>
            <Col size={4} style={greenStyle}></Col>
          </Row>
        </Card>

        <Card header="布局展示 size: 6" headerStyle={cardHeaderStyle}>
          <Row style={style}>
            <Col size={6} style={blueStyle}></Col>
            <Col size={6} style={greenStyle}></Col>
          </Row>
        </Card>
      </View>
    );
  }
}

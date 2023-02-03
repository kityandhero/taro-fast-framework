import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Col, Row, Space } from 'taro-fast-component';

import CodeBox from '../../../customComponents/CodeBox';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Flex布局',
  backgroundColor: '#3778F4',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Flex',
    name: '弹性布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="布局展示" useInnerBox={false}>
          <Row justify="center" style={rowStyle}>
            <Col size={1} style={blueStyle}></Col>
            <Col size={1} style={greenStyle}></Col>
          </Row>
        </SimpleBox>

        <SimpleBox header="布局展示" useInnerBox={false}>
          <Row style={rowStyle}>
            <Col size={4} style={blueStyle}></Col>
            <Col size={4} style={redStyle}></Col>
            <Col size={4} style={greenStyle}></Col>
          </Row>
        </SimpleBox>

        <SimpleBox header="布局展示" useInnerBox={false}>
          <Row style={rowStyle}>
            <Col size={6} style={blueStyle}></Col>
            <Col size={6} style={greenStyle}></Col>
          </Row>
        </SimpleBox>

        <CodeBox
          componentName="Row"
          mockChildren
          config={{
            justify: 'center',
            style: rowStyle,
          }}
        />

        <CodeBox
          componentName="Col"
          mockChildren
          config={{
            size: 'center',
            style: blueStyle,
          }}
        />

        <PropertyBox
          header="Row 可配置项以及默认值"
          config={Row.defaultProps}
          labelWidth={240}
        />

        <PropertyBox
          header="Col 可配置项以及默认值"
          config={Col.defaultProps}
          labelWidth={240}
        />
      </Space>
    );
  };
}

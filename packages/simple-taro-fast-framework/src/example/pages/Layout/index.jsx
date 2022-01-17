import { View } from '@tarojs/components';

import {
  Card,
  Row,
  Col,
  HorizontalCenterBox,
  FlexBox,
  VerticalBox,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    const rowStyle = {
      backgroundColor: '#cdd1d5bf',
    };

    const colStyle = {
      textAlign: 'center',
      backgroundColor: '#0092ffbf',
    };

    return (
      <View className="index">
        <Card header="Flex">
          <View>
            <Row justify="center" style={rowStyle}>
              <Col size={1} style={colStyle}>
                1
              </Col>
              <Col size={1} style={colStyle}>
                1
              </Col>
            </Row>
          </View>
          <View>
            <Row style={rowStyle}>
              <Col size={4} style={colStyle}>
                4
              </Col>
              <Col size={4}>4</Col>
              <Col size={4} style={colStyle}>
                4
              </Col>
            </Row>
          </View>
          <View>
            <Row style={rowStyle}>
              <Col size={6} style={colStyle}>
                6
              </Col>
              <Col size={6}>6</Col>
            </Row>
          </View>
        </Card>

        <Card header="FlexBox">
          <FlexBox left="仅左侧" />

          <FlexBox
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="right"
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            style={{ height: '200rpx' }}
            direction="vertical"
            vertical={{
              bottomHeight: '80rpx',
            }}
            top="上侧"
            topStyle={rowStyle}
            bottom="下侧"
            bottomStyle={colStyle}
          />
        </Card>

        <Card header="HorizontalCenterBox">
          <HorizontalCenterBox>1</HorizontalCenterBox>
        </Card>

        <Card header="VerticalBox">
          <View style={{ height: '100rpx' }}>
            <VerticalBox>1</VerticalBox>
          </View>
        </Card>
      </View>
    );
  }
}

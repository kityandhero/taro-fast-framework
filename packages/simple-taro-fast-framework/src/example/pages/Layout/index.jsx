import { View } from '@tarojs/components';

import {
  BlockArea,
  Row,
  Col,
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

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
        <BlockArea title="Flex">
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
        </BlockArea>

        <BlockArea title="FlexBox">
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
        </BlockArea>

        <BlockArea title="CenterBox">
          <CenterBox>1</CenterBox>
        </BlockArea>

        <BlockArea title="VerticalBox">
          <View style={{ height: '100rpx' }}>
            <VerticalBox>1</VerticalBox>
          </View>
        </BlockArea>
      </View>
    );
  }
}

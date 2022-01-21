import { View, Text } from '@tarojs/components';

import {
  roundToTarget,
  getGuid,
  formatTarget,
} from 'taro-fast-common/es/utils/tools';
import { formatCollection } from 'taro-fast-common/es/utils/constants';
import {
  Card,
  Button,
  HorizontalCenterBox,
  Space,
  Divider,
  FlexBox,
  Row,
  Col,
} from 'taro-fast-component/es/customComponents';
import { Circle } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

export default class Index extends PageWrapper {
  id = null;

  sTemp = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        color: '#ee0a24',
        percent: 0.3,
        size: 400,
      },
    };

    this.id = getGuid();
  }

  setPercent = (v) => {
    const { percent } = this.state;

    const tmp = roundToTarget(percent + v, 2);

    if (tmp <= 0) {
      this.setState({ percent: 0 });

      return;
    }

    if (tmp >= 1) {
      this.setState({ percent: 1 });

      return;
    }

    this.setState({ percent: tmp });
  };

  renderFurther() {
    const { size, color, percent } = this.state;

    return (
      <View className="index">
        <Card header="demo" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <Circle
              style={{
                border: 'var(--tfc-px-2) solid #ccc',
                padding: 'var(--tfc-px-6)',
                backgroundColor: '#fff',
              }}
              backRingColor="#ccc"
              percent={percent}
              size={size}
              color={color}
              useLineColorGradient
              lineColorStart="#A9D25B"
              lineColorEnd="#FA5A2D"
            >
              <View
                style={{
                  height: 'var(--tfc-px-100)',
                }}
              >
                <FlexBox
                  direction="vertical"
                  bottomStyle={{
                    height: 'var(--tfc-px-80)',
                  }}
                  top={
                    <HorizontalCenterBox>
                      <Text>
                        {formatTarget({
                          target: percent,
                          format: formatCollection.percentage,
                        })}
                      </Text>
                    </HorizontalCenterBox>
                  }
                  bottom={<HorizontalCenterBox>当前进度</HorizontalCenterBox>}
                ></FlexBox>
              </View>
            </Circle>

            <Divider />

            <Row>
              <Col size={3}>
                <Circle
                  percent={percent}
                  size={140}
                  color="#45e236"
                  lineWidth={10}
                >
                  <Text>
                    {formatTarget({
                      target: percent,
                      format: formatCollection.percentage,
                    })}
                  </Text>
                </Circle>
              </Col>
              <Col size={3}>
                <Circle
                  style={{
                    backgroundColor: '#ccc',
                  }}
                  percent={percent}
                  size={140}
                  lineWidth={10}
                  useLineColorGradient
                  lineColorStart="#0432a7"
                  lineColorEnd="#f02901"
                />
              </Col>
              <Col size={3}>
                <Circle
                  style={
                    {
                      // backgroundColor: '#ccc',
                      // border: 'var(--tfc-px-10) solid #ccc',
                    }
                  }
                  backRingColor="#ccc"
                  percent={percent}
                  size={140}
                  lineWidth={10}
                  color={color}
                  lineCap="butt"
                />
              </Col>
              <Col size={3}>
                <Circle
                  percent={percent}
                  size={140}
                  lineWidth={10}
                  color={color}
                >
                  <Text>
                    {formatTarget({
                      target: percent,
                      format: formatCollection.percentage,
                    })}
                  </Text>
                </Circle>
              </Col>
            </Row>

            <Divider />

            <HorizontalCenterBox>
              <Space>
                <Button
                  type="primary"
                  // size="mini"
                  onClick={() => {
                    this.setPercent(0.1);
                  }}
                >
                  增加
                </Button>

                <Button
                  type="danger"
                  // size="mini"
                  onClick={() => {
                    this.setPercent(-0.1);
                  }}
                >
                  减小
                </Button>
              </Space>
            </HorizontalCenterBox>
          </Space>
        </Card>
      </View>
    );
  }
}

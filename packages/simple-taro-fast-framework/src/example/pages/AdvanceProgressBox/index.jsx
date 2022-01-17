import { View } from '@tarojs/components';

import { showInfoMessage } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  AdvanceProgressBox,
  Button,
  Icon,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

const { IconCheckCircle } = Icon;

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        percent: 0,
        percent2: 0,
      },
    };
  }

  setPercent = (value) => {
    const { percent } = this.state;

    const v = percent + value;

    this.setState({
      percent: v >= 100 ? 100 : v,
    });
  };

  reSetPercent = () => {
    this.setState({
      percent: 0,
    });
  };

  setPercent2 = (value) => {
    const { percent2 } = this.state;

    const v = percent2 + value;

    this.setState({
      percent2: v >= 100 ? 100 : v,
    });
  };

  reSetPercent2 = () => {
    this.setState({
      percent2: 0,
    });
  };

  renderFurther() {
    const { percent, percent2 } = this.state;

    return (
      <View className="index">
        <Card header="Layout: Horizontal">
          <Space direction="vertical" block>
            <View>
              <Button
                color="primary"
                fill="outline"
                size="mini"
                onClick={() => {
                  this.reSetPercent();
                }}
              >
                重置
              </Button>
            </View>
            <AdvanceProgressBox
              label="处理进度"
              percent={percent}
              extra={
                <Button
                  color="primary"
                  size="mini"
                  disabled={percent === 100}
                  onClick={() => {
                    this.setPercent(10);
                  }}
                  style={{ marginLeft: '8px' }}
                >
                  进度+10
                </Button>
              }
            />
          </Space>
        </Card>

        <Card header="Layout: Vertical">
          <Space direction="vertical" block>
            <View>
              <Button
                color="primary"
                fill="outline"
                size="mini"
                onClick={() => {
                  this.reSetPercent2();
                }}
              >
                重置
              </Button>
            </View>
            <AdvanceProgressBox
              layout="vertical"
              label="处理进度"
              percent={percent2}
              extra={
                <Button
                  color="primary"
                  size="mini"
                  disabled={percent2 === 100}
                  onClick={() => {
                    this.setPercent2(10);
                  }}
                  style={{ marginLeft: '8px' }}
                >
                  进度+10
                </Button>
              }
            />
          </Space>
        </Card>

        <Card header="Simple: Horizontal">
          <AdvanceProgressBox
            label="进度"
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={14}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={19} showInfo color="green" />}
            extra={
              <Button
                color="primary"
                size="mini"
                onClick={() => {
                  showInfoMessage({
                    message: 'click',
                  });
                }}
                style={{ marginLeft: '8px' }}
              >
                处理
              </Button>
            }
            extraStyle={
              {
                // padding: '0 10rpx',
              }
            }
          />
        </Card>

        <Card header="Simple: Vertical">
          <AdvanceProgressBox
            layout="vertical"
            label="进度"
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={14}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={19} showInfo color="green" />}
            extra={
              <Button
                color="primary"
                size="mini"
                onClick={() => {
                  showInfoMessage({
                    message: 'click',
                  });
                }}
                style={{ marginLeft: '8px' }}
              >
                处理
              </Button>
            }
            extraStyle={
              {
                // padding: '0 10rpx',
              }
            }
          />
        </Card>
      </View>
    );
  }
}

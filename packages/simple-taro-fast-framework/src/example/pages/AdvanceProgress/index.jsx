import { View } from '@tarojs/components';

import {
  Card,
  Space,
  AdvanceProgress,
  Button,
  Icon,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconCheckCircle } = Icon;

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        percent: 0,
      },
    };
  }

  setPercent = (value) => {
    const { percent } = this.state;

    this.setState({
      percent: percent + value,
    });
  };

  reSetPercent = () => {
    this.setState({
      percent: 0,
    });
  };

  renderFurther() {
    const { percent } = this.state;

    return (
      <View className="index">
        <Card header="动画" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <View>
              <Button
                color="primary"
                disabled={percent === 100}
                onClick={() => {
                  this.setPercent(10);
                }}
                style={{ marginRight: 'val(--tfc-8)' }}
              >
                进度+10
              </Button>
              <Button
                color="primary"
                fill="outline"
                onClick={() => {
                  this.reSetPercent();
                }}
              >
                重置
              </Button>
            </View>
            <AdvanceProgress percent={percent} active />
            <AdvanceProgress percent={percent} active activeMode="forwards" />
          </Space>
        </Card>

        <Card header="Hidden" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <AdvanceProgress hidden percent={percent} />
          </Space>
        </Card>

        <Card header="指定线条宽度" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <AdvanceProgress percent={50} strokeWidth={2} />
            <AdvanceProgress percent={75} strokeWidth={6} />
            <AdvanceProgress percent={100} strokeWidth={8} />
          </Space>
        </Card>

        <Card header="指定颜色" headerStyle={cardHeaderStyle}>
          <AdvanceProgress
            percent={50}
            activeColor="#FF3141"
            backgroundColor="#000000"
          />
        </Card>

        <Card header="圆角" headerStyle={cardHeaderStyle}>
          <AdvanceProgress percent={50} borderRadius={4} />
        </Card>

        <Card header="显示百分比" headerStyle={cardHeaderStyle}>
          <AdvanceProgress percent={50} showInfo />
        </Card>

        <Card header="百分比字体大小" headerStyle={cardHeaderStyle}>
          <AdvanceProgress percent={50} showInfo fontSize={12} />
        </Card>

        <Card header="Icon" headerStyle={cardHeaderStyle}>
          <AdvanceProgress
            percent={50}
            icon={<IconCheckCircle size={19} color="green" />}
          />
        </Card>

        <Card header="Simple" headerStyle={cardHeaderStyle}>
          <AdvanceProgress
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={14}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={19} showInfo color="green" />}
          />
        </Card>
      </View>
    );
  }
}

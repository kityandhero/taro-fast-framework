import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  Progress,
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
        percent: 10,
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
      percent: 10,
    });
  };

  renderFurther() {
    const { percent } = this.state;

    return (
      <View className="index">
        <Card header="进度动画" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <View>
              <Button
                color="primary"
                size="mini"
                disabled={percent === 100}
                onClick={() => {
                  this.setPercent(10);
                }}
                style={{ marginRight: transformSize(8) }}
              >
                进度+10
              </Button>
              <Button
                color="primary"
                size="mini"
                fill="outline"
                onClick={() => {
                  this.reSetPercent();
                }}
              >
                重置
              </Button>
            </View>

            <Progress percent={percent} />
          </Space>
        </Card>

        <Card header="隐藏模式" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <Progress hidden percent={percent} />
          </Space>
        </Card>

        <Card header="指定线条宽度" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" block>
            <Progress percent={50} strokeWidth={4} fontSize={20} />
            <Progress percent={75} strokeWidth={8} />
            <Progress percent={100} strokeWidth={12} />
          </Space>
        </Card>

        <Card header="展示动画" headerStyle={cardHeaderStyle}>
          <Progress percent={70} animation />
        </Card>

        <Card header="指定颜色" headerStyle={cardHeaderStyle}>
          <Progress
            percent={70}
            borderRadius={12}
            activeColor="#FF3141"
            backgroundColor="#000000"
          />
        </Card>

        <Card header="直角模式" headerStyle={cardHeaderStyle}>
          <Progress percent={30} useBorderRadius={false} />
        </Card>

        <Card header="显示百分比" headerStyle={cardHeaderStyle}>
          <Progress percent={50} showInfo />
        </Card>

        <Card header="百分比字体大小" headerStyle={cardHeaderStyle}>
          <Progress percent={50} showInfo fontSize={20} />
        </Card>

        <Card header="复杂配置" headerStyle={cardHeaderStyle}>
          <Progress
            percent={70}
            borderRadius={12}
            showInfo
            animation
            strokeWidth={16}
            fontSize={36}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={38} showInfo color="green" />}
          />
        </Card>
      </View>
    );
  }
}
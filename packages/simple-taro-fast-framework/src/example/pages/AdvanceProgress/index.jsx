import { View } from '@tarojs/components';

import {
  BlockArea,
  Space,
  AdvanceProgress,
  Button,
  Icon,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

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
        <BlockArea title="动画">
          <Space direction="vertical" block>
            <View>
              <Button
                color="primary"
                disabled={percent === 100}
                onClick={() => {
                  this.setPercent(10);
                }}
                style={{ marginRight: '8px' }}
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
        </BlockArea>

        <BlockArea title="Hidden">
          <Space direction="vertical" block>
            <AdvanceProgress hidden percent={percent} />
          </Space>
        </BlockArea>

        <BlockArea title="指定线条宽度">
          <Space direction="vertical" block>
            <AdvanceProgress percent={50} strokeWidth={2} />
            <AdvanceProgress percent={75} strokeWidth={6} />
            <AdvanceProgress percent={100} strokeWidth={8} />
          </Space>
        </BlockArea>

        <BlockArea title="指定颜色">
          <AdvanceProgress
            percent={50}
            activeColor="#FF3141"
            backgroundColor="#000000"
          />
        </BlockArea>

        <BlockArea title="圆角">
          <AdvanceProgress percent={50} borderRadius={4} />
        </BlockArea>

        <BlockArea title="显示百分比">
          <AdvanceProgress percent={50} showInfo />
        </BlockArea>

        <BlockArea title="百分比字体大小">
          <AdvanceProgress percent={50} showInfo fontSize={12} />
        </BlockArea>

        <BlockArea title="Icon">
          <AdvanceProgress
            percent={50}
            icon={<IconCheckCircle size={19} color="green" />}
          />
        </BlockArea>

        <BlockArea title="Simple">
          <AdvanceProgress
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={14}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={19} showInfo color="green" />}
          />
        </BlockArea>
      </View>
    );
  }
}

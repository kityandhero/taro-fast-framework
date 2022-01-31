import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  ProgressBox,
  Button,
  Icon,
  HelpBox,
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
        <Space direction="vertical" fillWidth>
          <Card header="附带图标" headerStyle={cardHeaderStyle}>
            <Space direction="vertical" fillWidth>
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
              <ProgressBox
                percent={percent}
                icon={<IconCheckCircle size={38} color="green" />}
              />
            </Space>
          </Card>

          <Card header="隐藏模式" headerStyle={cardHeaderStyle}>
            <Space direction="vertical" fillWidth>
              <ProgressBox hidden percent={percent} />
            </Space>
          </Card>

          <Card header="复杂配置" headerStyle={cardHeaderStyle}>
            <ProgressBox
              percent={70}
              borderRadius={4}
              showInfo
              animation
              fontSize={28}
              activeColor="#FF3141"
              backgroundColor="#000000"
              icon={<IconCheckCircle size={38} showInfo color="green" />}
            />
          </Card>

          <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: '进度条配置请参照 Progress组件',
                },
              ]}
            />
          </Card>
        </Space>
      </View>
    );
  }
}

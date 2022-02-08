import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  Progress,
  Button,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

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
          <Card
            header="进度动画"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
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

              <Progress percent={percent} />
            </Space>
          </Card>

          <Card
            header="隐藏模式"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Space direction="vertical" fillWidth>
              <Progress hidden percent={percent} />
            </Space>
          </Card>

          <Card
            header="指定线条宽度"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Space direction="vertical" fillWidth>
              <Progress percent={50} strokeWidth={4} fontSize={20} />
              <Progress percent={75} strokeWidth={8} />
              <Progress percent={100} strokeWidth={12} />
            </Space>
          </Card>

          <Card
            header="展示动画"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress percent={70} animation />
          </Card>

          <Card
            header="指定颜色"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress
              percent={70}
              borderRadius={12}
              activeColor="#FF3141"
              backgroundColor="#000000"
            />
          </Card>

          <Card header="渐变色" style={cardStyle} headerStyle={cardHeaderStyle}>
            <Progress
              percent={70}
              animation
              activeColor={['#FF0000', '#FFF200', '#1E9600']}
            />
          </Card>

          <Card
            header="直角模式"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress percent={30} useBorderRadius={false} />
          </Card>

          <Card
            header="显示百分比"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress percent={50} showInfo />
          </Card>

          <Card
            header="百分比字体大小"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress percent={50} showInfo fontSize={20} />
          </Card>

          <Card
            header="复杂配置"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Progress
              percent={70}
              borderRadius={12}
              showInfo
              animation
              strokeWidth={16}
              fontSize={36}
              activeColor="#FF3141"
              backgroundColor="#000000"
            />
          </Card>

          <Card
            header="属性说明 :"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'percent: 进度百分比, 取值范围[0 ~ 100].',
                },
                {
                  text: 'showInfo: 是否显示百分比.',
                },
                {
                  text: 'animation: 是被显示动画.',
                },
                {
                  text: 'borderRadius: 圆角设置值.',
                },
                {
                  text: 'strokeWidth: 进度条宽度.',
                },
                {
                  text: 'fontSize: 字体大小.',
                },
                {
                  text: 'activeColor: 进度条颜色,string 或者[string,string,...], 数组模式将使用渐变色.',
                },
                {
                  text: 'backgroundColor: 进度条背景色.',
                },
              ]}
            />
          </Card>
        </Space>
      </View>
    );
  }
}

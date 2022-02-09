import { View } from '@tarojs/components';

import {
  showInfoMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { Card, Stepper, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Stepper',
    name: '进步器',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        num: 0,
      },
    };
  }

  setNum = (value) => {
    this.setState({
      num: value,
    });
  };

  renderContent = () => {
    const { num } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="基础用法(非受控)"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper
              defaultValue={1}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Card>

          <Card header="受控组件" style={style} headerStyle={cardHeaderStyle}>
            <Stepper
              value={num}
              onChange={(value) => {
                this.setNum(value);
                console.log(value);
              }}
            />
          </Card>

          <Card header="步长设置" style={style} headerStyle={cardHeaderStyle}>
            <Stepper step={10} defaultValue={10} />
          </Card>

          <Card
            header="设置输入范围"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper min={-5} max={5} />
          </Card>

          <Card
            header="格式化到整数"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper digits={0} />
          </Card>

          <Card
            header="格式化到一位小数"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper digits={1} />
          </Card>

          <Card header="禁用状态" style={style} headerStyle={cardHeaderStyle}>
            <Stepper disabled />
          </Card>

          <Card
            header="输入框只读状态"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper inputReadOnly />
          </Card>

          <Card header="自定义宽度" style={style} headerStyle={cardHeaderStyle}>
            <Stepper
              style={{ width: transformSize(260) }}
              defaultValue={10000}
              step={10000}
            />
          </Card>

          <Card header="自定义颜色" style={style} headerStyle={cardHeaderStyle}>
            <Stepper operateColor="#a923e1" defaultValue={30} step={1} />
          </Card>

          <Card header="无背景模式" style={style} headerStyle={cardHeaderStyle}>
            <Stepper useBackground={false} defaultValue={30} step={1} />
          </Card>

          <Card header="圆形轮廓" style={style} headerStyle={cardHeaderStyle}>
            <Stepper
              operateColor="#fff"
              backgroundColor="#a123e4"
              circle
              defaultValue={30}
              step={1}
            />
          </Card>

          <Card
            header="获得/失去焦点"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper
              onFocus={() => {
                showInfoMessage({
                  message: '获得焦点',
                });
              }}
              onBlur={() => {
                showInfoMessage({
                  message: '失去焦点',
                });
              }}
            />
          </Card>

          <Card
            header="自定义css变量"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Stepper
              style={{
                '--border': `${transformSize(1)} solid #f5f5f5`,
                '--border-inner': 'none',
                '--height': transformSize(36),
                '--input-width': transformSize(70),
                '--input-background-color': '#ffffff',
                width: transformSize(180),
              }}
              defaultValue={10000}
              step={10000}
            />
          </Card>

          <Card header="复杂配置" style={style} headerStyle={cardHeaderStyle}>
            <Stepper
              style={{
                '--border-inner': 'none',
                '--height': transformSize(36),
                '--input-width': transformSize(70),
                '--input-background-color': '#ffffff',
              }}
              iconSize={22}
              operateColor="#fff"
              backgroundColor="#a123e4"
              circle
              defaultValue={45}
              step={1}
            />
          </Card>
        </Space>
      </View>
    );
  };
}

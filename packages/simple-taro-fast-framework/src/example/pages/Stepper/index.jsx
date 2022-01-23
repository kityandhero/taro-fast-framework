import { View } from '@tarojs/components';

import {
  showInfoMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { Card, Stepper } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
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

  renderFurther() {
    const { num } = this.state;

    return (
      <View className="index">
        <Card header="基础用法(非受控)" headerStyle={cardHeaderStyle}>
          <Stepper
            defaultValue={1}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </Card>

        <Card header="受控组件" headerStyle={cardHeaderStyle}>
          <Stepper
            value={num}
            onChange={(value) => {
              this.setNum(value);
              console.log(value);
            }}
          />
        </Card>

        <Card header="步长设置" headerStyle={cardHeaderStyle}>
          <Stepper step={10} defaultValue={10} />
        </Card>

        <Card header="设置输入范围" headerStyle={cardHeaderStyle}>
          <Stepper min={-5} max={5} />
        </Card>

        <Card header="格式化到整数" headerStyle={cardHeaderStyle}>
          <Stepper digits={0} />
        </Card>

        <Card header="格式化到一位小数" headerStyle={cardHeaderStyle}>
          <Stepper digits={1} />
        </Card>

        <Card header="禁用状态" headerStyle={cardHeaderStyle}>
          <Stepper disabled />
        </Card>

        <Card header="输入框只读状态" headerStyle={cardHeaderStyle}>
          <Stepper inputReadOnly />
        </Card>

        <Card header="自定义宽度" headerStyle={cardHeaderStyle}>
          <Stepper
            style={{ width: transformSize(260) }}
            defaultValue={10000}
            step={10000}
          />
        </Card>

        <Card header="自定义颜色" headerStyle={cardHeaderStyle}>
          <Stepper operateColor="#a923e1" defaultValue={30} step={1} />
        </Card>

        <Card header="无背景模式" headerStyle={cardHeaderStyle}>
          <Stepper useBackground={false} defaultValue={30} step={1} />
        </Card>

        <Card header="圆形轮廓" headerStyle={cardHeaderStyle}>
          <Stepper
            operateColor="#fff"
            backgroundColor="#a123e4"
            circle
            defaultValue={30}
            step={1}
          />
        </Card>

        <Card header="获得/失去焦点" headerStyle={cardHeaderStyle}>
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

        <Card header="自定义css变量" headerStyle={cardHeaderStyle}>
          <Stepper
            style={{
              '--border': `${transformSize(1)} solid #f5f5f5`,
              '--border-inner': 'none',
              '--height': transformSize(36),
              '--input-width': transformSize(70),
              '--input-background-color': '#ffffff',
              '--active-border': `${transformSize(1)} solid #1677ff`,
              width: transformSize(180),
            }}
            defaultValue={10000}
            step={10000}
          />
        </Card>

        <Card header="复杂配置" headerStyle={cardHeaderStyle}>
          <Stepper
            style={{
              // '--border': `${transformSize(1)} solid #f5f5f5`,
              '--border-inner': 'none',
              '--height': transformSize(36),
              '--input-width': transformSize(70),
              '--input-background-color': '#ffffff',
              '--active-border': `${transformSize(1)} solid #1677ff`,
            }}
            iconSize={22}
            operateColor="#fff"
            backgroundColor="#a123e4"
            circle
            defaultValue={45}
            step={1}
          />
        </Card>
      </View>
    );
  }
}

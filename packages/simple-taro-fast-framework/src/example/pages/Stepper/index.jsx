import { View } from '@tarojs/components';

import { showInfoMessage } from 'taro-fast-common/es/utils/tools';
import { Card, Stepper } from 'taro-fast-component/es/customComponents';

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
        <Card header="基础用法(非受控)">
          <Stepper
            defaultValue={1}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </Card>

        <Card header="受控组件">
          <Stepper
            value={num}
            onChange={(value) => {
              this.setNum(value);
              console.log(value);
            }}
          />
        </Card>

        <Card header="步长设置">
          <Stepper step={10} defaultValue={10} />
        </Card>

        <Card header="设置输入范围">
          <Stepper min={-5} max={5} />
        </Card>

        <Card header="格式化到整数">
          <Stepper digits={0} />
        </Card>

        <Card header="格式化到一位小数">
          <Stepper digits={1} />
        </Card>

        <Card header="禁用状态">
          <Stepper disabled />
        </Card>

        <Card header="输入框只读状态">
          <Stepper inputReadOnly />
        </Card>

        <Card header="自定义宽度">
          <Stepper
            style={{ width: '120px' }}
            defaultValue={10000}
            step={10000}
          />
        </Card>

        <Card header="获得/失去焦点">
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

        <Card header="自定义css变量">
          <Stepper
            style={{
              '--border': '1px solid #f5f5f5',
              '--border-inner': 'none',
              '--height': '36px',
              '--input-width': '70px',
              '--input-background-color': '#ffffff',
              '--active-border': '1px solid #1677ff',
            }}
            defaultValue={10000}
            step={10000}
          />
        </Card>
      </View>
    );
  }
}

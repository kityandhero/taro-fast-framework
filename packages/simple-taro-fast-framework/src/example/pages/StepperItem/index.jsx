import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Icon,
  StepperItem,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch } = Icon;

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderFurther() {
    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="基础用法"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <StepperItem>购买数量</StepperItem>
        </Card>

        <Card
          header="复杂布局"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <StepperItem description="请增减购买数量" clickable arrow>
            购买数量
          </StepperItem>
          <StepperItem title="调整数量">购买数量</StepperItem>
        </Card>

        <Card
          header="禁用状态"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <StepperItem disabled prefix={<IconSketch size={36} />}>
            购买数量
          </StepperItem>
        </Card>

        <Card
          header="自定义样式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <StepperItem
            description="请增减购买数量"
            clickable
            arrow
            stepperStyle={{
              // '--border': `${transformSize(1)} solid #f5f5f5`,
              '--border-inner': 'none',
              '--height': transformSize(36),
              '--input-width': transformSize(70),
              '--input-background-color': '#ffffff',
              '--active-border': `${transformSize(1)} solid #1677ff`,
            }}
            iconSize={20}
            operateColor="#fff"
            backgroundColor="#a123e4"
            circle
            defaultValue={45}
            step={1}
          >
            购买数量
          </StepperItem>
          <StepperItem
            title="调整数量"
            stepperStyle={{
              // '--border': `${transformSize(1)} solid #f5f5f5`,
              '--border-inner': 'none',
              '--height': transformSize(36),
              '--input-width': transformSize(70),
              '--input-background-color': '#ffffff',
              '--active-border': `${transformSize(1)} solid #1677ff`,
            }}
            iconSize={20}
            operateColor="#fff"
            backgroundColor="#a123e4"
            circle
            defaultValue={45}
            step={1}
          >
            购买数量
          </StepperItem>
        </Card>

        <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '可配置值请参考 Item 与 Stepper.',
              },
            ]}
          />
        </Card>
      </View>
    );
  }
}
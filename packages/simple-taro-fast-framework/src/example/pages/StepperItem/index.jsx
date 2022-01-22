import { View } from '@tarojs/components';

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

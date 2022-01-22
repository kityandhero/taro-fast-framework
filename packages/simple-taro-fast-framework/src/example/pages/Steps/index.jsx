import { View } from '@tarojs/components';

import { Card, Steps, Icon } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { Step } = Steps;
const { IconVolumePlus } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="横向" headerStyle={cardHeaderStyle}>
          <Steps current={1}>
            <Step title="标题1" description="描述" />
            <Step title="标题2" description="描述" />
            <Step title="标题3" description="描述" />
          </Steps>
        </Card>

        <Card header="横向（失败状态）" headerStyle={cardHeaderStyle}>
          <Steps current={2}>
            <Step title="第一步" />
            <Step title="第二步" />
            <Step title="第三步" status="error" />
          </Steps>
        </Card>

        <Card header="纵向" headerStyle={cardHeaderStyle}>
          <Steps direction="vertical">
            <Step title="填写机构信息" status="process" />
            <Step title="签约机构" status="wait" />
            <Step title="关联服务区" status="wait" />
          </Steps>
        </Card>

        <Card header="纵向（失败状态）" headerStyle={cardHeaderStyle}>
          <Steps direction="vertical">
            <Step
              title="填写机构信息"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step
              title="签约机构"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step
              title="关联服务区"
              status="finish"
              description="完成时间：2020-12-01 12:30"
            />
            <Step title="审批失败" status="error" />
          </Steps>
        </Card>

        <Card header="自定义图标和大小" headerStyle={cardHeaderStyle}>
          <Steps
            direction="vertical"
            current={1}
            style={{
              '--title-font-size': 'val(--tfc-17)',
              '--description-font-size': 'val(--tfc-15)',
              '--indicator-margin-right': 'val(--tfc-12)',
              '--icon-size': 'val(--tfc-22)',
            }}
          >
            <Step
              title="填写机构信息"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
            <Step
              title="签约机构"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
            <Step
              title="关联服务区"
              description="这里是一些描述"
              icon={<IconVolumePlus />}
            />
          </Steps>
        </Card>
      </View>
    );
  }
}

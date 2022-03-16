import { View } from '@tarojs/components';

import {
  getNow,
  addHour,
  addMinute,
  addSecond,
} from 'taro-fast-common/es/utils/tools';
import { Space, Countdown } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  endTime: addMinute(getNow(), 15),
};

const config2 = {
  showDay: true,
  endTime: addMinute(getNow(), 40),
};

const config3 = {
  showHour: false,
  endTime: addMinute(getNow(), 4),
};

const config4 = {
  format: { hours: ':', minutes: ':', seconds: '' },
  endTime: addHour(getNow(), 1),
};

const config5 = {
  cardMode: true,
  showDay: true,
  endTime: addMinute(getNow(), 28),
  format: { day: '天', hours: ':', minutes: ':', seconds: '' },
};

const config6 = {
  cardMode: true,
  showDay: true,
  valueColor: '#456e23',
  separatorColor: '#9411a9',
  borderColor: '#ae4567',
  endTime: addMinute(getNow(), 28),
  format: { day: '天', hours: ':', minutes: ':', seconds: '' },
};

const config7 = {
  cardMode: true,
  fillCard: true,
  showDay: true,
  endTime: addMinute(getNow(), 28),
  format: { day: '天', hours: ':', minutes: ':', seconds: '' },
};

const config8 = {
  cardMode: true,
  fillCard: true,
  showDay: true,
  valueColor: '#456e23',
  separatorColor: '#9411a9',
  borderColor: '#ae4567',
  endTime: addMinute(getNow(), 28),
  format: { day: '天', hours: ':', minutes: ':', seconds: '' },
};

const config9 = {
  format: { hours: ':', minutes: ':', seconds: '' },
  endTime: addSecond(getNow(), 10),
  afterEnd: () => {
    console.log({
      message: '时间到',
    });
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '倒计时',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Countdown',
    name: '倒计时',
    description: '倒计时组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="默认" config={config1}>
          <View>
            <Countdown {...config1} />
          </View>
        </SimpleBox>

        <SimpleBox header="显示天" config={config2}>
          <View>
            <Countdown {...config2} />
          </View>
        </SimpleBox>

        <SimpleBox header="不显示小时" config={config3}>
          <View>
            <Countdown {...config3} />
          </View>
        </SimpleBox>

        <SimpleBox header="自定义格式化" config={config4}>
          <View>
            <Countdown {...config4} />
          </View>
        </SimpleBox>

        <SimpleBox header="卡片式" config={config5}>
          <View>
            <Countdown {...config5} />
          </View>
        </SimpleBox>

        <SimpleBox header="卡片式自定义" config={config6}>
          <View>
            <Countdown {...config6} />
          </View>
        </SimpleBox>

        <SimpleBox header="卡片填充式" config={config7}>
          <View>
            <Countdown {...config7} />
          </View>
        </SimpleBox>

        <SimpleBox header="卡片填充式自定义" config={config8}>
          <View>
            <Countdown {...config8} />
          </View>
        </SimpleBox>

        <SimpleBox header="倒计时回调 [查看控制台]" config={config9}>
          <View>
            <Countdown {...config9} />
          </View>
        </SimpleBox>

        <PropertyBox config={Countdown.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}

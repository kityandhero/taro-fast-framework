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
  endTime: addSecond(getNow(), 20),
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基本用法',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基本用法',
        config: config1,
      },
      {
        header: '显示天',
        config: config2,
      },
      {
        header: '不显示小时',
        config: config3,
      },
      {
        header: '自定义格式化',
        config: config4,
      },
      {
        header: '卡片式',
        config: config5,
      },
      {
        header: '卡片式自定义',
        config: config6,
      },
      {
        header: '卡片填充式',
        config: config7,
      },
      {
        header: '卡片填充式自定义',
        config: config8,
      },
      {
        span: 2,
        header: '倒计时回调',
        config: config9,
      },
    ];
  };

  renderContent = () => {
    const { header, currentConfig } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="Button"
          mockChildren
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          <Countdown {...currentConfig} />
        </SimpleBox>

        <PropertyBox config={Countdown.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}

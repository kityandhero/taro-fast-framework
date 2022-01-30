import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  getNow,
  addHour,
  addMinute,
  addSecond,
} from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  Countdown,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  onTimeUp = () => {
    Taro.showToast({
      title: '时间到',
      icon: 'success',
      duration: 2000,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Card header="一般用法" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown endTime={addMinute(getNow(), 15)} />
            </View>

            <View>
              <Countdown endTime={addHour(getNow(), 40)} />
            </View>

            <View>
              <Countdown showDay endTime={addHour(getNow(), 2)} />
            </View>

            <View>
              <Countdown showHour={false} endTime={addHour(getNow(), 4)} />
            </View>
          </Space>
        </Card>

        <Card header="自定义格式化" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                format={{ hours: ':', minutes: ':', seconds: '' }}
                endTime={addHour(getNow(), 1)}
              />
            </View>
          </Space>
        </Card>

        <Card header="卡片式" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                cardMode
                showDay
                endTime={addHour(getNow(), 28)}
                format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
              />
            </View>
          </Space>
        </Card>

        <Card header="卡片式自定义" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                cardMode
                showDay
                valueColor="#456e23"
                separatorColor="#9411a9"
                borderColor="#ae4567"
                endTime={addHour(getNow(), 28)}
                format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
              />
            </View>
          </Space>
        </Card>

        <Card header="卡片填充式" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                cardMode
                fillCard
                showDay
                endTime={addHour(getNow(), 28)}
                format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
              />
            </View>
          </Space>
        </Card>

        <Card header="卡片填充式自定义" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                cardMode
                fillCard
                showDay
                valueColor="#fff"
                separatorColor="#9411a9"
                backgroundColor="#ae4567"
                endTime={addHour(getNow(), 28)}
                format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
              />
            </View>
          </Space>
        </Card>

        <Card header="自定义倒计时回调事件" headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <View>
              <Countdown
                format={{ hours: ':', minutes: ':', seconds: '' }}
                endTime={addSecond(getNow(), 10)}
                afterEnd={this.onTimeUp.bind(this)}
              />
            </View>
          </Space>
        </Card>
      </View>
    );
  }
}

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  getNow,
  addHour,
  addMinute,
  addSecond,
} from 'taro-fast-common/es/utils/tools';
import {
  BlockArea,
  Space,
  Countdown,
} from 'taro-fast-component/es/customComponents';

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
        <BlockArea title="一般用法">
          <Space direction="vertical" block>
            <View>
              <Countdown endTime={addMinute(getNow(), 15)} />
            </View>

            <View>
              <Countdown endTime={addHour(getNow(), 40)} />
            </View>

            <View>
              <Countdown isShowDay endTime={addHour(getNow(), 2)} />
            </View>

            <View>
              <Countdown isShowHour={false} endTime={addHour(getNow(), 4)} />
            </View>
          </Space>
        </BlockArea>

        <BlockArea title="自定义格式化">
          <Space direction="vertical" block>
            <View>
              <Countdown
                format={{ hours: ':', minutes: ':', seconds: '' }}
                endTime={addHour(getNow(), 1)}
              />
            </View>
          </Space>
        </BlockArea>

        <BlockArea title="卡片式">
          <Space direction="vertical" block>
            <View>
              <Countdown
                isCard
                isShowDay
                endTime={addHour(getNow(), 28)}
                format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
              />
            </View>
          </Space>
        </BlockArea>

        <BlockArea title="自定义倒计时回调事件">
          <Space direction="vertical" block>
            <View>
              <Countdown
                format={{ hours: ':', minutes: ':', seconds: '' }}
                endTime={addSecond(getNow(), 10)}
                afterEnd={this.onTimeUp.bind(this)}
              />
            </View>
          </Space>
        </BlockArea>
      </View>
    );
  }
}

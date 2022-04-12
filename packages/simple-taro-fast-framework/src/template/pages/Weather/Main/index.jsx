import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { Button, CenterBox } from 'taro-fast-component/es/customComponents';

import BasePageWrapper from '../../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--获取天气',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        weather: '',
      },
    };
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
  };

  doWorkAdjustDidMount = () => {
    this.buildWeatherData();
  };

  buildWeatherData = () => {
    this.getLocationWeather({
      callback: (data) => {
        console.log(data);

        const {
          observe: { degree, weather },
        } = {
          ...{
            observe: {
              degree: '',
              degree: '',
            },
          },
          ...data,
        };

        if (
          stringIsNullOrWhiteSpace(weather) &&
          stringIsNullOrWhiteSpace(degree)
        ) {
          return;
        }

        this.setState({
          weather: `天气${weather}, 温度${degree}°C`,
        });
      },
    });
  };

  renderFurther() {
    const { weather } = this.state;

    return (
      <View
        style={{
          width: '100%',
          height: transformSize(400),
        }}
      >
        <CenterBox>{weather} </CenterBox>
        <CenterBox>
          <Button onClick={this.buildWeatherData} text="刷新" />
        </CenterBox>
      </View>
    );
  }
}

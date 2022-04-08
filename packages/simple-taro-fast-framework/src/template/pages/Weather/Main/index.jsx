import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { CenterBox } from 'taro-fast-component/es/customComponents';

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
    this.getLocationWeather({
      callback: ({ observe }) => {
        const { degree, weather } = observe;

        this.setState({
          weather: `当前天气: ${degree}°C ${weather}`,
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
      </View>
    );
  }
}

import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { apiDataConvertCore } from 'taro-fast-framework/es/utils/actionAssist';
import {
  Button,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import BasePageWrapper from '../../BasePageWrapper';
import SimpleBox from '../../../../customComponents/SimpleBox';
import CodePageBox from '../../../../customComponents/CodePageBox';

const configList = [];

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
  viewStyle = {
    paddingLeft: 'var(--tfc-18)',
    paddingRight: 'var(--tfc-18)',
    backgroundColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        weather: '',
      },
    };
  }

  apiDataConvert = (props) => {
    return apiDataConvertCore({ props, modelName: 'entrance' });
  };

  doWorkAdjustDidMount = () => {
    this.buildWeatherData();
  };

  buildWeatherData = () => {
    this.getLocationWeather({
      callback: (data) => {
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
          weather: `${weather}, 温度${degree}°C`,
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

  renderFurther() {
    const { weather } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="请求结果"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
        >
          <View
            style={{
              paddingTop: 'var(--tfc-18)',
              paddingBottom: 'var(--tfc-18)',
            }}
          >
            天气: {weather || '获取中, 请稍后'}
          </View>

          <Button
            onClick={this.buildWeatherData}
            block
            size="small"
            text="刷新"
          />
        </SimpleBox>

        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
            apiDataConvert: `(props) => {
              return apiDataConvertCore({ props, modelName: 'entrance' });
            }`,
            doWorkAdjustDidMount: `() => {
              this.buildWeatherData();
            }`,
            buildWeatherData: `() => {
              this.getLocationWeather({
                callback: (data) => {
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
                    weather: \`天气\${weather}, 温度\${degree}°C\`,
                  });
                },
              });
            }`,
          }}
        />
      </Space>
    );
  }
}

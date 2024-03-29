import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { Button, Space } from 'taro-fast-component';

import { CodePageBox, SimpleBox } from '../../../../customComponents';
import { BasePageWrapper } from '../../BasePageWrapper';

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

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      weather: '',
    };
  }

  doWorkAdjustDidMount = () => {
    this.buildWeatherData();
  };

  buildWeatherData = () => {
    this.getLocationWeather({
      callback: (data) => {
        const {
          observe: { degree, weather },
        } = {
          observe: {
            degree: '',
            weather: '',
          },
          ...data,
        };

        if (
          checkStringIsNullOrWhiteSpace(weather) &&
          checkStringIsNullOrWhiteSpace(degree)
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
                    checkStringIsNullOrWhiteSpace(weather) &&
                    checkStringIsNullOrWhiteSpace(degree)
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

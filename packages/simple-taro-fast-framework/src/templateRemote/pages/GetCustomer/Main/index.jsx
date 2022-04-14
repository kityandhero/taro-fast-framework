import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { Button, Space } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { getCurrentCustomer } from 'taro-fast-framework/es/utils/globalStorageAssist';

import BasePageWrapper from '../../BasePageWrapper';
import SimpleBox from '../../../../customComponents/SimpleBox';
import CodePageBox from '../../../../customComponents/CodePageBox';

const configList = [];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--获取天气',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  verifySession = true;

  verifyTicket = true;

  verifyTicketValidity = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        nickname: '',
      },
    };
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'customer' });
  };

  doWorkAdjustDidMount = () => {
    this.buildCustomerData();
  };

  buildCustomerData = () => {
    const that = this;

    that.getCustomer({
      callback: (o) => {
        const { nickname } = {
          ...{
            nickname: '',
          },
          ...o,
        };

        console.log(nickname);

        that.setState({
          nickname,
        });

        that.forceUpdate();
      },
    });
  };

  showInConsole = () => {
    console.log(getCurrentCustomer());
  };

  renderFurther() {
    const { nickname } = this.state;

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
            当前用户: {nickname || '获取中, 请稍后'}
          </View>

          <Button
            onClick={this.buildCustomerData}
            block
            size="small"
            text="刷新"
          />
        </SimpleBox>

        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
            getApiData: `(props) => {
              return getApiDataCore({ props, modelName: 'entrance' });
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

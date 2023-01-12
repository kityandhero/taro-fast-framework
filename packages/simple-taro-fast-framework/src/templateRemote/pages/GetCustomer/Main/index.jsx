import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Button, Space } from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';
import { getCurrentCustomer } from 'taro-fast-framework/es/utils/globalStorageAssist';

import CodePageBox from '../../../../customComponents/CodePageBox';
import SimpleBox from '../../../../customComponents/SimpleBox';
import BasePageWrapper from '../../BasePageWrapper';

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

  doWorkAdjustDidMount = () => {
    this.buildCustomerData();
  };

  buildCustomerData = () => {
    const that = this;

    that.getCustomer({
      successCallback: (o) => {
        const { nickname } = {
          ...{
            nickname: '',
          },
          ...o,
        };

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
              paddingTop: transformSize(18),
              paddingBottom: transformSize(18),
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

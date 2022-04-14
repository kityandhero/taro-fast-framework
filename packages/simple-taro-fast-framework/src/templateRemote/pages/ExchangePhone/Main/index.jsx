import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { Space } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { removeSession } from 'taro-fast-framework/es/utils/globalStorageAssist';

import BasePageWrapper from '../../BasePageWrapper';
import SimpleBox from '../../../../customComponents/SimpleBox';
import CodePageBox from '../../../../customComponents/CodePageBox';

const configList = [
  {
    label: 'verifySession',
    value: '开启 session 检测校验',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--兑换手机信息',
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        keyPhone: '',
      },
    };

    //移除现有缓存, 仅为当前夜间环境测试使用, 常规使用时无需此步骤
    removeSession();
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
  };

  doWorkAdjustDidMount = () => {
    this.buildPhoneData();
  };

  buildPhoneData = () => {
    const that = this;

    that.exchangePhone({
      data: {},
      callback: (o) => {
        const { key } = o;

        that.setState({
          keyPhone: key,
        });
      },
    });
  };

  renderFurther() {
    const { keyPhone } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="请求结果"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
        >
          <View>phone key: {keyPhone || '请求中, 请稍后'}</View>
        </SimpleBox>

        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
            getApiData: `(props) => {
              return getApiDataCore({ props, modelName: 'entrance' });
            }`,
            doWorkAdjustDidMount: `() => {
              this.buildPhoneData();
            }`,
            buildPhoneData: `() => {
              const that = this;

              that.exchangePhone({
                data: {},
                callback: (o) => {
                  const { key } = o;

                  that.setState({
                    keyPhone: key,
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

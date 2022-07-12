import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  showErrorMessage,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  Button,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';
import { apiDataConvertCore } from 'taro-fast-framework/es/utils/actionAssist';
import { removeSession } from 'taro-fast-framework/es/utils/globalStorageAssist';

import CodePageBox from '../../../../customComponents/CodePageBox';
import SimpleBox from '../../../../customComponents/SimpleBox';
import BasePageWrapper from '../../BasePageWrapper';

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

  apiDataConvert = (props) => {
    return apiDataConvertCore({ props, modelName: 'entrance' });
  };

  triggerPhoneNumber = (e) => {
    const {
      detail: { encryptedData, iv, errMsg },
    } = e;

    const that = this;

    if (
      stringIsNullOrWhiteSpace(encryptedData) ||
      stringIsNullOrWhiteSpace(iv)
    ) {
      showErrorMessage({
        message: errMsg,
      });

      return;
    }

    that.exchangePhone({
      data: {
        encryptedData,
        iv,
      },
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
          <View
            style={{
              padding: `${transformSize(20)} 0`,
            }}
          >
            <Space direction="vertical" fillWidth size={30}>
              <CenterBox>
                <View>phone key: {keyPhone || '请先点击按钮'}</View>
              </CenterBox>

              <Button
                weappButton
                text="点击获取"
                backgroundColor="#f5050e"
                fontSize={32}
                openType="getPhoneNumber"
                block
                circle
                size="middle"
                shape="rounded"
                onGetPhoneNumber={this.triggerPhoneNumber}
              />
            </Space>
          </View>
        </SimpleBox>

        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
            apiDataConvert: `(props) => {
              return apiDataConvertCore({ props, modelName: 'entrance' });
            }`,
            triggerPhoneNumber: `(e) => {
              const {
                detail: { encryptedData, iv },
              } = e;

              const that = this;

              that.exchangePhone({
                data: {
                  encryptedData,
                  iv,
                },
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

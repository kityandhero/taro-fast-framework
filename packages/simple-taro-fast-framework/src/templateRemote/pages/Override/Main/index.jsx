import { connect } from 'react-redux';

import { Space } from 'taro-fast-component/es/customComponents';
import { apiDataConvertCore } from 'taro-fast-framework/es/utils/actionAssist';

import CodePageBox from '../../../../customComponents/CodePageBox';
import BasePageWrapper from '../../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--重载函数',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  apiDataConvert = (props) => {
    return apiDataConvertCore({ props, modelName: 'entrance' });
  };

  renderFurther() {
    return (
      <Space direction="vertical" fillWidth>
        <CodePageBox
          config={{
            dispatchRefreshSession: `(data) => {
              return this.dispatchApi({
                type: 'session/refreshSession',
                payload: data,
              });
            }`,
            getRefreshSessionApiData: `() => {
              const data = apiDataConvertCore({
                props: this.props,
                modelName: 'session',
              });

              return data;
            }`,
            dispatchCheckTicketValidity: `(data) => {
              return this.dispatchApi({
                type: 'entrance/checkTicketValidity',
                payload: data,
              });
            }`,
            getCheckTicketValidityApiData: `() => {
              const data = apiDataConvertCore({
                props: this.props,
                modelName: 'entrance',
              });

              return data;
            }`,
            dispatchSignInSilent: `(data) => {
              return this.dispatchApi({
                type: 'entrance/signInSilent',
                payload: data,
              });
            }`,
            getSignInSilentApiData: `() => {
              return apiDataConvertCore({ props: this.props, modelName: 'entrance' });
            }`,
            parseSignInResultFromSignInApiData: `(remoteData) => {
              const verifySignInResult = getVerifySignInResult();
              const { signInResult } = remoteData;

              return signInResult || verifySignInResult.fail;
            }`,
            parseTokenFromSignInSilentApiData: `(remoteData) => {
              const { token } = remoteData;

              return token || '';
            }`,
            dispatchGetCustomer: `(data = {}) => {
              return this.dispatchApi({
                type: 'customer/getCustomer',
                payload: data,
              });
            }`,
            dispatchExchangePhone: `(data = {}) => {
              return this.dispatchApi({
                type: 'session/exchangePhone',
                payload: data,
              });
            }`,
            getExchangePhoneApiData: `() => {
              return apiDataConvertCore({
                props: this.props,
                modelName: 'session',
              });
            }`,
            dispatchRegisterWithWeChat: `(data = {}) => {
              return this.dispatchApi({
                type: 'entrance/registerWithWeChat',
                payload: data,
              });
            }`,
            getRegisterWithWeChatApiData: `() => {
              return apiDataConvertCore({
                props: this.props,
                modelName: 'entrance',
              });
            }`,
            dispatchRegister: `(data = {}) => {
              return this.dispatchApi({
                type: 'entrance/register',
                payload: data,
              });
            }`,
            getRegisterApiData: `() => {
              return apiDataConvertCore({
                props: this.props,
                modelName: 'entrance',
              });
            }`,
          }}
        />
      </Space>
    );
  }
}

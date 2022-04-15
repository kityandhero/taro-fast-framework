import { connect } from 'react-redux';

import { Space } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import BasePageWrapper from '../../BasePageWrapper';
import CodePageBox from '../../../../customComponents/CodePageBox';

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
  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
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
              const data = getApiDataCore({
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
              const data = getApiDataCore({
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
              return getApiDataCore({ props: this.props, modelName: 'entrance' });
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
            getCustomerApiData: `() => {
              const data = getApiDataCore({
                props: this.props,
                modelName: 'customer',
              });

              return data;
            }`,
            dispatchExchangePhone: `(data = {}) => {
              return this.dispatchApi({
                type: 'session/exchangePhone',
                payload: data,
              });
            }`,
            getExchangePhoneApiData: `() => {
              return getApiDataCore({
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
              return getApiDataCore({
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
              return getApiDataCore({
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

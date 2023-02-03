import { connect } from 'easy-soft-dva';

import { Space } from 'taro-fast-component';

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
            dispatchCheckTicketValidity: `(data) => {
              return this.dispatchApi({
                type: 'entrance/checkTicketValidity',
                payload: data,
              });
            }`,
            dispatchSignInSilent: `(data) => {
              return this.dispatchApi({
                type: 'entrance/signInSilent',
                payload: data,
              });
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
            dispatchRegisterWithWeChat: `(data = {}) => {
              return this.dispatchApi({
                type: 'entrance/registerWithWeChat',
                payload: data,
              });
            }`,
            dispatchRegister: `(data = {}) => {
              return this.dispatchApi({
                type: 'entrance/register',
                payload: data,
              });
            }`,
          }}
        />
      </Space>
    );
  }
}

import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { recordObject } from 'taro-fast-common/es/utils/tools';
import {
  VerticalBox,
  Space,
  Spin,
  Empty,
  BlockArea,
  FadeView,
} from 'taro-fast-component/es/customComponents';
import { buildAdvanceButton } from 'taro-fast-component/es/functionComponent';

import PageWrapper from '@/customComponents/PageWrapper';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from './Assist/action';

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
  loadRemoteRequestAfterMount = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'news/getOverview',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  onActionClick = () => {
    getOverviewAction({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  onActionSheetClick = () => {
    getOverviewActionSheet({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  onActionModalClick = () => {
    getOverviewActionModal({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          recordObject(remoteData);
        }
      },
    });
  };

  showRemoteMetaDataInConsole = () => {
    recordObject(this.getRemoteMetaData());
  };

  renderFurther() {
    const { dataLoading, firstLoadSuccess } = this.state;

    return (
      <View className="index">
        <BlockArea title="Buttons Color">
          <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
            <Space wrap>
              {buildAdvanceButton({
                inner: 'default',
              })}

              {buildAdvanceButton({
                inner: 'primary',
                color: 'primary',
              })}

              {buildAdvanceButton({
                inner: 'success',
                color: 'success',
              })}

              {buildAdvanceButton({
                inner: 'danger',
                color: 'danger',
              })}

              {buildAdvanceButton({
                inner: 'warning',
                color: 'warning',
              })}

              {buildAdvanceButton({
                inner: 'loading',
                loading: true,
              })}

              {buildAdvanceButton({
                inner: 'disabled',
                disabled: true,
              })}
            </Space>
          </VerticalBox>
        </BlockArea>

        <BlockArea title="Buttons Block Large">
          <Space direction="vertical">
            {buildAdvanceButton({
              inner: 'Block Button',
              block: true,
              color: 'primary',
              size: 'large',
            })}
          </Space>
        </BlockArea>

        <BlockArea title="Button Action">
          <Space wrap>
            {buildAdvanceButton({
              inner: 'Action',
              color: 'primary',
              onClick: this.onActionClick,
            })}

            {buildAdvanceButton({
              inner: 'ActionSheet',
              color: 'success',
              onClick: this.onActionSheetClick,
            })}

            {buildAdvanceButton({
              inner: 'ActionModal',
              color: 'danger',
              onClick: this.onActionModalClick,
            })}

            {buildAdvanceButton({
              inner: 'reload',
              loading: !!dataLoading,
              onClick: this.reloadData,
            })}

            {buildAdvanceButton({
              inner: 'reloadRemoteMetaData',
              onClick: this.reloadRemoteMetaData,
            })}

            {buildAdvanceButton({
              inner: 'showRemoteMetaDataInConsole',
              onClick: this.showRemoteMetaDataInConsole,
            })}
          </Space>
        </BlockArea>

        <BlockArea title="联动 reloading">
          <Spin spin={!firstLoadSuccess}>
            <FadeView show={!dataLoading}>
              <VerticalBox style={{ height: '50rpx' }} alignJustify="center">
                <Space direction="vertical">
                  <VerticalBox
                    style={{ height: '100rpx' }}
                    alignJustify="center"
                  >
                    <Empty
                      description="暂无数据"
                      onImageClick={() => {
                        console.log('onImageClick');
                      }}
                      onDescriptionClick={() => {
                        console.log('onDescriptionClick');
                      }}
                    />
                  </VerticalBox>
                </Space>
              </VerticalBox>
            </FadeView>
          </Spin>
        </BlockArea>
      </View>
    );
  }
}

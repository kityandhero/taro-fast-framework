import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { recordObject, transformSize } from 'taro-fast-common/es/utils/tools';
import {
  VerticalBox,
  Space,
  Spin,
  Empty,
  Card,
  FadeView,
} from 'taro-fast-component/es/customComponents';
import { buildButton } from 'taro-fast-component/es/functionComponent';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

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
        <Card header="Action" headerStyle={cardHeaderStyle}>
          <Space wrap>
            {buildButton({
              inner: 'Action',
              loadingMode: 'overlay',
              onClick: this.onActionClick,
            })}

            {buildButton({
              inner: 'ActionSheet',
              loadingMode: 'overlay',
              onClick: this.onActionSheetClick,
            })}

            {buildButton({
              inner: 'ActionModal',
              loadingMode: 'overlay',
              onClick: this.onActionModalClick,
            })}

            {buildButton({
              inner: 'reload',
              loadingMode: 'overlay',
              loading: !!dataLoading,
              onClick: this.reloadData,
            })}

            {buildButton({
              inner: 'reloadRemoteMetaData',
              loadingMode: 'overlay',
              onClick: this.reloadRemoteMetaData,
            })}

            {buildButton({
              inner: 'showRemoteMetaDataInConsole',
              loadingMode: 'overlay',
              onClick: this.showRemoteMetaDataInConsole,
            })}
          </Space>
        </Card>

        <Card header="联动展示" headerStyle={cardHeaderStyle}>
          <Spin spin={!firstLoadSuccess}>
            <FadeView show={!dataLoading}>
              <VerticalBox
                style={{ height: transformSize(50) }}
                alignJustify="center"
              >
                <Space direction="vertical" fillWidth>
                  <VerticalBox
                    style={{ height: transformSize(100) }}
                    alignJustify="center"
                  >
                    <Empty
                      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
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
        </Card>
      </View>
    );
  }
}

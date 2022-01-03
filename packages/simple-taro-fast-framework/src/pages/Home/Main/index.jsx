import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { recordObject } from 'taro-fast-common/es/utils/tools';
import {
  VerticalBox,
  Space,
  Spin,
  Empty,
  AutoCenter,
  BlockArea,
} from 'taro-fast-component/es/customComponents';
import { buildButton } from 'taro-fast-framework/es/customComponents/FunctionComponent';

import PageWrapper from '@/customComponents/PageWrapper';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from '../Assist/action';

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
  showRenderCountInConsole = true;

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

    console.log(this.state);

    return (
      <View className="index">
        <Spin spin={!firstLoadSuccess}>
          <AutoCenter> Hello world!</AutoCenter>

          <BlockArea title="Empty">
            <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
              <Space direction="vertical">
                <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
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
          </BlockArea>

          <BlockArea title="Buttons">
            <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
              <Space direction="vertical">
                {buildButton({ text: 'Action', onClick: this.onActionClick })}

                {buildButton({
                  text: 'ActionSheet',
                  onClick: this.onActionSheetClick,
                })}

                {buildButton({
                  text: 'ActionModal',
                  onClick: this.onActionModalClick,
                })}

                {buildButton({
                  text: 'reload',
                  loading: !!dataLoading,
                  onClick: this.reloadData,
                })}

                {buildButton({
                  text: 'reloadRemoteMetaData',
                  onClick: this.reloadRemoteMetaData,
                })}

                {buildButton({
                  text: 'showRemoteMetaDataInConsole',
                  onClick: this.showRemoteMetaDataInConsole,
                })}
              </Space>
            </VerticalBox>
          </BlockArea>

          <BlockArea title="AutoCenter">
            <AutoCenter>
              Esse ad minim incididunt elit veniam elit deserunt. Enim nisi duis
              aliquip mollit adipisicing. Dolor excepteur ipsum in quis magna
              irure exercitation ad anim adipisicing irure commodo. Culpa
              adipisicing duis est irure occaecat officia reprehenderit nisi
              magna nulla enim nostrud. Nisi commodo excepteur do sint Lorem qui
              laboris incididunt id. Elit ex dolor minim ullamco ex mollit
              commodo laboris voluptate aute nostrud Lorem. Nulla et elit in
              anim incididunt id culpa Lorem. Dolore ullamco aliqua do
              reprehenderit consectetur proident occaecat laborum tempor
              proident ipsum labore quis culpa.
            </AutoCenter>
          </BlockArea>
        </Spin>
      </View>
    );
  }
}

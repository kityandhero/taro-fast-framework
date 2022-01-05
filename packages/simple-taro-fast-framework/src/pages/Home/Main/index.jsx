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
  Avatar,
  Badge,
} from 'taro-fast-component/es/customComponents';
import { buildButton } from 'taro-fast-component/es/functionComponent';

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
        <AutoCenter> Welcome To Taro-Fast-Framework! </AutoCenter>

        <BlockArea title="Avatar">
          <Space wrap>
            <Avatar circle openData={{ type: 'userAvatarUrl' }} />
            <Avatar openData={{ type: 'userAvatarUrl' }} />
            <Avatar circle text="头像" />
            <Avatar image="https://jdc.jd.com/img/200" />
            <Avatar text="头像" />
          </Space>
        </BlockArea>

        <BlockArea title="Badge Wrapper">
          <Space wrap style={{ '--gap': '24px' }}>
            <Badge content="5">
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>
            <Badge content="新">
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>
            <Badge content="更新啦">
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>

            <Badge
              color="#108ee9"
              content={Badge.dot}
              style={{ '--right': '100%', '--top': '100%' }}
            >
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>

            <Badge
              color="#87d068"
              content={Badge.dot}
              style={{ '--right': '100%' }}
            >
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>

            <Badge content={Badge.dot}>
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>

            <Badge
              color="orange"
              content={Badge.dot}
              style={{ '--top': '100%' }}
            >
              <Avatar openData={{ type: 'userAvatarUrl' }} />
            </Badge>
          </Space>
        </BlockArea>

        <BlockArea title="Badge Only">
          <Space style={{ '--gap': '24px' }}>
            <Badge content="99+" />

            <Badge content="新消息!" />
          </Space>
        </BlockArea>

        <BlockArea title="Empty">
          <Spin spin={!firstLoadSuccess}>
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
          </Spin>
        </BlockArea>

        <BlockArea title="Buttons Color">
          <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
            <Space wrap>
              {buildButton({
                inner: 'default',
              })}

              {buildButton({
                inner: 'primary',
                color: 'primary',
              })}

              {buildButton({
                inner: 'success',
                color: 'success',
              })}

              {buildButton({
                inner: 'danger',
                color: 'danger',
              })}

              {buildButton({
                inner: 'warning',
                color: 'warning',
              })}

              {buildButton({
                inner: 'loading',
                loading: true,
              })}

              {buildButton({
                inner: 'disabled',
                disabled: true,
              })}
            </Space>
          </VerticalBox>
        </BlockArea>

        <BlockArea title="Buttons Block Large">
          <Space direction="vertical">
            {buildButton({
              inner: 'Block Button',
              block: true,
              color: 'primary',
              size: 'large',
            })}
          </Space>
        </BlockArea>

        <BlockArea title="Button Action">
          <Space wrap>
            {buildButton({
              inner: 'Action',
              color: 'primary',
              onClick: this.onActionClick,
            })}

            {buildButton({
              inner: 'ActionSheet',
              color: 'success',
              onClick: this.onActionSheetClick,
            })}

            {buildButton({
              inner: 'ActionModal',
              color: 'danger',
              onClick: this.onActionModalClick,
            })}

            {buildButton({
              inner: 'reload',
              loading: !!dataLoading,
              onClick: this.reloadData,
            })}

            {buildButton({
              inner: 'reloadRemoteMetaData',
              onClick: this.reloadRemoteMetaData,
            })}

            {buildButton({
              inner: 'showRemoteMetaDataInConsole',
              onClick: this.showRemoteMetaDataInConsole,
            })}
          </Space>
        </BlockArea>

        <BlockArea title="AutoCenter">
          <AutoCenter>
            Esse ad minim incididunt elit veniam elit deserunt. Enim nisi duis
            aliquip mollit adipisicing. Dolor excepteur ipsum in quis magna
            irure exercitation ad anim adipisicing irure commodo. Culpa
            adipisicing duis est irure occaecat officia reprehenderit nisi magna
            nulla enim nostrud. Nisi commodo excepteur do sint Lorem qui laboris
            incididunt id. Elit ex dolor minim ullamco ex mollit commodo laboris
            voluptate aute nostrud Lorem. Nulla et elit in anim incididunt id
            culpa Lorem. Dolore ullamco aliqua do reprehenderit consectetur
            proident occaecat laborum tempor proident ipsum labore quis culpa.
          </AutoCenter>
        </BlockArea>
      </View>
    );
  }
}

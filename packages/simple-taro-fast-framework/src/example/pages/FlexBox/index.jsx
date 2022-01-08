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
  FadeView,
  NoticeBar,
  FlexBox,
  Row,
  Col,
  CenterBox,
  Icon,
  Steps,
  Divider,
} from 'taro-fast-component/es/customComponents';
import { buildButton } from 'taro-fast-component/es/functionComponent';

import { pathCollection } from '@/customConfig/constants';
import PageWrapper from '@/customComponents/PageWrapper';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from '../Assist/action';

const { Step } = Steps;
const { IconVolumePlus } = Icon;

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

  buildItem = ({ name, path }) => {
    return (
      <View
        onClick={() => {
          this.navigateTo({
            url: path,
          });
        }}
      >
        {name}
      </View>
    );
  };

  renderFurther() {
    const { dataLoading, firstLoadSuccess } = this.state;

    console.log(this.state);

    const rowStyle = {
      backgroundColor: '#cdd1d5bf',
    };

    const colStyle = {
      textAlign: 'center',
      backgroundColor: '#0092ffbf',
    };

    console.log({ pathCollection });

    return (
      <View className="index">
        <AutoCenter> Welcome To Taro-Fast-Framework! </AutoCenter>

        <BlockArea title="组件示例">
          <Space wrap>
            {this.buildItem({
              name: 'ImageBox',
              path: pathCollection.imageBox.path,
            })}

            {this.buildItem({
              name: 'Avatar',
              path: pathCollection.avatar.path,
            })}

            {this.buildItem({
              name: 'Badge',
              path: pathCollection.badge.path,
            })}

            {this.buildItem({
              name: 'NoticeBar',
              path: pathCollection.noticeBar.path,
            })}

            {this.buildItem({
              name: 'Flex',
              path: pathCollection.flex.path,
            })}
          </Space>
        </BlockArea>

        <BlockArea title="FlexBox">
          <FlexBox left="仅左侧" />

          <FlexBox
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="right"
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            style={{ height: '200rpx' }}
            direction="vertical"
            vertical={{
              bottomHeight: '80rpx',
            }}
            top="上侧"
            topStyle={rowStyle}
            bottom="下侧"
            bottomStyle={colStyle}
          />
        </BlockArea>
      </View>
    );
  }
}

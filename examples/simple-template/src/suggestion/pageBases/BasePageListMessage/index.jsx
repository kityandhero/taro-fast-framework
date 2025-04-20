import { CustomWrapper, View } from '@tarojs/components';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import { Button, Space } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents';
import { getSubsidiaryIdCache, HeadNavigationBox } from '../../../utils';
import { viewStyle } from '../../customConfig';
import { fieldDataBaseSubsidiaryMessage } from '../../fieldDataCollection';
import { buildMessageListItem } from '../../utils';

class BasePageListMessage extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  messagePageTitle = '';

  viewStyle = {
    ...viewStyle,
    paddingBottom: transformSize(28),
    paddingTop: transformSize(28),
    paddingLeft: transformSize(28),
    paddingRight: transformSize(28),
  };

  enableBackTop = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  supplementLoadRequestParams = (o) => {
    const subsidiaryId = getSubsidiaryIdCache();

    if (checkStringIsNullOrWhiteSpace(subsidiaryId)) {
      return { ...o };
    }

    o[fieldDataBaseSubsidiaryMessage.subsidiaryId.name] = subsidiaryId;

    return { ...o };
  };

  doWorkWhenRepeatedShow = () => {
    this.reloadData({
      otherState: { metaListData: [] },
      delay: 800,
    });
  };

  // eslint-disable-next-line no-unused-vars
  getItemId = (data) => {
    throw new Error('getItemId need overrode to implement');
  };

  goToDetailMessage = () => {
    throw new Error('goToDetailMessage need overrode to implement');
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigationBox title={this.messagePageTitle || '缺少页面标题'} />
    );
  };

  buildListView = () => {
    const { metaListData } = this.state;

    return (
      <CustomWrapper>
        <View>
          <Space direction="vertical" fillWidth size={30}>
            {metaListData.map((item) => {
              const { title, description, createTime } = {
                title: '',
                description: '',
                createTime: '',
                ...item,
              };

              const id = this.getItemId(item);

              return buildMessageListItem({
                key: `subsidiaryMessage_${id}`,
                title,
                description,
                createTime,
                onClick: () => {
                  this.goToDetailMessage(id);
                },
              });
            })}
          </Space>
        </View>
      </CustomWrapper>
    );
  };

  renderFurther() {
    const { reloading, metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <></>
        ) : metaListData.length === 0 && !reloading ? (
          <View
            style={{
              paddingTop: transformSize(100),
            }}
          >
            {this.buildEmptyPlaceholder({
              imageWidth: 200,
              description: '还没有数据哦',
              descriptionStyle: {
                marginTop: transformSize(60),
              },
            })}

            <Button
              text="返回"
              backgroundColor="#fff"
              fontColor="#999"
              fontSize={32}
              block
              circle
              size="middle"
              shape="rounded"
              onClick={() => {
                navigateBack();
              }}
            />
          </View>
        ) : (
          this.buildListView()
        )}
      </View>
    );
  }
}

export { BasePageListMessage };

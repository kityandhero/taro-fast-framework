import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
} from 'easy-soft-utility';

import { Tips, transformSize } from 'taro-fast-common';
import {
  ActivityIndicator,
  buildEmptyPlaceholder,
  Button,
  CenterBox,
  ColorText,
  IconCheckCircle,
  Line,
  Radio,
} from 'taro-fast-component';
import { PopupWrapperBase, switchControlAssist } from 'taro-fast-framework';

import { fieldDataUser, fieldDataWorkflowCase } from '../../../customConfig';
import { singleListNextNodeApproverAction } from '../../pages/approve/assist/action';

function transferRadioOptionCollection(list) {
  if (!isArray(list)) {
    return [];
  }

  return list.map((item) => {
    const { friendlyName, userId } = {
      friendlyName: '',
      userId: '',
      ...item,
    };

    return {
      label: friendlyName ?? '',
      value: userId,
    };
  });
}

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '3f96df0053b1442ea23ce2078deb1c32';

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class SelectNextNodeApproverPopup extends PopupWrapperBase {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      nextNodeApproverUserLoading: true,
      nextNodeApproverUserList: [],
      nextNodeApproverUserSelectedList: [],
    };
  }

  doOtherWhenChangeVisibleToShow = () => {
    Tips.loading(`预检审批人`);

    this.loadNextNodeApprover();
  };

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({
      nextNodeApproverUserLoading: true,
      nextNodeApproverUserList: [],
      nextNodeApproverUserSelectedList: [],
    });
  };

  loadNextNodeApprover = () => {
    const { externalData } = this.props;

    const workflowCaseId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const d = {};

    d[fieldDataWorkflowCase.workflowCaseId.name] = workflowCaseId;

    singleListNextNodeApproverAction({
      target: this,
      handleData: {
        ...d,
      },
      successCallback: ({ target, remoteListData }) => {
        if (
          isArray(remoteListData) &&
          !isEmptyArray(remoteListData) &&
          remoteListData.length === 1
        ) {
          const firstData = remoteListData[0];

          const userId = getValueByKey({
            data: firstData,
            key: fieldDataUser.userId.name,
            convert: convertCollection.string,
          });

          const friendlyName = getValueByKey({
            data: firstData,
            key: fieldDataUser.friendlyName.name,
            convert: convertCollection.string,
          });

          target.nextWorkflowNodeApproverUserId = userId;
          target.nextWorkflowNodeApproverUserRealName = friendlyName;
        }

        target.setState({
          nextNodeApproverUserLoading: false,
          nextNodeApproverUserList: [...remoteListData],
        });

        Tips.loaded();
      },
    });
  };

  onChange = (v, option) => {
    const { afterChange } = this.props;

    this.setState(
      {
        nextNodeApproverUserSelectedList: [v],
      },
      () => {
        if (isFunction(afterChange)) {
          afterChange(v, option);
        }
      },
    );
  };

  onOk = () => {
    const { afterOk } = this.props;

    this.handleClose();

    if (isFunction(afterOk)) {
      afterOk();
    }
  };

  buildUpperView = () => {
    const {
      nextNodeApproverUserLoading,
      nextNodeApproverUserList,
      nextNodeApproverUserSelectedList,
    } = this.state;

    const { nodeName } = this.props;

    const hasData = isArray(nextNodeApproverUserList)
      ? isEmptyArray(nextNodeApproverUserList)
        ? false
        : true
      : false;

    return (
      <View style={{ minHeight: transformSize(240) }}>
        {checkStringIsNullOrWhiteSpace(nodeName) ? null : (
          <View
            style={{
              paddingLeft: transformSize(24),
              paddingRight: transformSize(24),
              paddingTop: transformSize(12),
              paddingBottom: transformSize(12),
            }}
          >
            <CenterBox>
              <ColorText
                style={{
                  paddingBottom: transformSize(4),
                  borderBottom: `${transformSize(2)} solid #ccc`,
                }}
                color="#81929c"
                fontSize={30}
                text={nodeName}
              />
            </CenterBox>
          </View>
        )}

        {nextNodeApproverUserLoading ? (
          <View
            style={{
              height: transformSize(88),
            }}
          >
            <CenterBox>
              <ActivityIndicator
                type="ring"
                style={{}}
                content="审批人加载中"
                visible
                borderWidth={1}
                color="#11d3f8"
              />
            </CenterBox>
          </View>
        ) : hasData ? (
          <Radio
            options={transferRadioOptionCollection(nextNodeApproverUserList)}
            iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
            iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
            afterChange={(v, option) => {
              this.onChange(v, option);
            }}
          />
        ) : (
          buildEmptyPlaceholder({
            description: '暂无下一审批人',
          })
        )}

        <Line transparent height={40} />

        <Button
          text="下一步"
          fontColor="#fff"
          backgroundColor="#0075ff"
          fontSize={34}
          block
          circle
          size="middle"
          disabled={nextNodeApproverUserSelectedList.length <= 0}
          onClick={this.onOk}
        />
      </View>
    );
  };
}

export { SelectNextNodeApproverPopup };

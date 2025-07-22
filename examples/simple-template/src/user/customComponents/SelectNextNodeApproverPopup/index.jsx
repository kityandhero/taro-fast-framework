import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
} from 'easy-soft-utility';

import { Tips, transformSize } from 'taro-fast-common';
import { Button, Line, Radio } from 'taro-fast-component';
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
      nextNodeApproverUserList: [],
      nextNodeApproverUserSelectedList: [],
    };
  }

  doOtherWhenChangeVisibleToShow = () => {
    Tips.loading(`预检审批人`);

    this.loadNextNodeApprover();
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
          nextNodeApproverUserList: [...remoteListData],
        });

        Tips.loaded();
      },
    });
  };

  onNextNodeApproverChange = (v, option) => {
    const { afterNextNodeApproverChange } = this.props;

    this.setState(
      {
        nextNodeApproverUserSelectedList: [v],
      },
      () => {
        if (isFunction(afterNextNodeApproverChange)) {
          afterNextNodeApproverChange(v, option);
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
    const { nextNodeApproverUserList, nextNodeApproverUserSelectedList } =
      this.state;

    return (
      <View style={{ minHeight: transformSize(240) }}>
        <Radio
          options={transferRadioOptionCollection(nextNodeApproverUserList)}
          afterChange={(v, option) => {
            this.onNextNodeApproverChange(v, option);
          }}
        />

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

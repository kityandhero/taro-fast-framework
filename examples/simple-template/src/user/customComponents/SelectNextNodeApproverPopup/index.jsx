import { View } from '@tarojs/components';

import { isArray, isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, Line, Radio } from 'taro-fast-component';
import { PopupWrapperBase, switchControlAssist } from 'taro-fast-framework';

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
      nextNodeApproverUserSelectedList: [],
    };
  }

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
    const { nextNodeApproverUserList } = this.props;
    const { nextNodeApproverUserSelectedList } = this.state;

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

import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { isArray, isEmptyArray, isFunction } from 'easy-soft-utility';

import { Tips, transformSize } from 'taro-fast-common';
import {
  ActivityIndicator,
  buildEmptyPlaceholder,
  Button,
  CenterBox,
  IconCheckCircle,
  Line,
  Radio,
} from 'taro-fast-component';
import { PopupWrapperBase, switchControlAssist } from 'taro-fast-framework';

import { singleListAction } from '../../assists/generalDiscourseAction';

function transferRadioOptionCollection(list) {
  if (!isArray(list)) {
    return [];
  }

  return list.map((item) => {
    const { content, generalDiscourseId } = {
      content: '',
      generalDiscourseId: '',
      ...item,
    };

    return {
      label: content ?? '',
      value: generalDiscourseId,
    };
  });
}

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'ce560bbe705a457cac69ca8a6939fcf5';

@connect(
  ({ generalDiscourse, session, entrance, global, schedulingControl }) => ({
    generalDiscourse,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class SelectGeneralDiscoursePopup extends PopupWrapperBase {
  currentContent = '';

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
      generalDiscourseLoading: true,
      generalDiscourseList: [],
      generalDiscourseSelectedList: [],
    };
  }

  doOtherWhenChangeVisibleToShow = () => {
    Tips.loading(`加载常用语`);

    this.loadGeneralDiscourse();
  };

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({
      generalDiscourseLoading: true,
      generalDiscourseList: [],
      generalDiscourseSelectedList: [],
    });
  };

  loadGeneralDiscourse = () => {
    singleListAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          generalDiscourseLoading: false,
          generalDiscourseList: [...remoteListData],
        });

        Tips.loaded();
      },
    });
  };

  onChange = (v, option) => {
    const { label } = option;

    this.currentContent = label ?? '';

    this.setState({
      generalDiscourseSelectedList: [v],
    });
  };

  onOk = () => {
    const { afterOk } = this.props;

    this.handleClose();

    if (isFunction(afterOk)) {
      afterOk(this.currentContent);
    }
  };

  buildUpperView = () => {
    const {
      generalDiscourseLoading,
      generalDiscourseList,
      generalDiscourseSelectedList,
    } = this.state;

    const hasData = isArray(generalDiscourseList)
      ? isEmptyArray(generalDiscourseList)
        ? false
        : true
      : false;

    return (
      <View style={{ minHeight: transformSize(240) }}>
        {generalDiscourseLoading ? (
          <View
            style={{
              height: transformSize(88),
            }}
          >
            <CenterBox>
              <ActivityIndicator
                type="ring"
                style={{}}
                content="常用语加载中"
                visible
                borderWidth={1}
                color="#11d3f8"
              />
            </CenterBox>
          </View>
        ) : hasData ? (
          <Radio
            options={transferRadioOptionCollection(generalDiscourseList)}
            iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
            iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
            afterChange={(v, option) => {
              this.onChange(v, option);
            }}
          />
        ) : (
          buildEmptyPlaceholder({
            description: '暂无常用语',
          })
        )}

        <Line transparent height={40} />

        <Button
          text="确定"
          fontColor="#fff"
          backgroundColor="#0075ff"
          fontSize={34}
          block
          circle
          size="middle"
          disabled={generalDiscourseSelectedList.length <= 0}
          onClick={this.onOk}
        />
      </View>
    );
  };
}

export { SelectGeneralDiscoursePopup };

import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { whetherNumber } from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import { Button, Line } from 'taro-fast-component';

import { HeadNavigationBox } from '../../../../utils';
import { BaseFlowCaseDetail } from '../../../pageBases';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '事项审批',
  navigationStyle: 'custom',
});

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class DetailFlowCase extends BaseFlowCaseDetail {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  triggerNoteChanged = (v) => {
    this.note = v;
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="审批详情" />;
  };

  buildActionPlaceholderBox = () => {
    const { canEdit, canApprove } = this.state;

    if (canEdit === whetherNumber.no && canApprove === whetherNumber.no) {
      return null;
    }

    return <Line transparent height={350} />;
  };

  buildActionBox = () => {
    return (
      <>
        <Line transparent height={18} />

        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              paddingLeft: transformSize(18),
              paddingRight: transformSize(18),
            }}
          >
            <Button
              text="返回"
              fontSize={24}
              backgroundColor="#fff"
              block
              size="middle"
              onClick={() => {
                navigateBack();
              }}
            />
          </View>

          <Line transparent height={60} />
        </View>
      </>
    );
  };

  renderInteractiveArea = () => {
    return <>{this.renderFilePreviewPopup()}</>;
  };
}

export default DetailFlowCase;

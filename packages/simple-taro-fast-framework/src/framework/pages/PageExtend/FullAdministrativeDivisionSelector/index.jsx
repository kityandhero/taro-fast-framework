import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { Item } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../../customComponents/ContentPageBase';

export const classPrefix = `template-grid-banner`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '胶囊操作提示',
  // navigationStyle: 'custom',
});

@connect(
  ({
    administrativeDivision,
    entrance,
    session,
    global,
    schedulingControl,
  }) => ({
    administrativeDivision,
    entrance,
    session,
    global,
    schedulingControl,
  }),
)
@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  useFullAdministrativeDivisionSelector = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        address: '',
      },
    };
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'schedulingControl' });
  };

  renderFurther() {
    const { address } = this.state;

    return (
      <View>
        <Item
          label="选择地区"
          extra={address}
          clickable
          arrow
          onClick={this.showFullAdministrativeDivisionSelector}
        ></Item>
      </View>
    );
  }
}

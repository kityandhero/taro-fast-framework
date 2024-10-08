import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, InputItem } from 'taro-fast-component';

import { ContentPageBase } from '../../../../customComponents';

export const classPrefix = `template-grid-banner`;

const labelStyle = {
  fontSize: transformSize(30),
};

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

  provinceName = '';

  provinceCode = 0;

  cityName = '';

  cityCode = 0;

  districtName = '';

  districtCode = 0;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      address: '',
    };
  }

  doAfterFullAdministrativeDivisionSelectorChanged = ({ optionList }) => {
    if (optionList.length > 0) {
      this.provinceName = optionList[0].label;
      this.provinceCode = optionList[0].value;
    }

    if (optionList.length >= 2) {
      this.cityName = optionList[1].label;
      this.cityCode = optionList[1].value;
    }

    if (optionList.length >= 3) {
      this.districtName = optionList[2].label;
      this.districtCode = optionList[2].value;
    }
  };

  doAfterHideFullAdministrativeDivisionSelector = () => {
    const address = [this.provinceName, this.cityName, this.districtName].join(
      ' ',
    );

    this.setState({
      address,
    });
  };

  renderFurther() {
    const { address } = this.state;

    return (
      <View>
        <InputItem
          labelStyle={labelStyle}
          label="所在地区:"
          value={address}
          labelAlign="right"
          readonly
          extra={
            <Button
              text="选择"
              size="mini"
              backgroundColor={['#0076b8', 'green']}
              onClick={this.showFullAdministrativeDivisionSelector}
            />
          }
          afterChange={(v) => {
            logConsole(v, 'afterChange');
          }}
          onClick={(o) => {
            logConsole(o, 'onClick');
          }}
        />
      </View>
    );
  }
}

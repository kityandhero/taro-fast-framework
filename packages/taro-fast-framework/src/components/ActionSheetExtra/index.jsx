import { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { logTrace } from 'easy-soft-utility';

import { ActionSheet } from 'taro-fast-component';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ActionSheetExtra extends PureComponent {
  getProperties = () => {
    return { flag: '', ...this.props };
  };

  render() {
    const { flag, switchControl, ...rest } = this.getProperties();

    const v = !!switchControl[flag];

    logTrace(
      {
        flag,
      },
      v ? 'ActionSheet show' : 'ActionSheet hide',
    );

    return <ActionSheet {...rest} visible={v || false} />;
  }
}

export { ActionSheetExtra };

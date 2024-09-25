import { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { logTrace } from 'easy-soft-utility';

import { Popup } from 'taro-fast-component';

@connect(({ switchControl }) => ({
  switchControl,
}))
class PopupExtra extends PureComponent {
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
      v ? 'Popup show' : 'Popup hide',
    );

    return <Popup {...rest} visible={v || false} />;
  }
}

export { PopupExtra };

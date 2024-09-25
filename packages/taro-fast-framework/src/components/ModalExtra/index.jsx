import { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isString, logTrace } from 'easy-soft-utility';

import { CenterBox, Modal } from 'taro-fast-component';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ModalExtra extends PureComponent {
  getProperties = () => {
    return { flag: '', title: '', ...this.props };
  };

  render() {
    const { flag, switchControl, title, children, ...rest } =
      this.getProperties();

    const v = !!switchControl[flag];

    logTrace(
      {
        flag,
      },
      v ? 'Modal show' : 'Modal hide',
    );

    const header = isString(title || '') ? (
      <CenterBox>{title}</CenterBox>
    ) : (
      title
    );

    return (
      <Modal {...rest} visible={v || false} header={header}>
        {children}
      </Modal>
    );
  }
}

export { ModalExtra };

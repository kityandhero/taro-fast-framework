import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Ellipsis, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  line: 1,
  style: {
    width: transformSize(250),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
    height: transformSize(44),
  },
  onClick: () => {
    console.log('ellipsis click');
  },
};

const config2 = {
  line: 2,
  style: {
    height: transformSize(88),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
  },
  onClick: () => {
    console.log('ellipsis click');
  },
};

const config3 = {
  line: 3,
  style: {
    height: transformSize(132),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
  },
  onClick: () => {
    console.log('ellipsis click');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文字省略',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Ellipsis',
    name: '文字省略',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="显示一行文字" config={config1}>
          <Ellipsis {...config1}>
            这是一段宽度限制长度的文字，后面的内容会省略。
          </Ellipsis>
        </SimpleBox>

        <SimpleBox header="显示两行文字" config={config2}>
          <Ellipsis {...config2}>
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,
            后面的内容会省略。
          </Ellipsis>
        </SimpleBox>

        <SimpleBox header="显示三行文字" config={config3}>
          <Ellipsis {...config3}>
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,后面的内容会省略。
          </Ellipsis>
        </SimpleBox>

        <PropertyBox config={Ellipsis.defaultProps} labelWidth={170} />
      </Space>
    );
  };
}

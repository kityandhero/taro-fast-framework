import { connect } from 'easy-soft-dva';
import { logConfig, toMd5, transformListData } from 'easy-soft-utility';

import { Cascader, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const options = [
  {
    label: '河南',
    value: '0-0',
    children: [
      {
        label: '郑州',
        value: '0-0-0',
        children: [
          {
            label: '中原区',
            value: '0-0-0-0',
          },
          {
            label: '二七区',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: '洛阳',
        value: '0-0-1',
        children: [
          {
            label: '涧西区',
            value: '0-0-1-0',
          },
          {
            label: '西工区',
            value: '0-0-1-1',
          },
        ],
      },
      {
        label: '南阳',
        value: '0-0-2',
        children: [
          {
            label: '栾川',
            value: '0-0-2-0',
          },
          {
            label: '西峡',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '河北',
    value: '0-1',
    children: [
      {
        label: '石家庄',
        value: '0-1-0',
        children: [
          {
            label: '新华区',
            value: '0-1-0-0',
          },
          {
            label: '长安区',
            value: '0-1-0-1',
          },
        ],
      },
      {
        label: '保定',
        value: '0-1-1',
        children: [
          {
            label: '新市区',
            value: '0-1-1-0',
          },
          {
            label: '北市区',
            value: '0-1-1-1',
          },
        ],
      },
      {
        label: '唐山',
        value: '0-1-2',
        children: [
          {
            label: '路北区',
            value: '0-1-2-0',
          },
          {
            label: '路南区',
            value: '0-1-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '山东',
    value: '0-2',
    children: [
      {
        label: '济南',
        value: '0-2-0',
        children: [
          {
            label: '历下区',
            value: '0-2-0-0',
          },
          {
            label: '市中区',
            value: '0-2-0-1',
          },
        ],
      },
      {
        label: '青岛',
        value: '0-2-1',
        children: [
          {
            label: '市南区',
            value: '0-2-1-0',
          },
          {
            label: '市北区',
            value: '0-2-1-1',
          },
        ],
      },
      {
        label: '淄博',
        value: '0-2-2',
        children: [
          {
            label: '张店区',
            value: '0-2-2-0',
          },
          {
            label: '博山区',
            value: '0-2-2-1',
          },
        ],
      },
    ],
  },
];

function convertItem(data) {
  const { name, code } = data;

  return {
    label: name,
    value: code,
  };
}

function afterChangeInConsole(d) {
  logConfig(d, 'afterChangeInConsole');
}

const config1 = {
  value: [
    options[2].value,
    options[2].children[1].value,
    options[2].children[1].children[1].value,
  ],
  options,
  useOptionCompareFlag: true,
  optionCompareFlag: toMd5(options),
  afterChange: afterChangeInConsole,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '级联选择',
});

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Cascader',
    name: '级联选择',
    description: '级联选择组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'administrativeDivision/singeList',
      header: '展示1',
      currentConfig: config1,
      optionList: [],
      optionCompareFlag: '1',
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const optionList = transformListData({
      list: metaListData,
      convert: convertItem,
      recursiveKey: 'children',
    });

    const optionCompareFlag = toMd5(optionList);

    logConfig(
      {
        optionCompareFlag,
      },
      'doOtherAfterLoadSuccess',
    );

    this.setState({
      optionList,
      optionCompareFlag,
    });
  };

  establishControlList = () => {
    const { optionList, optionCompareFlag } = this.state;

    return [
      {
        header: '展示1',
        config: config1,
      },
      {
        header: '展示2',
        config: {
          value: [],
          options: optionList,
          useOptionCompareFlag: true,
          optionCompareFlag: optionCompareFlag,
          afterChange: afterChangeInConsole,
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Cascader key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Cascader>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Cascader"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['options']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Cascader.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}

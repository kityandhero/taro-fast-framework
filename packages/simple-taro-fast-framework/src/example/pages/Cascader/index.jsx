import { View } from '@tarojs/components';

import { Cascader, Card, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Cascader',
    name: '级联选择',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="组件展示"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <Cascader
              value={[
                options[2].value,
                options[2].children[1].value,
                options[2].children[1].children[1].value,
              ]}
              options={options}
            />
          </Card>
        </Space>
      </View>
    );
  };
}

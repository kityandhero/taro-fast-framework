import { Card, HelpBox, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const list = [
  {
    text: 'Html数据展示，空白将替换为Empty.',
  },
  {
    text: '帮助条目2.',
  },
  {
    text: '帮助条目3.',
  },
  {
    text: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的帮助条目.',
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HelpBox',
    name: '帮助提示',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="一般用法" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox list={list} />
        </Card>

        <Card header="隐藏标题" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox list={list} showTitle={false} />
        </Card>

        <Card header="不显示行号" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle showNumber={false} list={list} />
        </Card>

        <Card header="标题宽度" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle labelWidth={80} list={list} />
        </Card>

        <Card header="无背景" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            title="操作说明"
            showTitle
            useBackground={false}
            list={list}
          />
        </Card>

        <Card header="隐藏" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox title="操作说明" showTitle hidden list={list} />
        </Card>
      </Space>
    );
  };
}

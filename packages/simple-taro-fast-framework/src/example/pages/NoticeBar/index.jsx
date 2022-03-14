import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  NoticeBar,
  Icon,
  Space,
  More,
} from 'taro-fast-component/es/customComponents';
import {} from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const { IconVolumePlus } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'NoticeBar',
    name: '通知条',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="附带图标" style={style} headerStyle={cardHeaderStyle}>
          <NoticeBar icon={<IconVolumePlus size={38} />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="可关闭 [single 模式非 marquee 下生效]"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar single closeable>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="marquee模式 [marquee 将自动启用 single 模式]"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar marquee>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="自定义扩展 [single 模式下生效]"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar
            single
            extra={
              <View
                style={{
                  width: transformSize(100),
                  height: '100%',
                  color: '#000',
                  padding: `0 ${transformSize(10)}`,
                  fontSize: transformSize(28),
                  textAlign: 'center',
                }}
              >
                extra
              </View>
            }
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="显示更多 [single 模式下生效]"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar single extra={<More />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="自定义”更多“文字 [single 模式下生效]"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar
            single
            extra={
              <More
                text="查看更多"
                onClick={() => {
                  console.log('click more');
                }}
              />
            }
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card header="例子展示" style={style} headerStyle={cardHeaderStyle}>
          <NoticeBar
            icon={<IconVolumePlus size={38} />}
            marquee
            single
            extra={<More />}
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>
      </Space>
    );
  };
}

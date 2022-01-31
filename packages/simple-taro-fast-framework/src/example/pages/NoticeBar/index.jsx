import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  NoticeBar,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';
import {} from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconVolumePlus } = Icon;
const { More } = NoticeBar;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="Icon" headerStyle={cardHeaderStyle}>
            <NoticeBar icon={<IconVolumePlus size={38} />}>
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card
            header="Closeable [single 模式非 marquee 下生效]"
            headerStyle={cardHeaderStyle}
          >
            <NoticeBar single closeable>
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card
            header="Marquee [marquee 将自动启用 single 模式]"
            headerStyle={cardHeaderStyle}
          >
            <NoticeBar marquee>
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card
            header="Extra [single 模式下生效]"
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
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card header="More [single 模式下生效]" headerStyle={cardHeaderStyle}>
            <NoticeBar single extra={<More />}>
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card
            header="MoreText [single 模式下生效]"
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
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>

          <Card header="Simple" headerStyle={cardHeaderStyle}>
            <NoticeBar
              icon={<IconVolumePlus size={38} />}
              marquee
              single
              extra={<More />}
            >
              这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar
              通告栏
            </NoticeBar>
          </Card>
        </Space>
      </View>
    );
  }
}

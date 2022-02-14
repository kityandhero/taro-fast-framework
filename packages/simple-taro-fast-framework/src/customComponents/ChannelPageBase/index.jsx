import { View, Text } from '@tarojs/components';

import { navigateTo } from 'taro-fast-common/es/utils/tools';
import {
  FadeView,
  ImageBox,
  Icon,
  Spin,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../PageWrapper';

import './index.less';

const { IconList, IconChevronRight } = Icon;

export default class ChannelPageBase extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: false,
      },
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ show: true });
    }, 800);
  };

  buildData = () => {
    return { title: '', icon: '', list: [] };
  };

  renderChannelView = () => {
    const { title, icon, list } = this.buildData();

    return (
      <>
        <View className="panel-header">
          <View className="panel-header__icon">
            {icon ? (
              <View className="img">
                <ImageBox src={icon} />
              </View>
            ) : (
              <IconList size={36} />
            )}
          </View>
          <View className="panel-header__title">{title}</View>
        </View>

        <View className="panel-body">
          <View className="component-list">
            {list.map((one, index) => (
              <View
                className="component-list__item"
                key={`${index}`}
                onClick={() => {
                  navigateTo(one.path);
                }}
              >
                <Text className="name">{`${one.id} ${one.name}`}</Text>
                <IconChevronRight size={36} />
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  renderFurther() {
    const { show } = this.state;

    return (
      <Spin fullscreen spin={!show}>
        <FadeView show={show} className="page">
          {this.renderChannelView()}
        </FadeView>
      </Spin>
    );
  }
}

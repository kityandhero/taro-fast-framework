import { Text, View } from '@tarojs/components';

import { navigateTo } from 'taro-fast-common/es/utils/tools';
import { Icon, ImageBox } from 'taro-fast-component/es/customComponents';

import PageWrapperSimulation from '../PageWrapperSimulation';

import './index.less';

const { IconList, IconChevronRight } = Icon;

export default class ChannelPageBase extends PageWrapperSimulation {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        spin: true,
      },
    };
  }

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
            {list.map((one, index) => {
              const { hidden } = one;

              if (hidden) {
                return null;
              }

              return (
                <View
                  className="component-list__item"
                  key={`${index}`}
                  onClick={() => {
                    navigateTo(one.path);
                  }}
                >
                  <Text
                    className="name"
                    userSelect
                  >{`${one.id} ${one.name}`}</Text>
                  <IconChevronRight size={36} />
                </View>
              );
            })}
          </View>
        </View>
      </>
    );
  };

  renderFurther() {
    return this.renderChannelView();
  }
}

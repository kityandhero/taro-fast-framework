import { View } from '@tarojs/components';

import { isArray, isFunction } from 'easy-soft-utility';

import { AbstractComponent } from 'taro-fast-common';
import { CenterBox, HelpBox, Space } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../customConfig';
import { ContentPageBase } from '../ContentPageBase';
import { Header } from '../Header';
import { PropertyInteractiveBox } from '../PropertyInteractiveBox';
import { SimpleBox } from '../SimpleBox';

class ContentPageWrapper extends ContentPageBase {
  configCore = {};

  centerSimple = true;

  targetComponentName = 'ComponentName';

  constructor(properties, initialConfig) {
    super(properties);

    this.state = {
      ...this.state,
      currentConfig: initialConfig,
    };

    this.configCore = initialConfig;
  }

  buildInteractiveConfig = () => {
    return [];
  };

  onOptionalValueClick = (o, otherState) => {
    const { currentConfig: currentConfigPrevious } = this.state;

    const { style: styleCore } = this.configCore;

    const { style: styleCurrentPrevious } = currentConfigPrevious;

    const { style: styleCustom } = o;

    const style = {
      ...styleCore,
      ...styleCurrentPrevious,
      ...styleCustom,
    };

    const valueAdjust = {
      ...this.configCore,
      ...currentConfigPrevious,
      ...o,
      style,
    };

    this.setState({ ...otherState, currentConfig: valueAdjust });
  };

  buildControlBox = () => {
    const list = this.buildInteractiveConfig();

    if (!isArray(list)) {
      return null;
    }

    if (list.length <= 0) {
      return null;
    }

    const listAdjust = [
      ...list,
      {
        ...interactiveConfigEmpty,
        name: 'showRenderCount',
        description: '在控制台显示渲染次数',
        valueType: [interactiveConfigCollection.boolean],
        defaultValue: AbstractComponent.defaultProps.showRenderCount,
        optionalValues: [
          {
            title: 'true',
            value: true,
          },
          {
            title: 'false',
            value: false,
          },
        ],
      },
      {
        ...interactiveConfigEmpty,
        name: 'hidden',
        description: '是否隐藏，隐藏即不渲染',
        valueType: [interactiveConfigCollection.string],
        defaultValue: AbstractComponent.defaultProps.hidden,
        optionalValues: [
          {
            title: 'true',
            value: true,
          },
          {
            title: 'false',
            value: false,
          },
        ],
      },
    ];

    return (
      <PropertyInteractiveBox
        list={listAdjust}
        onOptionalValueClick={(o, otherState) => {
          this.onOptionalValueClick(o, otherState);
        }}
      />
    );
  };

  buildSimpleList = () => {
    const { currentConfig, inner, wrapBuilder } = this.state;

    const list = isArray(currentConfig) ? currentConfig : [currentConfig];

    const result = list.map((config, index) => {
      return this.buildSimpleItem({ key: `simple_${index}`, config, inner });
    });

    if (isFunction(wrapBuilder)) {
      return wrapBuilder(result);
    }

    return result;
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
  };

  buildSimpleItemInner = (inner) => {
    if (isArray(inner)) {
      if (inner.length === 1) {
        return inner;
      }

      return inner.map((one) => {
        return one;
      });
    }

    return inner;
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName={this.targetComponentName}
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox()}
        >
          {this.centerSimple ? (
            <CenterBox>{this.buildSimpleList()}</CenterBox>
          ) : (
            this.buildSimpleList()
          )}
        </SimpleBox>

        <HelpBox
          title="备注"
          showTitle
          showNumber={false}
          list={[
            {
              text: 'showRenderCount: 在控制台显示渲染次数,仅应当用于开发调试模式.',
            },
            {
              text: 'hidden: 通用属性, 用于在特定模式下隐藏控件(采用跳过不渲染模式达到隐藏效果).',
            },
          ]}
        />
      </Space>
    );
  };

  renderContentView = () => {
    const { id, name, description } = {
      id: '',
      name: '',
      description: '',
      ...this.headerData,
    };

    return (
      <>
        {(this.headerData || null) == null ? null : (
          <Header title={`${id} ${name}`} description={description}></Header>
        )}

        <View className="doc-body">{this.renderContent()}</View>
      </>
    );
  };

  renderFurther() {
    return this.renderContentView();
  }
}

export { ContentPageWrapper };

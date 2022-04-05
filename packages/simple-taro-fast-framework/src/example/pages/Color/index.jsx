import { View } from '@tarojs/components';
import {
  transformSize,
  buildLinearGradient,
} from 'taro-fast-common/es/utils/tools';
import { colorPure, colorShadow } from 'taro-fast-common/es/utils/constants';

import {
  Space,
  Grid,
  FlexBox,
  CenterBox,
  ScaleBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';

const itemStyle1 = {
  width: transformSize(200),
  borderRadius: transformSize(10),
};

const itemStyle2 = {
  width: '90%',
  borderRadius: transformSize(10),
};

const boxStyle = {
  padding: 'var(--tfc-20) 0',
  height: 'var(--tfc-120)',
  color: 'var(--tfc-color-grey)',
};

const boxExtensionStyle = {
  height: 'var(--tfc-200)',
};

const nameStyle = {
  width: '100%',
  fontSize: 'var(--tfc-28)',
  height: 'var(--tfc-36)',
  lineHeight: 'var(--tfc-36)',
  textAlign: 'center',
  margin: 'var(--tfc-20) 0',
  overflow: 'hidden',
};

const nameExtensionStyle = {
  margin: 'var(--tfc-0) 0',
};

const descriptionStyle = {
  width: '100%',
  fontSize: 'var(--tfc-24)',
  height: 'var(--tfc-36)',
  lineHeight: 'var(--tfc-36)',
  textAlign: 'center',
  margin: 'var(--tfc-0) 0',
  overflow: 'hidden',
};

const config1 = {
  column: 2,
  list: [
    {
      color: colorPure.red,
      shadow: colorShadow.red,
      name: '--tfc-color-red',
      shortName: 'red',
    },
    {
      color: colorPure.orange,
      shadow: colorShadow.orange,
      name: '--tfc-color-orange',
      shortName: 'orange',
    },
    {
      color: colorPure.yellow,
      shadow: colorShadow.yellow,
      name: '--tfc-color-yellow',
      shortName: 'yellow',
    },
    {
      color: colorPure.olive,
      shadow: colorShadow.olive,
      name: '--tfc-color-olive',
      shortName: 'olive',
    },
    {
      color: colorPure.green,
      shadow: colorShadow.green,
      name: '--tfc-color-green',
      shortName: 'green',
    },
    {
      color: colorPure.cyan,
      shadow: colorShadow.cyan,
      name: '--tfc-color-cyan',
      shortName: 'cyan',
    },
    {
      color: colorPure.blue,
      shadow: colorShadow.blue,
      name: '--tfc-color-blue',
      shortName: 'blue',
    },
    {
      color: colorPure.purple,
      shadow: colorShadow.purple,
      name: '--tfc-color-purple',
      shortName: 'purple',
    },
    {
      color: colorPure.pink,
      shadow: colorShadow.pink,
      name: '--tfc-color-pink',
      shortName: 'pink',
    },
    {
      color: colorPure.brown,
      shadow: colorShadow.brown,
      name: '--tfc-color-brown',
      shortName: 'brown',
    },
    {
      color: colorPure.grey,
      shadow: colorShadow.grey,
      name: '--tfc-color-grey',
      shortName: 'grey',
    },
    {
      color: colorPure.black,
      shadow: colorShadow.black,
      name: '--tfc-color-black',
      shortName: 'black',
    },
  ],
};

const config2 = {
  column: 2,
  list: [
    {
      color: 'var(--tfc-color-red-light)',
      name: '--tfc-color-red-light',
      shortName: 'red-light',
    },
    {
      color: 'var(--tfc-color-orange-light)',
      name: '--tfc-color-orange-light',
      shortName: 'orange-light',
    },
    {
      color: 'var(--tfc-color-yellow-light)',
      name: '--tfc-color-yellow-light',
      shortName: 'yellow-light',
    },
    {
      color: 'var(--tfc-color-olive-light)',
      name: '--tfc-color-olive-light',
      shortName: 'olive-light',
    },
    {
      color: 'var(--tfc-color-green-light)',
      name: '--tfc-color-green-light',
      shortName: 'green-light',
    },
    {
      color: 'var(--tfc-color-cyan-light)',
      name: '--tfc-color-cyan-light',
      shortName: 'cyan-light',
    },
    {
      color: 'var(--tfc-color-blue-light)',
      name: '--tfc-color-blue-light',
      shortName: 'blue-light',
    },
    {
      color: 'var(--tfc-color-purple-light)',
      name: '--tfc-color-purple-light',
      shortName: 'purple-light',
    },
    {
      color: 'var(--tfc-color-pink-light)',
      name: '--tfc-color-pink-light',
      shortName: 'pink-light',
    },
    {
      color: 'var(--tfc-color-brown-light)',
      name: '--tfc-color-brown-light',
      shortName: 'brown-light',
    },
    {
      color: 'var(--tfc-color-grey-light)',
      name: '--tfc-color-grey-light',
      shortName: 'grey-light',
    },
    {
      color: 'var(--tfc-color-black-light)',
      name: '--tfc-color-black-light',
      shortName: 'black-light',
    },
  ],
};

const config3 = {
  column: 1,
  list: [
    {
      color: ['#f43f3b', '#ec008c'],
      direct: 45,
      name: `buildLinearGradient(45,#f43f3b,#ec008c)`,
      shortName: 'gradual-red',
    },
    {
      color: ['#ff9700', '#ed1c24'],
      direct: 45,
      name: `buildLinearGradient(45,#ff9700,#ed1c24)`,
      shortName: 'gradual-orange',
    },
    {
      color: ['#39b54a', '#8dc63f'],
      direct: 45,
      name: `buildLinearGradient(45,#39b54a,#8dc63f)`,
      shortName: 'gradual-green',
    },
    {
      color: ['#9000ff', '#5e00ff'],
      direct: 45,
      name: `buildLinearGradient(45,#9000ff,#5e00ff)`,
      shortName: 'gradual-purple',
    },
    {
      color: ['#ec008c', '#6739b6'],
      direct: 45,
      name: `buildLinearGradient(45,#ec008c,#6739b6)`,
      shortName: 'gradual-pink',
    },
    {
      color: ['#0081ff', '#1cbbb4'],
      direct: 45,
      name: `buildLinearGradient(45,#0081ff,#1cbbb4)`,
      shortName: 'gradual-blue',
    },
  ],
};

const config4 = {
  column: 1,
  list: [
    {
      color: ['#f43f3b', '#ec008c', '#ec708c'],
      direct: 180,
      name: `buildLinearGradient(180,#f43f3b,#ec008c,#ec708c)`,
      shortName: '#f43f3b #ec008c #ec708c',
    },
    {
      color: ['#ff9700', '#ed1c24', '#1d1c64'],
      direct: 45,
      name: `buildLinearGradient(45,#ff9700,#ed1c24,#1d1c64)`,
      shortName: '#ff9700 #ed1c24 #1d1c64',
    },
    {
      color: ['#9000ff', '#5e00ff', '#1e0fff', '#fe01ff'],
      direct: 270,
      name: `buildLinearGradient(270,#9000ff,#5e00ff,#1e0fff,#fe01ff)`,
      shortName: '#9000ff #5e00ff #1e0fff #fe01ff',
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '颜色',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: '颜色',
    description: '颜色说明',
  };

  buildGrid = ({
    style: itemStyle = {},
    column = 2,
    list = [],
    gradient = false,
    shadow = false,
    onlyShadow = false,
    aspectRatio = 0.4,
  }) => {
    return (
      <Grid
        columns={column}
        list={list}
        itemBuilder={({ item }) => {
          const { color, shadow: shadowColor, direct, shortName, name } = item;

          return (
            <FlexBox
              style={{
                ...boxStyle,
                ...(gradient ? boxExtensionStyle : {}),
              }}
              flexAuto="top"
              top={
                <CenterBox>
                  <ScaleBox
                    style={{
                      ...(gradient
                        ? {
                            backgroundImage: buildLinearGradient({
                              direct,
                              list: color,
                            }),
                          }
                        : {}),
                      ...(!gradient && !onlyShadow
                        ? {
                            backgroundColor: color,
                          }
                        : {}),
                      ...(shadow
                        ? {
                            boxShadow: `0 var(--tfc-7) var(--tfc-12) 0 ${shadowColor}`,
                          }
                        : {}),
                      ...itemStyle,
                    }}
                    aspectRatio={aspectRatio}
                  >
                    <CenterBox
                      style={{
                        fontSize: transformSize(30),
                        color: '#fff',
                      }}
                    >
                      <View>{shortName}</View>
                    </CenterBox>
                  </ScaleBox>
                </CenterBox>
              }
              bottom={
                gradient ? (
                  <Space direction="vertical" fillWidth size={10}>
                    <View
                      style={{
                        ...nameStyle,
                        ...(gradient ? nameExtensionStyle : {}),
                      }}
                    >
                      {name}
                    </View>
                    <View style={descriptionStyle}>
                      [
                      {buildLinearGradient({
                        direct,
                        list: color,
                      })}
                      ]
                    </View>
                  </Space>
                ) : (
                  <View style={nameStyle}>{name}</View>
                )
              }
            />
          );
        }}
      />
    );
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="纯色"
          footer={[
            {
              text: '内置CSS变量举例: --tfc-color-red',
            },
            {
              text: '使用举例: {color:var(--tfc-color-red)}',
            },
          ]}
          mockChildren={false}
          useInnerBox={false}
        >
          {this.buildGrid({
            column: config1.column,
            keyPrefix: 'config1',
            list: config1.list,
            style: itemStyle1,
            aspectRatio: 0.4,
          })}
        </SimpleBox>

        <SimpleBox header="纯阴影" mockChildren={false} useInnerBox={false}>
          {this.buildGrid({
            column: config1.column,
            keyPrefix: 'config1_shadow',
            list: config1.list,
            style: itemStyle1,
            aspectRatio: 0.4,
            onlyShadow: true,
            shadow: true,
          })}
        </SimpleBox>

        <SimpleBox header="附带阴影" mockChildren={false} useInnerBox={false}>
          {this.buildGrid({
            column: config1.column,
            keyPrefix: 'config1_shadow',
            list: config1.list,
            style: itemStyle1,
            aspectRatio: 0.4,
            shadow: true,
          })}
        </SimpleBox>

        <SimpleBox header="纯浅色" mockChildren={false} useInnerBox={false}>
          {this.buildGrid({
            column: config2.column,
            keyPrefix: 'config2',
            list: config2.list,
            style: itemStyle1,
            aspectRatio: 0.4,
          })}
        </SimpleBox>

        <SimpleBox header="二元渐变色" mockChildren={false} useInnerBox={false}>
          {this.buildGrid({
            column: config3.column,
            keyPrefix: 'config3',
            list: config3.list,
            style: itemStyle2,
            aspectRatio: 0.15,
            gradient: true,
          })}
        </SimpleBox>

        <SimpleBox header="复杂渐变色" mockChildren={false} useInnerBox={false}>
          {this.buildGrid({
            column: config4.column,
            keyPrefix: 'config4',
            list: config4.list,
            style: itemStyle2,
            aspectRatio: 0.15,
            gradient: true,
          })}
        </SimpleBox>
      </Space>
    );
  };
}

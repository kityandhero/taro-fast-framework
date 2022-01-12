import { useState } from 'react';
import { View } from '@tarojs/components';

import { BlockArea } from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const ItemList = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
];

// 避免取消选择
const RadioMode = () => {
  const [value, setValue] = useState('1');
  return (
    <Selector
      options={ItemList}
      value={[value]}
      onChange={(v) => {
        if (v.length) {
          setValue(v[0]);
        }
      }}
    />
  );
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="单选">
          <Selector
            options={ItemList}
            defaultValue={['1']}
            onChange={(arr, extend) => console.log(arr, extend.items)}
          />
        </BlockArea>

        <BlockArea title="多选">
          <Selector
            options={ItemList}
            defaultValue={['2', '3']}
            multiple
            onChange={(arr, extend) => console.log(arr, extend.items)}
          />
        </BlockArea>

        <BlockArea title="全局禁止">
          <Selector
            options={ItemList}
            defaultValue={['1']}
            disabled
            onChange={(arr) => console.log(arr)}
          />
        </BlockArea>

        <BlockArea title="固定两列">
          <Selector
            columns={2}
            options={ItemList}
            defaultValue={['2', '3']}
            multiple
            onChange={(arr) => console.log(arr)}
          />
        </BlockArea>

        <BlockArea title="固定三列">
          <Selector
            columns={3}
            options={ItemList}
            defaultValue={['2', '3']}
            multiple
            onChange={(arr) => console.log(arr)}
          />
        </BlockArea>

        <BlockArea title="避免取消选择">
          <RadioMode />
        </BlockArea>

        <BlockArea title="选项带描述">
          <Selector
            columns={2}
            options={[
              {
                label: '选项一',
                description: '描述信息',
                value: '1',
              },
              {
                label: '选项二',
                description: '描述信息',
                value: '2',
              },
            ]}
            defaultValue={['1']}
          />
        </BlockArea>

        <BlockArea title="自定义样式（通过 style）">
          <Selector
            style={{ '--checked-color': '#ffe2e5' }}
            options={ItemList}
            defaultValue={['1', '2']}
            multiple
          />
        </BlockArea>

        <BlockArea title="自定义样式（通过 className）">
          <Selector
            className="my-selector"
            options={ItemList}
            defaultValue={['1', '2']}
            multiple
          />
        </BlockArea>
      </View>
    );
  }
}

import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isFunction,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, Line } from 'taro-fast-component';

import { fieldDataFlow } from '../../../customConfig';

const commonBoxStyle = {
  backgroundColor: '#fff',
  // borderWidth: transformSize(1),
  // borderRadius: transformSize(16),
  overflow: 'hidden',
  paddingTop: transformSize(12),
  paddingLeft: transformSize(16),
  paddingRight: transformSize(16),
  paddingBottom: transformSize(18),
  marginBottom: transformSize(10),
};

const createApproveItemBoxStyle = {
  ...commonBoxStyle,
};

const titleStyle = {
  color: '#181818',
  fontSize: transformSize(32),
  lineHeight: transformSize(46),
  fontWeight: 'bold',
  paddingTop: transformSize(12),
  paddingBottom: transformSize(12),
};

const descriptionStyle = {
  color: '#7e7e7e',
  fontSize: transformSize(30),
  lineHeight: transformSize(42),
  paddingBottom: transformSize(10),
};

export function buildWorkflowItem({ key, data, onClick }) {
  const name = getValueByKey({
    data: data,
    key: fieldDataFlow.name.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldDataFlow.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  return (
    <View key={key} style={createApproveItemBoxStyle}>
      <View style={titleStyle}>{name}</View>

      <Line transparent height={10} />

      <Line color="#eee" height={2} />

      <Line transparent height={20} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View style={descriptionStyle}>{description}</View>

          <Line transparent height={10} />
        </>
      )}

      <Button
        text="发起审批"
        fontColor="#fff"
        backgroundColor="#0075ff"
        fontSize={34}
        block
        circle
        size="middle"
        onClick={(event) => {
          if (!isFunction(onClick)) {
            return;
          }

          onClick(event);
        }}
      />
    </View>
  );
}

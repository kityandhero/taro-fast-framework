import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common';
import { CenterBox, TranslucentBox } from 'taro-fast-component';

export const boxStyle = {
  height: transformSize(220),
  backgroundImage: 'var(--tfc-color-gradual-red)',
  borderRadius: transformSize(10),
};

export function InnerTranslucentBox() {
  return (
    <View
      style={boxStyle}
      onClick={() => {
        console.log('click');
      }}
    >
      <CenterBox>
        <TranslucentBox
          style={{
            width: transformSize(200),
          }}
          backgroundColor="#000"
          alpha={0.1}
        >
          <CenterBox
            style={{
              padding: `${transformSize(10)} ${transformSize(20)}`,
              color: '#fff',
            }}
          >
            内容
          </CenterBox>
        </TranslucentBox>
      </CenterBox>
    </View>
  );
}

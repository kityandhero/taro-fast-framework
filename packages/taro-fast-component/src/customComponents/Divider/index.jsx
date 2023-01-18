import { attachPropertiesToComponent } from 'easy-soft-utility';
import { Text } from '@tarojs/components';

import { Space } from '../Space';

import Divider from './divider';

import './index.less';

export function buildDivider({
  contentPosition = 'center',
  style: styleSource = {},
  icon = null,
  text = '',
}) {
  return (
    <Divider contentPosition={contentPosition} style={styleSource}>
      {icon || text ? (
        <Space>
          {icon}
          <Text userSelect>{text}</Text>
        </Space>
      ) : null}
    </Divider>
  );
}

export default attachPropertiesToComponent(Divider, { buildDivider });

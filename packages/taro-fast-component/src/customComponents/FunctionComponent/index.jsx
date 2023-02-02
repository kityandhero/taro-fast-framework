import { Text } from '@tarojs/components';

import { Divider } from '../Divider';
import { Space } from '../Space';

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

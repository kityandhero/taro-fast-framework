import { transformSize } from 'taro-fast-common/es/utils/tools';

export const colStyle = {
  textAlign: 'center',
  backgroundColor: '#0092ffbf',
};

export const cardHeaderStyle = {
  backgroundColor: '#f5f7fa',
  color: '--tfc-color-black',
};

export const cardStyle = {
  borderLeft: `${transformSize(1)} solid var(--tfc-border-color)`,
  borderRight: `${transformSize(1)} solid var(--tfc-border-color)`,
};

export const shareTransfer = {
  home: '0',
  section: '10',
  webPage: '100',
};

import { mergeProps } from 'taro-fast-common/es/utils/tools';

import { defaultProps } from './config';
import Icon from './icon';

export function buildIcon(p, value) {
  const props = mergeProps(defaultProps, p, {
    value: value,
  });

  return <Icon {...props} />;
}

export const IconAdd = (p) => {
  return buildIcon(p, 'add');
};

export const IconAddCircle = (p) => {
  return buildIcon(p, 'add-circle');
};

export const IconSubtract = (p) => {
  return buildIcon(p, 'subtract');
};

export const IconSubtractCircle = (p) => {
  return buildIcon(p, 'subtract-circle');
};

export const IconAlignCenter = (p) => {
  return buildIcon(p, 'align-center');
};

export const IconAlignLeft = (p) => {
  return buildIcon(p, 'align-left');
};

export const IconAlignRight = (p) => {
  return buildIcon(p, 'align-right');
};

export const IconArrowDown = (p) => {
  return buildIcon(p, 'arrow-down');
};

export const IconArrowUp = (p) => {
  return buildIcon(p, 'arrow-up');
};

export const IconBell = (p) => {
  return buildIcon(p, 'bell');
};

export const IconBlocked = (p) => {
  return buildIcon(p, 'blocked');
};

export const IconBookmark = (p) => {
  return buildIcon(p, 'bookmark');
};

export const IconBulletList = (p) => {
  return buildIcon(p, 'bullet-list');
};

export const IconCalendar = (p) => {
  return buildIcon(p, 'calendar');
};

export const IconCamera = (p) => {
  return buildIcon(p, 'camera');
};

export const IconCheckCircle = (p) => {
  return buildIcon(p, 'check-circle');
};

export const IconChevronDown = (p) => {
  return buildIcon(p, 'chevron-down');
};

export const IconChevronLeft = (p) => {
  return buildIcon(p, 'chevron-left');
};

export const IconChevronRight = (p) => {
  return buildIcon(p, 'chevron-right');
};

export const IconChevronUp = (p) => {
  return buildIcon(p, 'chevron-up');
};

export const IconClock = (p) => {
  return buildIcon(p, 'clock');
};

export const IconCloseCircle = (p) => {
  return buildIcon(p, 'close-circle');
};

export const IconClose = (p) => {
  return buildIcon(p, 'close');
};

export const IconCreditCard = (p) => {
  return buildIcon(p, 'credit-card');
};

export const IconDownloadCloud = (p) => {
  return buildIcon(p, 'download-cloud');
};

export const IconDownload = (p) => {
  return buildIcon(p, 'download');
};

export const IconEdit = (p) => {
  return buildIcon(p, 'edit');
};

export const IconEqualizer = (p) => {
  return buildIcon(p, 'equalizer');
};

export const IconExternalLink = (p) => {
  return buildIcon(p, 'external-link');
};

export const IconEye = (p) => {
  return buildIcon(p, 'eye');
};

export const IconFileAudio = (p) => {
  return buildIcon(p, 'file-audio');
};

export const IconFileCode = (p) => {
  return buildIcon(p, 'file-code');
};

export const IconFileGeneric = (p) => {
  return buildIcon(p, 'file-generic');
};

export const IconFileJpg = (p) => {
  return buildIcon(p, 'file-jpg');
};

export const IconFileNew = (p) => {
  return buildIcon(p, 'file-new');
};

export const IconFilePng = (p) => {
  return buildIcon(p, 'file-png');
};

export const IconFileSvg = (p) => {
  return buildIcon(p, 'file-svg');
};

export const IconFileVideo = (p) => {
  return buildIcon(p, 'file-video');
};

export const IconFilter = (p) => {
  return buildIcon(p, 'filter');
};

export const IconFolder = (p) => {
  return buildIcon(p, 'folder');
};

export const IconFontColor = (p) => {
  return buildIcon(p, 'font-color');
};

export const IconHeart = (p) => {
  return buildIcon(p, 'heart');
};

export const IconHelp = (p) => {
  return buildIcon(p, 'help');
};

export const IconHome = (p) => {
  return buildIcon(p, 'home');
};

export const IconImage = (p) => {
  return buildIcon(p, 'image');
};

export const IconIphoneX = (p) => {
  return buildIcon(p, 'iphone-x');
};

export const IconIphone = (p) => {
  return buildIcon(p, 'iphone');
};

export const IconLightningBolt = (p) => {
  return buildIcon(p, 'lightning-bolt');
};

export const IconLink = (p) => {
  return buildIcon(p, 'link');
};

export const IconList = (p) => {
  return buildIcon(p, 'list');
};

export const IconLock = (p) => {
  return buildIcon(p, 'lock');
};

export const IconMail = (p) => {
  return buildIcon(p, 'mail');
};

export const IconMapPin = (p) => {
  return buildIcon(p, 'map-pin');
};

export const IconMenu = (p) => {
  return buildIcon(p, 'menu');
};

export const IconMessage = (p) => {
  return buildIcon(p, 'message');
};

export const IconMoney = (p) => {
  return buildIcon(p, 'money');
};

export const IconNext = (p) => {
  return buildIcon(p, 'next');
};

export const IconNumberedList = (p) => {
  return buildIcon(p, 'numbered-list');
};

export const IconPause = (p) => {
  return buildIcon(p, 'pause');
};

export const IconPhone = (p) => {
  return buildIcon(p, 'phone');
};

export const IconPlay = (p) => {
  return buildIcon(p, 'play');
};

export const IconPlaylist = (p) => {
  return buildIcon(p, 'playlist');
};

export const IconPrev = (p) => {
  return buildIcon(p, 'prev');
};

export const IconReload = (p) => {
  return buildIcon(p, 'reload');
};

export const IconRepeatPlay = (p) => {
  return buildIcon(p, 'repeat-play');
};

export const IconSearch = (p) => {
  return buildIcon(p, 'search');
};

export const IconSettings = (p) => {
  return buildIcon(p, 'settings');
};

export const IconShare2 = (p) => {
  return buildIcon(p, 'share-2');
};

export const IconShare = (p) => {
  return buildIcon(p, 'share');
};

export const IconShoppingBag2 = (p) => {
  return buildIcon(p, 'shopping-bag-2');
};

export const IconShoppingBag = (p) => {
  return buildIcon(p, 'shopping-bag');
};

export const IconShoppingCart = (p) => {
  return buildIcon(p, 'shopping-cart');
};

export const IconShufflePlay = (p) => {
  return buildIcon(p, 'shuffle-play');
};

export const IconSketch = (p) => {
  return buildIcon(p, 'sketch');
};

export const IconSound = (p) => {
  return buildIcon(p, 'sound');
};

export const IconStar = (p) => {
  return buildIcon(p, 'star');
};

export const IconStop = (p) => {
  return buildIcon(p, 'stop');
};

export const IconStreaming = (p) => {
  return buildIcon(p, 'streaming');
};

export const IconTag = (p) => {
  return buildIcon(p, 'tag');
};

export const IconTags = (p) => {
  return buildIcon(p, 'tags');
};

export const IconTextItalic = (p) => {
  return buildIcon(p, 'text-italic');
};

export const IconTextStrikethrough = (p) => {
  return buildIcon(p, 'text-strikethrough');
};

export const IconTextUnderline = (p) => {
  return buildIcon(p, 'text-underline');
};

export const IconTrash = (p) => {
  return buildIcon(p, 'trash');
};

export const IconUpload = (p) => {
  return buildIcon(p, 'upload');
};

export const IconUser = (p) => {
  return buildIcon(p, 'user');
};

export const IconVideo = (p) => {
  return buildIcon(p, 'video');
};

export const IconVolumeMinus = (p) => {
  return buildIcon(p, 'volume-minus');
};

export const IconVolumeOff = (p) => {
  return buildIcon(p, 'volume-off');
};

export const IconVolumePlus = (p) => {
  return buildIcon(p, 'volume-plus');
};

export const IconAnalytics = (p) => {
  return buildIcon(p, 'analytics');
};

export const IconStar2 = (p) => {
  return buildIcon(p, 'star-2');
};

export const IconCheck = (p) => {
  return buildIcon(p, 'check');
};

export const IconHeart2 = (p) => {
  return buildIcon(p, 'heart-2');
};

export const IconLoading = (p) => {
  return buildIcon(p, 'loading');
};

export const IconLoading2 = (p) => {
  return buildIcon(p, 'loading-2');
};

export const IconLoading3 = (p) => {
  return buildIcon(p, 'loading-3');
};

export const IconAlertCircle = (p) => {
  return buildIcon(p, 'alert-circle');
};

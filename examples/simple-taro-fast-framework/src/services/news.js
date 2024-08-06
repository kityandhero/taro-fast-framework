import {
  datetimeFormat,
  formatDatetime,
  getNow,
  request,
  requestMode,
} from 'easy-soft-utility';

const galleryItem = {
  galleryId: '1',
  url: '',
  title: '横幅',
  type: 0,
  platformId: '1',
  imageUrl: '',
  key: '',
  image: '',
  extra: {},
};

const navItem = {
  image: '',
  value: '1',
  type: 'page',
  show: 1,
  open: 1,
  path: '',
};

const sectionItem = {
  sectionId: '',
  name: '',
  image: '',
  rectangleImage: '',
  description: '',
  platformId: '1',
  key: '',
  config: {
    renderMode: '',
  },
};

const articleItem = {
  articleId: '',
  title: '',
  subtitle: '',
  description: '',
  image: '',
  rectangleImage: '',
  video: '',
  audio: '',
  attachment: '',
  renderType: 20,
  sort: 0,
  accessCount: 0,
  createTime: '',
  platformId: '',
  key: '',
  renderTypeNote: '媒体渲染',
};

function createEmptyList(size) {
  const list = [];

  if (size > 0) {
    for (let index = 0; index < size; index++) {
      list.push({});
    }
  }

  return list;
}

export async function getOverviewData(parameters) {
  return request({
    api: `/news/integration/overview`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {
        galleryList: createEmptyList(4).map((o, index) => {
          const no = `gallery_item_${index + 1}`;

          return {
            ...galleryItem,

            galleryId: no,
            key: no,
            title: galleryItem.title + no,
          };
        }),
        navList: createEmptyList(8).map((o, index) => {
          const no = `nav_item_${index + 1}`;

          return {
            ...navItem,

            id: no,
            key: no,
            value: `导航${index + 1}`,
          };
        }),
        sectionList: createEmptyList(6).map((o, index_) => {
          const sectionNo = `section_item_${index_ + 1}`;

          return {
            ...sectionItem,

            sectionId: sectionNo,
            key: sectionNo,
            name: `栏目${index_ + 1}`,
            description: `栏目${index_ + 1}简介描述`,
            config: {
              renderMode: `${index_ + 1}`,
            },
            articles: createEmptyList(4).map((one, index) => {
              const no = `${sectionNo}_article_item_${index + 1}`;

              return {
                ...articleItem,

                id: no,
                key: no,
                title: `栏目${index_ + 1}文章${
                  index + 1
                }的标题标题标题标题标题标题标题标题`,
                description: `栏目${index_ + 1}文章${
                  index + 1
                }简介描述简介描述简介描述简介描述简介描述`,
                createTime: formatDatetime({
                  data: getNow(),
                  fmt: datetimeFormat.yearMonthDayHourMinuteSecond,
                }),
              };
            }),
          };
        }),
      },
    },
  });
}

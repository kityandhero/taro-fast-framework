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
    for (let i = 0; i < size; i++) {
      list.push({});
    }
  }

  return list;
}

export async function getOverviewData(params) {
  return request({
    api: `/news/integration/overview`,
    params,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {
        galleryList: createEmptyList(4).map((o, index) => {
          const no = `gallery_item_${index + 1}`;

          return {
            ...galleryItem,
            ...{
              galleryId: no,
              key: no,
              title: galleryItem.title + no,
            },
          };
        }),
        navList: createEmptyList(8).map((o, index) => {
          const no = `nav_item_${index + 1}`;

          return {
            ...navItem,
            ...{
              id: no,
              key: no,
              value: `导航${index + 1}`,
            },
          };
        }),
        sectionList: createEmptyList(6).map((o, i) => {
          const sectionNo = `section_item_${i + 1}`;

          return {
            ...sectionItem,
            ...{
              sectionId: sectionNo,
              key: sectionNo,
              name: `栏目${i + 1}`,
              description: `栏目${i + 1}简介描述`,
              config: {
                renderMode: `${i + 1}`,
              },
              articles: createEmptyList(4).map((one, index) => {
                const no = `${sectionNo}_article_item_${index + 1}`;

                return {
                  ...articleItem,
                  ...{
                    id: no,
                    key: no,
                    title: `栏目${i + 1}文章${
                      index + 1
                    }的标题标题标题标题标题标题标题标题`,
                    description: `栏目${i + 1}文章${
                      index + 1
                    }简介描述简介描述简介描述简介描述简介描述`,
                    createTime: formatDatetime({
                      data: getNow(),
                      fmt: datetimeFormat.yearMonthDayHourMinuteSecond,
                    }),
                  },
                };
              }),
            },
          };
        }),
      },
    },
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}

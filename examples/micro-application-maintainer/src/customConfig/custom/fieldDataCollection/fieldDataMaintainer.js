import { formNameCollection } from '../../general';

const fieldExtraData = {
  friendlyName: {
    label: '友好名称',
    name: 'friendlyName',
    helper: '',
  },
  departmentId: {
    label: '部门标识',
    name: 'departmentId',
    helper: '',
  },
  passwordVerify: {
    label: '校验密码',
    name: 'passwordVerify',
    helper: '',
  },
  signetPasswordVerify: {
    label: '校验密码',
    name: 'signetPasswordVerify',
    helper: '',
  },
  subsidiaryId: {
    label: '所属公司标识',
    name: 'subsidiaryId',
    helper: '所属的公司',
  },
  subsidiaryInfo: {
    label: '所属公司',
    name: 'subsidiaryInfo',
    helper: '',
  },
  ascription: {
    label: '归属',
    name: 'ascription',
    helper: '',
  },
};

export const fieldDataMaintainer = {
  ...formNameCollection,
  maintainerId: {
    label: '维修员标识',
    name: 'maintainerId',
    helper: '',
  },
  loginName: {
    label: '登录账户',
    name: 'loginName',
    helper: '',
  },
  password: {
    label: '登录密码',
    name: 'password',
    helper: '',
  },
  nickname: {
    label: '用户昵称',
    name: 'nickname',
    helper: '',
  },
  realName: {
    label: '真实姓名',
    name: 'realName',
    helper: '',
  },
  phone: {
    label: '联系电话',
    name: 'phone',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  position: {
    label: '职务',
    name: 'position',
    helper: '',
  },
  dateRange: {
    label: '注册时段',
    name: 'dateRange',
    helper: '',
  },
  parentId: {
    label: '用户上级标识',
    name: 'parentId',
    helper: '',
  },
  parentHeadImgUrl: {
    label: '上级头像',
    name: 'parentHeadImgUrl',
    helper: '',
  },
  noId: {
    label: '身份证号',
    name: 'noId',
    helper: '',
  },
  headPortraits: {
    label: '头像信息',
    name: 'headPortraits',
    helper: '',
  },
  email: {
    label: '邮箱账户',
    name: 'email',
    helper: '',
  },
  birthday: {
    label: '生日日期',
    name: 'birthday',
    helper: '',
  },
  gender: {
    label: '性别',
    name: 'gender',
    helper: '',
  },
  identityNumber: {
    label: '身份证号',
    name: 'identityNumber',
    helper: '',
  },
  countryName: {
    label: '国家',
    name: 'countryName',
    helper: '',
  },
  provinceCode: {
    label: '省份',
    name: 'provinceCode',
    helper: '',
  },
  provinceName: {
    label: '省份',
    name: 'provinceName',
    helper: '',
  },
  cityCode: {
    label: '城市',
    name: 'cityCode',
    helper: '',
  },
  cityName: {
    label: '城市',
    name: 'cityName',
    helper: '',
  },
  districtCode: {
    label: '区县',
    name: 'districtCode',
    helper: '',
  },
  districtName: {
    label: '区县',
    name: 'districtName',
    helper: '',
  },
  address: {
    label: '详细地址',
    name: 'address',
    helper: '',
  },
  parentNickname: {
    label: '父级用户昵称',
    name: 'parentNickname',
    helper: '',
  },
  parentRealName: {
    label: '父级用户姓名',
    name: 'parentRealName',
    helper: '',
  },
  integral: {
    label: '积分',
    name: 'integral',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '用户类型',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '用户类型',
  },
  customRefererName: {
    label: '自填推荐人',
    name: 'customRefererName',
    helper: '申请时自主填写的推荐人姓名，作为管理参考',
  },
  signet: {
    label: '印章',
    name: 'signet',
    helper: '',
  },
  signetPassword: {
    label: '印章密码',
    name: 'signetPassword',
    helper: '',
  },
  signetPasswordSwitch: {
    label: '印章密码开关',
    name: 'signetPasswordSwitch',
    helper: '',
  },
  signetPasswordSwitchNote: {
    label: '印章密码开关',
    name: 'signetPasswordSwitch',
    helper: '',
  },
  signetPasswordNeedSet: {
    label: '签章密码状态',
    name: 'signetPasswordNeedSet',
    helper: '',
  },
  authorityCollection: {
    label: '拥有角色',
    name: 'authorityCollection',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};

import { formNameCollection } from './fieldDataCommon';

const formExtraData = {
  duplicateName: {
    label: '副本名称',
    name: 'duplicateName',
    helper: '',
  },
  workflowNodeList: {
    label: '节点信息',
    name: 'workflowNodeList',
    helper: '',
  },
  workflowLineList: {
    label: '线条信息',
    name: 'workflowLineList',
    helper: '',
  },
  applicantSignSwitchNote: {
    label: '申请人签名开关',
    name: 'applicantSignSwitchNote',
    helper: '',
  },
  attentionSignSwitchNote: {
    label: '经办人签名开关',
    name: 'attentionSignSwitchNote',
    helper: '',
  },
  defaultAttentionUserRealName: {
    label: '默认经办人',
    name: 'defaultAttentionUserRealName',
    helper: '',
  },
  defaultAttentionUserSignet: {
    label: '默认经办人签章',
    name: 'defaultAttentionUserSignet',
    helper: '',
  },
};

export const fieldDataFlow = {
  ...formNameCollection,
  workflowId: {
    label: '数据标识',
    name: 'workflowId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  caseNameTemplate: {
    label: '实例名模版 ',
    name: 'caseNameTemplate',
    helper: '设置实例名模板, 示例: {flowName} 事由{reason}',
  },
  smsTemplate: {
    label: '短信通知模版 ',
    name: 'smsTemplate',
    helper: '设置短信通知模版, 示例: {flowName} 事由{reason}',
  },
  applicantSignSwitch: {
    label: '申请人签名开关',
    name: 'applicantSignSwitch',
    helper: '',
  },
  defaultApplicantStatementTitle: {
    label: '默认文档申请陈述标题',
    name: 'defaultApplicantStatementTitle',
    helper: '',
  },
  defaultApplicantStatementContent: {
    label: '默认文档申请陈述内容',
    name: 'defaultApplicantStatementContent',
    helper: '',
  },
  attentionSignSwitch: {
    label: '经办人签名开关',
    name: 'attentionSignSwitch',
    helper: '',
  },
  defaultAttentionUserId: {
    label: '默认经办人',
    name: 'defaultAttentionUserId',
    helper: '',
  },
  defaultAttentionStatementTitle: {
    label: '默认文档经办陈述标题',
    name: 'defaultAttentionStatementTitle',
    helper: '',
  },
  defaultAttentionStatementContent: {
    label: '默认文档经办陈述内容',
    name: 'defaultAttentionStatementContent',
    helper: '',
  },
  scope: {
    label: '应用范围',
    name: 'scope',
    helper: '应用范围',
  },
  scopeNote: {
    label: '应用范围',
    name: 'scopeNote',
    helper: '应用范围',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
  effectiveRange: {
    label: '生效范围',
    name: 'effectiveRange',
    helper: '',
  },
  effectiveRangeNote: {
    label: '生效范围',
    name: 'effectiveRangeNote',
    helper: '',
  },
  debugApproverMode: {
    label: '调试审批人模式',
    name: 'debugApproverMode',
    helper: '',
  },
  debugApproverModeNote: {
    label: '调试审批人模式',
    name: 'debugApproverModeNote',
    helper: '',
  },
  debugUserMode: {
    label: '调试发起人模式',
    name: 'debugUserMode',
    helper: '',
  },
  debugUserModeNote: {
    label: '调试发起人模式',
    name: 'debugUserModeNote',
    helper: '',
  },
  debugUserId: {
    label: '调试发起人标识',
    name: 'debugUserId',
    helper: '',
  },
  debugUserRealName: {
    label: '调试发起人名称',
    name: 'debugUserRealName',
    helper: '',
  },
  globalDebugUserId: {
    label: '全局调试人标识',
    name: 'globalDebugUserId',
    helper: '',
  },
  globalDebugUserRealName: {
    label: '全局调试人名称',
    name: 'globalDebugUserRealName',
    helper: '',
  },
  whetherAllowMultibranch: {
    label: '允许多路分支',
    name: 'whetherAllowMultibranch',
    helper: '',
  },
  whetherAllowMultibranchNote: {
    label: '是否允许多路分支',
    name: 'whetherAllowMultibranchNote',
    helper: '',
  },
  whetherAllowMultiEnd: {
    label: '是否允许多个终点',
    name: 'whetherAllowMultiEnd',
    helper: '',
  },
  whetherAllowMultiEndNote: {
    label: '是否允许多个终点',
    name: 'whetherAllowMultiEndNote',
    helper: '',
  },
  creatorUserId: {
    label: '是否创建人用户标识',
    name: 'creatorUserId',
    helper: '',
  },
  creatorUserRealName: {
    label: '创建人姓名',
    name: 'creatorUserRealName',
    helper: '',
  },
  creatorUserNickname: {
    label: '创建人昵称',
    name: 'creatorUserNickname',
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
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...formExtraData,
};

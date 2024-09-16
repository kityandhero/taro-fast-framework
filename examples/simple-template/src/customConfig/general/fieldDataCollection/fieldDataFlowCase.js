import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  workflow: {
    label: '流程',
    name: 'workflow',
    helper: '',
  },
  userAvatar: {
    label: '发起人头像',
    name: 'userAvatar',
    helper: '',
  },
  userRealName: {
    label: '发起人',
    name: 'userRealName',
    helper: '',
  },
  userNickname: {
    label: '发起人昵称',
    name: 'userNickname',
    helper: '',
  },
  listFormStorage: {
    label: '表单数据列表',
    name: 'listFormStorage',
    helper: '',
  },
  listChainAll: {
    label: '所有过程链条集合',
    name: 'listChainAll',
    helper: '',
  },
  treeChainAll: {
    label: '所有过程链条树',
    name: 'treeChainAll',
    helper: '',
  },
  listChainApprove: {
    label: '所有审批链条集合',
    name: 'listChainApprove',
    helper: '',
  },
  treeChainApprove: {
    label: '所有审批链条树',
    name: 'treeChainApprove',
    helper: '',
  },
  canEdit: {
    label: '可编辑',
    name: 'canEdit',
    helper: '',
  },
  canApprove: {
    label: '可审核',
    name: 'canApprove',
    helper: '',
  },
  flowDebugApproverUserId: {
    label: '流程调试审批人标识',
    name: 'flowDebugApproverUserId',
    helper: '',
  },
  flowDebugApproverUserRealName: {
    label: '流程调试审批人姓名',
    name: 'flowDebugApproverUserRealName',
    helper: '',
  },
  flowDebugApproverUserNickname: {
    label: '流程调试审批人昵称',
    name: 'flowDebugApproverUserNickname',
    helper: '',
  },
  flowDebugApproverUserAvatar: {
    label: '流程调试审批人头像',
    name: 'flowDebugApproverUserAvatar',
    helper: '',
  },
  flowDebugApproverUserSignet: {
    label: '流程调试审批人签章',
    name: 'flowDebugApproverUserSignet',
    helper: '',
  },
  flowDebugUserId: {
    label: '流程调试发起人标识',
    name: 'flowDebugUserId',
    helper: '',
  },
  flowDebugUserRealName: {
    label: '流程调试发起人姓名',
    name: 'flowDebugUserRealName',
    helper: '',
  },
  flowDebugUserNickname: {
    label: '流程调试发起人昵称',
    name: 'flowDebugUserNickname',
    helper: '',
  },
  flowDebugUserAvatar: {
    label: '流程调试发起人头像',
    name: 'flowDebugUserAvatar',
    helper: '',
  },
  flowDebugUserSignet: {
    label: '流程调试发起人签章',
    name: 'flowDebugUserSignet',
    helper: '',
  },
  latestApproveWorkflowNode: {
    label: '最后审批节点',
    name: 'latestApproveWorkflowNode',
    helper: '',
  },
  latestApproveWorkflowNodeName: {
    label: '最后审批节点名称',
    name: 'latestApproveWorkflowNodeName',
    helper: '',
  },
  latestApproveUserId: {
    label: '最后审批用户标识',
    name: 'latestApproveUserId',
    helper: '',
  },
  latestApproveUserRealName: {
    label: '最后审批用户姓名',
    name: 'latestApproveUserRealName',
    helper: '',
  },
  latestApproveUserNickname: {
    label: '最后审批用户昵称',
    name: 'latestApproveUserNickname',
    helper: '',
  },
  nextApproveWorkflowNode: {
    label: '下一审批节点',
    name: 'latestApproveWorkflowNode',
    helper: '',
  },
  nextApproveWorkflowNodeId: {
    label: '下一审批节点标识',
    name: 'nextApproveWorkflowNodeId',
    helper: '',
  },
  nextApproveWorkflowNodeName: {
    label: '下一审批节点',
    name: 'nextApproveWorkflowNodeName',
    helper: '',
  },
  waitApproveUserId: {
    label: '待审批用户标识',
    name: 'waitApproveUserId',
    helper: '',
  },
  waitApproveUserRealName: {
    label: '待审批用户姓名',
    name: 'waitApproveUserRealName',
    helper: '',
  },
  waitApproveUserNickname: {
    label: '待审批用户昵称',
    name: 'waitApproveUserNickname',
    helper: '',
  },
  workflowChannel: {
    label: '流程通道',
    name: 'workflowChannel',
    helper: '',
  },
  workflowFormDesign: {
    label: '表单设计',
    name: 'workflowFormDesign',
    helper: '',
  },
  listProcessHistory: {
    label: '审批历史列表',
    name: 'listProcessHistory',
    helper: '',
  },
  listAttachment: {
    label: '附件列表',
    name: 'listAttachment',
    helper: '',
  },
  userSubsidiaries: {
    label: '发起人所属公司',
    name: 'userSubsidiaries',
    helper: '',
  },
  userDepartments: {
    label: '发起人所属部门',
    name: 'userDepartments',
    helper: '',
  },
  applicantSignSwitch: {
    label: '申请人签名开关',
    name: 'applicantSignSwitch',
    helper: '',
  },
  applicantSignSwitchNote: {
    label: '申请人签名开关',
    name: 'applicantSignSwitchNote',
    helper: '',
  },
  applicantUserSignet: {
    label: '申请人签章',
    name: 'applicantUserSignet',
    helper: '',
  },
  applicantTime: {
    label: '申请人时间',
    name: 'applicantTime',
    helper: '',
  },
  attentionSignSwitch: {
    label: '经办人签名开关',
    name: 'attentionSignSwitch',
    helper: '',
  },
  attentionSignSwitchNote: {
    label: '经办人签名开关',
    name: 'attentionSignSwitchNote',
    helper: '',
  },
  attentionUserRealName: {
    label: '经办人',
    name: 'attentionUserRealName',
    helper: '',
  },
  attentionUserSignet: {
    label: '经办人签章',
    name: 'attentionUserSignet',
    helper: '',
  },
  attentionTime: {
    label: '经办人时间',
    name: 'attentionTime',
    helper: '',
  },
};

export const fieldDataFlowCase = {
  ...formNameCollection,
  workflowId: {
    label: '流程设计标识',
    name: 'workflowId',
    helper: '',
  },
  title: {
    label: '实例标题',
    name: 'title',
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
  applicantStatementTitle: {
    label: '文档申请陈述标题',
    name: 'applicantStatementTitle',
    helper: '',
  },
  applicantStatementContent: {
    label: '文档申请陈述内容',
    name: 'applicantStatementContent',
    helper: '',
  },
  attentionUserId: {
    label: '经办人',
    name: 'attentionUserId',
    helper: '',
  },
  attentionStatementTitle: {
    label: '文档经办陈述标题',
    name: 'attentionStatementTitle',
    helper: '',
  },
  attentionStatementContent: {
    label: '文档经办陈述内容',
    name: 'attentionStatementContent',
    helper: '',
  },
  workflowName: {
    label: '流程名称',
    name: 'workflowName',
    helper: '',
  },
  userId: {
    label: '发起人',
    name: 'userId',
    helper: '',
  },
  cancelApproveSwitch: {
    label: '撤销审批开关',
    name: 'cancelApproveSwitch',
    helper: '',
  },
  cancelApproveSwitchNote: {
    label: '撤销审批开关',
    name: 'cancelApproveSwitchNote',
    helper: '',
  },
  resetAllApproveSwitch: {
    label: '重置审批开关',
    name: 'resetAllApproveSwitch',
    helper: '',
  },
  resetAllApproveSwitchNote: {
    label: '重置审批开关',
    name: 'resetAllApproveSwitchNote',
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
  lastSubmitApprovalTime: {
    label: '最后提交审批时间',
    name: 'lastSubmitApprovalTime',
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
  ...fieldExtraData,
};

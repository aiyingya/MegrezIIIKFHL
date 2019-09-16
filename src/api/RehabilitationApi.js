import {Loader} from 'winning-megreziii-utils';
import initiate_list from './mock/Rehabilitation/Initiate/initiate_list';
import in_hosp_apply from './mock/success';
import out_hosp_apply from './mock/success';
import look_hosp_apply from './mock/Rehabilitation/Initiate/look_hosp_apply';
import person_infos from './mock/Rehabilitation/Initiate/person_infos';
import file_upload from './mock/success';
import agent_list from './mock/Rehabilitation/Agent/initiate_list';
import search_tree from './mock/Rehabilitation/Search/search_tree';
import reject from  './mock/success';
import excel_export from './mock/success';

const api = {
    // 发起流程 - 列表
    initiate_list: '/KFHL/recoveryFlow/query',
    // 发起流程 - 入院申请 - 提交/保存
    in_hosp_apply: '/KFHL/inHospApply/add',
    // 发起流程 - 康复出院评估 - 提交/保存
    out_hosp_apply: '/KFHL/outHospApply/assess',
    // 发起流程/待办/查询 - 入院/出院 - 查看 //TODO 注意developde的时候这里要改名字
    look_hosp_apply: '/KFHL/recoveryFlow/queryBut',
    // 住院人员查询
    person_infos: '/KFHL/inHospApply/personInfo',
    // 文件上传
    file_upload: '/KFHL/inHospApply/upload',
    // 流程待办 - 列表
    agent_list: '/KFHL/flowComm/query',
    // 查询
    search_tree: '/KFHL/recovery/query',
    // 退回
    reject: '/KFHL/flow/back',
    // Excel导出
    excel_export: '/KFHL/recovery/export',
};

export default Loader.batchExport(
    api,
    [initiate_list,in_hosp_apply,out_hosp_apply,look_hosp_apply,person_infos,file_upload,agent_list,search_tree,reject,excel_export]
);

import {Loader} from 'winning-megreziii-utils';
import initiate_list from './mock/Nursing/Initiate/initiate_list';
import in_hosp_assess from './mock/success';
import stage_assessment from './mock/success';
import out_hosp_record from './mock/success';
import nurse_month from './mock/Nursing/Initiate/nurse_month';
import person_infos from './mock/Rehabilitation/Initiate/person_infos';
import agent_list from './mock/Nursing/Agent/initiate_list';
import search_tree from './mock/Nursing/Search/search_tree';
import look from  './mock/success';
import file_upload from './mock/success';
import excel_export from './mock/success';

const api = {
    // 发起流程 - 列表
    initiate_list: '/KFHL/nurseFlow/query',
    // 发起流程 - 护理入院评估 - 提交/保存
    in_hosp_assess: '/nurse/inHosp',
    // 发起流程 - 护理阶段评估表 - 提交/保存
    stage_assessment: '/KFHL/nurse/stageAssess',
    // 发起流程 - 出院记录 - 提交/保存
    out_hosp_record: '/KFHL/nurse/outHosp',
    // 发起流程 - 获取阶段护理月份 - 列表
    nurse_month: '/KFHL/nurse/getNurseMonth',
    // 住院人员查询
    person_infos: '/KFHL/inHospApply/personInfo',
    // 流程待办 - 列表
    agent_list: '/KFHL/nurseFlow/commQuery',
    // 查询 -列表
    search_tree: '/KFHL/nurse/query',
    // 发起流程/待办/查询 - 查看
    look: '/KFHL/nurse/queryBut',
    // 文件上传
    file_upload: '/KFHL/inHospApply/upload',
    // Excel导出
    excel_export: '/KFHL/nurse/export',
};
// 退回？？？

export default Loader.batchExport(
    api,
    [initiate_list,in_hosp_assess,stage_assessment,out_hosp_record,nurse_month,person_infos,agent_list,search_tree,look,file_upload,excel_export]
);

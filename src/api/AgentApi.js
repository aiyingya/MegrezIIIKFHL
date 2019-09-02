import {Loader} from 'winning-megreziii-utils';
import agent_list from './mock/Rehabilitation/Agent/initiate_list';
import look_hosp_apply from './mock/Rehabilitation/Agent/look_hosp_apply';

const api = {
    // 流程待办 - 列表
    agent_list: '/KFHL/flowComm/query',
    // 流程待办 - 入院/出院 - 查看
    look_hosp_apply: '/KFHL/recoveryFlow/queryBut',
};

export default Loader.batchExport(
    api,
    [agent_list,look_hosp_apply]
);

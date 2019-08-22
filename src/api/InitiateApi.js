import {Loader} from 'winning-megreziii-utils';
import initiate_list from './mock/Rehabilitation/Initiate/initiate_list';
import queryBut from './mock/UserCentre/logout';

const api = {
    initiate_list: '/recoveryFlow/query',
    queryBut: '/recoveryFlow/queryBut'
};

export default Loader.batchExport(
    api,
    [initiate_list,queryBut]
);

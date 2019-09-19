import {handleActions} from 'redux-actions';
import types from "./ActionTypes";

let initialState = {
    loading: false,
    typeDatas: [],
    datas: [],
    pagination: {
        current: 1,
        pageSize:10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总共${total}条 显示${range[0]}-${range[1]}条`,
        total: 0,
        size: 'small'
    },
    formItems:{},
    btnRequestLoading:false,
    btnRequest:true,
    staticStatus:{
        flowStatus:[],//流程状态
        flowType:[], //流程类型
        node:[]
    },
    tempSearchObj:{},
    // 查看康复入院申请
    pageTempObj:{
        // 显示哪个tab页
        tabValue:'0',
        // 显示哪些数据
        record:{},
        // 诊断依据的上端依据['0', "1",'2', "3", "4"]
        checkedOutsideList:[],
        // 诊断依据的下端骨科组选择依据
        checkedGroupList:[],
        // 诊断依据的下端骨科组选择依据 全选设置,默认不全选
        indeterminate:false,
        // 诊断依据的下端骨科组选择依据 是否显示全选
        checkAll:false,
        // 是否显示退回Modal
        showRejectModal:false,
        // 退回节点的名称集合
        rejectTxts:[],
        // 在院人员模糊用户信息列表
        personUserList:[],
    },
    // 康复出院申请
    pageTempObjCY:{
        // 显示哪个tab页
        tabValue:'1',
        // 显示哪些数据
        record:{},
        // 在院人员模糊用户信息列表
        personUserList:[],
        // 上传的评估文件
        uploadBergFiles:[],
        // 是否显示退回Modal
        showRejectModal:false,
        // 退回节点的名称集合
        rejectTxts:[]
    }
};

const actions={};

actions[types.LOADINGSTART]=(state,action)=>({...state,loading:true});
actions[types.LOADINGEND]=(state,action)=>({...state,loading:false});
actions[types.SEARCH]=(state, action) => ({...state,
    datas:action.payload.datas,
    pagination:{
        ...state.pagination,
        current: action.payload.pageIndex,
        total: action.payload.total,
        pageSize: action.payload.pageSize,
        onChange:action.payload.onChange,
        onShowSizeChange:action.payload.onChange,
    }
});
actions[types.SET_DATAS]=(state, action) => ({...state,
    datas:action.payload
});
actions[types.GETFORMITEMS]=(state,action)=>({...state,formItems:action.payload || {}});
actions[types.setSearchObj]=(state,action)=>({...state,searchObj:action.payload || {}});
actions[types.SET_BTN_LOADING_ACTIVE]=(state)=>({...state,btnRequestLoading:true});
actions[types.SET_BTN_DLOADING_DISPLAY]=(state)=>({...state,btnRequestLoading:false});
actions[types.BTN_REQUEST_ACTIVE]=(state)=>({...state,btnRequest:true});
actions[types.BTN_REQUEST_DISPLAY]=(state)=>({...state,btnRequest:false});
actions[types.SET_TYPE_DATAS]=(state,action)=>({...state,typeDatas:action.payload || []});
actions[types.SET_STATIC_STATUS]=(state,action)=>({...state,staticStatus:action.payload || {}});
actions[types.SET_TEMP_SEARCH_OBJ]=(state,action)=>({...state,tempSearchObj:action.payload || {}});
actions[types.PAGE_TEMP_OBJ]=(state,action)=>({...state,pageTempObj:action.payload || {}});
actions[types.PAGE_TEMP_OBJ_CY]=(state,action)=>({...state,pageTempObjCY:action.payload || {}});

export const reducer = handleActions(actions, initialState);

import {handleActions} from 'redux-actions';
import types from "./ActionTypes";

let initialState = {
    loading: false,
    typeDatas: [],
    datas: [],
    pagination: {
        current: 10,
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
        node:[], // 所有的字典数据
        dict:{}
    },
    tempSearchObj:{},
    //
    pageTempObj:{
        // 显示哪个tab页
        tabValue:'0',
        // 显示哪些数据
        record:{},
        // 诊断依据的上端依据['0','1', '2', '3', '4']
        checkedOutsideList:[],
        // 诊断依据的下端骨科组选择依据 ['6', '7','8', '9', '10']
        checkedGroupList:[],
        // 诊断依据的下端骨科组选择依据 全选设置,默认不全选
        indeterminate:false,
        // 诊断依据的下端骨科组选择依据 是否显示全选['5']
        checkAll:false,
        // 平很量表中的总分数
        sumScore:"",
        // 上传的申请文件
        uploadApplyFiles:[],
        // 上传的评估文件
        uploadBergFiles:[],
        // 是否可以编辑页面
        canEdit:true,

    },
    //护理出院记录
    pageTempObjDischarge:{
        // 上传的出院文件
        outHopsFiles:[],
        // 上传的用药文件
        pharmacyFiles:[],
    },
    // 护理阶段性评估
    pageTempObjStag:{
        // 显示哪些数据
        record:{},
        // 评估月份
        monthList:[],
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
actions[types.PAGE_TEMP_OBJ_STAG]=(state,action)=>({...state,pageTempObjStag:action.payload || {}});
actions[types.PAGE_TEMP_OBJ_DISCHARGE]=(state,action)=>({...state,pageTempObjDischarge:action.payload || {}});

export const reducer = handleActions(actions, initialState);

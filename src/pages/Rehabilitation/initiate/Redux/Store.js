import { createStore } from 'redux';
import {reducer} from './Reducer';
import moment from 'moment';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj,setStaticStatus, setTempSearchObj,setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas
} from './Actions';
import api from "@/api/InitiateApi";
import {Global,Uc} from 'winning-megreziii-utils';
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initiate:{
            initTable:async (_this,{value ={},page = 1,pageSize =10,isFrozenPaging = false}={}) => {
                //初始化分页Table
                // When：进入页面/点击查询
                dispatch(loadingStart());
                // 是否冰冻页面来初始化当前展示哪一页
                if (isFrozenPaging) {
                    page =_this.props.state.pagination.current;
                    pageSize = _this.props.state.pagination.pageSize;
                    value =_this.props.state.searchObj;
                }

                // 查询条件
                let searchObj = {...value,pageIndex:page,pageSize};
                // 查询数据
                let result = await api.initiate_list(searchObj);

                Global.alert(result,{
                    successFun:()=>{
                        // 显示模块树-基础服务这里是平级的
                        // let tree = Global.changeDatasToTree({dataList:result.datas,id:'mk_id',parentId:'sj_mk_id'})
                        // result.datas = tree
                        result.onChange = (_page, _pageSize)=>{
                            // 绑定分页按钮点击事件
                            _this.props.dict.initTable(_this,{value:_this.props.state.searchObj,page:_page, pageSize:_pageSize})

                        }
                        // 写入查询条件，在上方[看上方代码]分页点击时传入查询条件_this.props.state.searchObj
                        dispatch(setSearchObj(searchObj));
                        // 写入Table数据
                        dispatch(search(result));
                    },
                    isSuccessAlert:false
                })
                dispatch(loadingEnd());
                return result;
            },
            initSearch:async (searchVal)=>{
                let toData = moment();
                let dateFormat = "YYYY/MM/DD";
                let fromData = moment().subtract(3, "months");
                let _flowStatus =await Uc.getDictKey("dict_flowStatus");
                let _flowType =await Uc.getDictKey("dict_flowType");
                let _node =await Uc.getDictKey("dict_node");
                // 初始化查询条件
                let forms = [
                    {labelName: '标题', formType: Global.SelectEnum.INPUT, name: 'title'},
                    {labelName: '患者', formType: Global.SelectEnum.INPUT, name: 'personName'},
                    {labelName: '发起人', formType: Global.SelectEnum.INPUT, name: 'initPerson'},
                    {labelName: '发起时间', formType: Global.SelectEnum.RangePickerSplit, name: 'dataTimes', dateFormat:dateFormat,outName:['initDateTo','initDateFrom'],outFormat:'YYYY-MM-DD',
                        initialValue:[moment(fromData,dateFormat), moment(toData,dateFormat)]},
                    {labelName: '流程状态', formType: Global.SelectEnum.SELECT, name: 'flowStatus', children: _flowStatus},
                    {labelName: '流程类型', formType: Global.SelectEnum.SELECT, name: 'flowType', children: _flowType},

                ]
                // 写入查询初始值
                if (searchVal) {
                    forms = Global.setFormsValue(forms,searchVal);
                }
                // 写入查询Form，用于显示查询组件内容
                dispatch(getFormItems(forms));
                // 显示信息时使用
                dispatch(setStaticStatus({flowStatus:_flowStatus,flowType:_flowType,node:_node}));
            },
            setTempSearchObj:(_this,searchObj={})=>{
                let result = {..._this.props.state.searchObj,..._this.props.state.tempSearchObj,...searchObj};
                dispatch(setTempSearchObj(result));
            },
        }
    }
}
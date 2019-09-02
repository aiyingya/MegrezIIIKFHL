import { createStore } from 'redux';
import {reducer} from './Reducer';
import moment from 'moment';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj,setStaticStatus, setTempSearchObj,setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas,pageTempObj,pageTempObjCY
} from './Actions';
import api from "@/api/InitiateApi";
import {Global,Uc} from 'winning-megreziii-utils';
import curUtil from "../Util";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        agent:{
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
                let _flowStatus =await Uc.getDictKey("KFHL_ST");
                let _flowType =await Uc.getDictKey("KFHL_TB");
                let _node =await Uc.getDictKey("KFHL_LC");
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
        },
        applicationForAdmission:{
            getInfo:async (_this,inHospTableId)=>{
                Global.showLoading();
                let result = await api.look_hosp_apply({inHospTableId}).finally(() => {
                    Global.hideLoading();
                });
                Global.alert(result,{
                    successFun:()=>{
                        let record = result.data || {};
                        const diagnoseGists = record.diagnoseGists || [];
                        const checkedOutsideList = _.difference(diagnoseGists, ['5','6', '7','8', '9', '10']);
                        const checkedGroupList = _.difference(diagnoseGists, ['0','1', '2', '3', '4','5']);
                        const indeterminate =   !!checkedGroupList.length && checkedGroupList.length < curUtil.myStatic.plainOptions.length;
                        const checkAll = checkedGroupList.length === curUtil.myStatic.plainOptions.length;
                        _this.props.applicationForAdmission.setPageTempObj(_this,{
                            checkedOutsideList,
                            checkedGroupList,
                            indeterminate,
                            checkAll
                        });

                    },
                    isSuccessAlert:false
                });
            },
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObj,...objs};
                dispatch(pageTempObj(result));
            },
            handleOperate: async (record,fun) => {
                // 保存
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.in_hosp_apply(record).finally(() => {
                    // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
                    dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            },
            setApplyFile:(_this,fileRecord={})=>{
                let {uploadApplyFiles =[]} = _this.props.state.pageTempObj;
                let {setPageTempObj} = _this.props.applicationForAdmission;
                uploadApplyFiles.push(fileRecord);
                setPageTempObj(_this,{uploadApplyFiles:uploadApplyFiles});
            },
            setBergFile:(_this,fileRecord={})=>{
                let {uploadBergFiles =[]} = _this.props.state.pageTempObj;
                let {setPageTempObj} = _this.props.applicationForAdmission;
                uploadBergFiles.push(fileRecord);
                setPageTempObj(_this,{uploadBergFiles});
            },
            removeApplayFile:(_this,fileRecord)=>{
                let {setPageTempObj} = _this.props.applicationForAdmission;
                let {uploadApplyFiles} = _this.props.state.pageTempObj;
                let array =uploadApplyFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObj(_this,{uploadApplyFiles:array});
            },
            removeBergFile:(_this,fileRecord)=>{
                let {setPageTempObj} = _this.props.applicationForAdmission;
                let {uploadBergFiles} = _this.props.state.pageTempObj;
                let array = uploadBergFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObj(_this,{uploadBergFiles:array});
            },
        },
        dischargeAssessment:{
            setPageTempObjCY:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObjCY,...objs};
                dispatch(pageTempObjCY(result));
            },
            getUser:async (_this,personName)=>{
                let result = await api.person_infos({personName});
                Global.alert(result,{
                    successFun:()=>{
                        let personUserList = result.datas || [];
                        _this.props.dischargeAssessment.setPageTempObjCY(_this,{personUserList});
                    },
                    isSuccessAlert:false
                });
            },
            setBergFile:(_this,fileRecord={})=>{
                let {setPageTempObjCY} = _this.props.dischargeAssessment;
                let {uploadBergFiles =[]} = _this.props.state.pageTempObjCY;
                uploadBergFiles.push(fileRecord);
                setPageTempObjCY(_this,{uploadBergFiles});
            },
            removeBergFile:(_this,fileRecord)=>{
                let {setPageTempObjCY} = _this.props.applicationForAdmission;
                let {uploadBergFiles} = _this.props.state.pageTempObjCY;
                let array = uploadBergFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObjCY(_this,{uploadBergFiles:array});
            },
        }
    }
}
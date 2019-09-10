import { createStore } from 'redux';
import {reducer} from './Reducer';
import moment from 'moment';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj,setStaticStatus, setTempSearchObj,setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas,pageTempObj,pageTempObjStag,pageTempObjDischarge
} from './Actions';
import api from "@/api/NursingApi";
import {Global,Uc} from 'winning-megreziii-utils';
import curUtil from "../../Service/Util";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        common:{
            getInfo:async (_this,inHospTableId,recordEditVal ={})=>{
                Global.showLoading();
                let result = await api.look_hosp_apply({inHospTableId}).finally(() => {
                    Global.hideLoading();
                });

                Global.alert(result,{
                    successFun:()=>{
                        // TODO: 这里result.data[0] ?????
                        let record = result.data[0] || {};
                        const diagnoseGists = record.diagnoseGists || [];
                        const checkedOutsideList = _.difference(diagnoseGists, ['5','6', '7','8', '9', '10']);
                        const checkedGroupList = _.difference(diagnoseGists, ['0','1', '2', '3', '4','5']);
                        const indeterminate =   !!checkedGroupList.length && checkedGroupList.length < curUtil.myStatic.plainOptions.length;
                        const checkAll = checkedGroupList.length === curUtil.myStatic.plainOptions.length;
                        record = {...record,...recordEditVal};
                        _this.props.applicationForAdmission.setPageTempObj(_this,{
                            record:record,
                            checkedOutsideList,
                            checkedGroupList,
                            indeterminate,
                            checkAll
                        });

                    },
                    isSuccessAlert:false
                });
            },
        },
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
                let _dict = await Uc.getDict();
                // 初始化查询条件
                let forms = [
                    {labelName: '标题', formType: Global.SelectEnum.INPUT, name: 'title'},
                    {labelName: '患者', formType: Global.SelectEnum.INPUT, name: 'personName'},
                    {labelName: '发起人', formType: Global.SelectEnum.INPUT, name: 'initPerson'},
                    {labelName: '发起时间', formType: Global.SelectEnum.RangePickerSplit, name: 'dataTimes', dateFormat:dateFormat,outName:['initDateTo','initDateFrom'],outFormat:'YYYY-MM-DD',
                        initialValue:[moment(fromData,dateFormat), moment(toData,dateFormat)]},
                    {labelName: '流程状态', formType: Global.SelectEnum.SELECT, name: 'flowStatus', children: _dict.KFHL_ST},
                    {labelName: '流程类型', formType: Global.SelectEnum.SELECT, name: 'flowType', children: _dict.KFHL_TB},

                ]
                // 写入查询初始值
                if (searchVal) {
                    forms = Global.setFormsValue(forms,searchVal);
                }
                // 写入查询Form，用于显示查询组件内容
                dispatch(getFormItems(forms));
                // 显示信息时使用
                dispatch(setStaticStatus({flowStatus:_dict.KFHL_ST,flowType:_dict.KFHL_TB,node:_dict.KFHL_LC,dict:_dict}));
            },
            setTempSearchObj:(_this,searchObj={})=>{
                let result = {..._this.props.state.searchObj,..._this.props.state.tempSearchObj,...searchObj};
                dispatch(setTempSearchObj(result));
            },
        },
        admissionAssessment:{
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
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObjDischarge,...objs};
                dispatch(pageTempObjDischarge(result));
            },
            setOutHopsFile:(_this,fileRecord={})=>{
                let {setPageTempObj} = _this.props.dischargeAssessment;
                let {outHopsFiles =[]} = _this.props.state.pageTempObjDischarge;
                outHopsFiles.push(fileRecord);
                setPageTempObj(_this,{outHopsFiles});
            },
            removeOutHopsFile:(_this,fileRecord)=>{
                let {setPageTempObj} = _this.props.stageAssessment;
                let {outHopsFiles} = _this.props.state.pageTempObjDischarge;
                let array = outHopsFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObj(_this,{outHopsFiles:array});
            },
            setPharmacyFile:(_this,fileRecord={})=>{
                let {setPageTempObj} = _this.props.dischargeAssessment;
                let {pharmacyFiles =[]} = _this.props.state.pageTempObjDischarge;
                pharmacyFiles.push(fileRecord);
                setPageTempObj(_this,{pharmacyFiles});
            },
            removePharmacyFile:(_this,fileRecord={})=>{
                let {setPageTempObj} = _this.props.stageAssessment;
                let {pharmacyFiles} = _this.props.state.pageTempObjDischarge;
                let array = pharmacyFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObj(_this,{pharmacyFiles:array});
            },

        },
        stageAssessment:{
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObjStag,...objs};
                dispatch(pageTempObjStag(result));
            },
            getMonth:async (_this)=>{
                let result = await api.nurse_month();
                Global.alert(result,{
                    successFun:()=>{
                        let monthList = result.datas || [];
                        _this.props.stageAssessment.setPageTempObj(_this,{monthList});
                    },
                    isSuccessAlert:false
                });
            },
            setBergFile:(_this,fileRecord={})=>{
                let {setPageTempObj} = _this.props.stageAssessment;
                let {uploadBergFiles =[]} = _this.props.state.pageTempObjStag;
                uploadBergFiles.push(fileRecord);
                setPageTempObj(_this,{uploadBergFiles});
            },
            removeBergFile:(_this,fileRecord)=>{
                let {setPageTempObjCY} = _this.props.stageAssessment;
                let {uploadBergFiles} = _this.props.state.pageTempObjStag;
                let array = uploadBergFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObjCY(_this,{uploadBergFiles:array});
            },
        }
    }
}
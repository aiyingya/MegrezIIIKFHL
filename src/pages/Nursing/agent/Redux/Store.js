import { createStore } from 'redux';
import {reducer} from './Reducer';
import moment from 'moment';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj,setStaticStatus, setTempSearchObj,setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas,pageTempObj,pageTempObjCY
} from './Actions';
import api from "@/api/NursingApi";
import {Global,Uc} from 'winning-megreziii-utils';
import Static from "@/components/KFHL/Utils/Static";
import nursingUtils from "@/pages/Nursing/Service/Util";
import {pageTempObjDischarge, pageTempObjStag} from "@/pages/Nursing/initiate/Redux/Actions";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        common:{
            getInfo:async (_this,param={},fun)=>{
                let {inHospTableId,tableType = nursingUtils.myStatic.flowType.AdmissionAssessment,recordVal ={},setStoreVal={}} = param;
                Global.showLoading();
                let result = await api.look({inHospTableId,tableType}).finally(() => {
                    Global.hideLoading();
                });

                Global.alert(result,{
                    successFun:()=>{
                        let record = result.data || {};
                        if(tableType == nursingUtils.myStatic.flowType.DischargeAssessment){
                            // 出院小结内有文件上传
                            let outHopsFiles=[];//出院小结
                            let pharmacyFiles=[];//用药记录
                            const  files = record.files;
                            files && files.length>0 &&  files.map(file=>{
                                //文件类型：0=出院小结，1=死亡证明，2=用药记录，3=医院病历
                                if(record.outHospType === nursingUtils.myStatic.myEnum.yysw.swjl && file.fileType == Static.fileUseType.swjl){
                                    // 死亡记录
                                    outHopsFiles.push(file);
                                }else if(record.outHospType === nursingUtils.myStatic.myEnum.yysw.cyxj && file.fileType == Static.fileUseType.cyxj){
                                    // 默认出院小结
                                    outHopsFiles.push(file);
                                }
                                if(file.fileType == Static.fileUseType.yyjl){
                                    // 用药记录
                                    pharmacyFiles.push(file);
                                }
                            });
                            _this.props.dischargeAssessment.setPageTempObj(_this,{outHopsFiles,pharmacyFiles})
                        }
                        fun && fun({
                            record:{...record,...recordVal},
                            ...setStoreVal
                        });
                    },
                    isSuccessAlert:false
                });
            },
            handleReject:async (_this,{inHospTableId,backCause,fun}={})=>{
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.reject({inHospTableId,backCause}).finally(() => {
                    // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
                    dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            },
            handleCommit: async (record,fun) => {
                //commitType:Static.commitType.hlAdmissionAssessment
                // 只能提交
                Global.showLoading();
                let ajaxFun = api.user_commit;
                let ajaxParam = {...record}
                let result = await ajaxFun(ajaxParam).finally(() => {
                    Global.hideLoading();
                });
                Global.alert(result,{successFun:fun});
            },
        },
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
                        result.onChange = (_page, _pageSize)=>{
                            // 绑定分页按钮点击事件
                            _this.props.agent.initTable(_this,{value:_this.props.state.searchObj,page:_page, pageSize:_pageSize})
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
                let fromData = moment().subtract(3, "months");
                let _dict = await Uc.getDict();
                // 初始化查询条件
                let forms = [
                    {labelName: '标题', formType: Global.SelectEnum.INPUT, name: 'title'},
                    {labelName: '患者', formType: Global.SelectEnum.INPUT, name: 'personName'},
                    {labelName: '发起人', formType: Global.SelectEnum.INPUT, name: 'initPerson'},
                    {labelName: '发起时间', formType: Global.SelectEnum.RangePickerSplit, name: 'dataTimes', dateFormat:Static.dateFormat,outName:['initDateFrom','initDateTo'],outFormat:'YYYY-MM-DD',
                        initialValue:[moment(fromData,Static.dateFormat), moment(toData,Static.dateFormat)]},
                    {labelName: '流程状态', formType: Global.SelectEnum.SELECT, name: 'flowStatus', children: _dict.KFHL_ST},
                    {labelName: '流程类型', formType: Global.SelectEnum.SELECT, name: 'flowType', children: _dict.KFHL_TB},
                ]
                // 为了冰冻页面 特殊处理 代表第一次初始化serach的时候，初始数据需要保存在临时对象中，用于页面切换页面时能显示临时数据使用
                if(searchVal == false){
                    dispatch(setTempSearchObj({initDateFrom:fromData,initDateTo:toData}));
                }
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
                dispatch(setTempSearchObj(searchObj));
            },
        },
        admissionAssessment:{
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObj,...objs};
                dispatch(pageTempObj(result));
            },
        },
        dischargeAssessment:{
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObjDischarge,...objs};
                dispatch(pageTempObjDischarge(result));
            },
        },
        stageAssessment:{
            setPageTempObj:(_this,objs)=>{
                let result = {..._this.props.state.pageTempObjStag,...objs};
                dispatch(pageTempObjStag(result));
            },
        }
    }
}
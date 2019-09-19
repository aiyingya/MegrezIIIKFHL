import { createStore } from 'redux';
import {reducer} from './Reducer';
import moment from 'moment';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj,setStaticStatus, setTempSearchObj,setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas,pageTempObj,pageTempObjCY
} from './Actions';
import api from "@/api/RehabilitationApi";
import {Global,Uc} from 'winning-megreziii-utils';
import curUtil from "../../Service/Util";
import Static from "@/components/KFHL/Utils/Static";
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
                let {inHospTableId,tableType = curUtil.myStatic.flowType.inHosp,recordVal ={},setStoreVal={}} = param;
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
                        if(tableType == curUtil.myStatic.flowType.outHosp){
                            // 初始化入院上传文件
                            let uploadBergFiles=[];// 入院Berg平衡量表的 出院小结
                            const  files = record.files;
                            files && files.length>0 &&  files.map(file=>{
                                //文件类型：0=出院小结，1=死亡证明，2=用药记录，3=医院病历
                                if(file.fileType == Static.fileUseType.yyjl){
                                    // 用药记录
                                    uploadBergFiles.push(file);
                                }
                            });
                            _this.applicationForAdmission.setPageTempObj(_this,{uploadBergFiles})
                        }else{
                            // 初始化入院上传文件
                            let uploadApplyFiles=[];// 入院申请的 医院病历
                            let uploadBergFiles=[];// 入院Berg平衡量表的 出院小结
                            const  files = record.files;
                            files && files.length>0 &&  files.map(file=>{
                                //文件类型：0=出院小结，1=死亡证明，2=用药记录，3=医院病历
                                if(file.fileType == Static.fileUseType.yybl){
                                    uploadApplyFiles.push(file);
                                }else if(file.fileType == Static.fileUseType.yyjl){
                                    // 用药记录
                                    uploadBergFiles.push(file);
                                }
                            });
                            _this.props.dischargeAssessment.setPageTempObj(_this,{uploadApplyFiles,uploadBergFiles})
                        }
                        fun && fun({
                            record:{...record,...recordVal},
                            checkedOutsideList,
                            checkedGroupList,
                            indeterminate,
                            checkAll,
                            ...setStoreVal
                        });

                    },
                    isSuccessAlert:false
                });
            },
        },
        search:{
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
                let result = await api.search_tree(searchObj);

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
                let fromData = moment().subtract(3, "months");
                let _dict = await Uc.getDict();
                // 初始化查询条件
                let forms = [
                    {labelName: '个人编号', formType: Global.SelectEnum.INPUT, name: 'personId'},
                    {labelName: '患者', formType: Global.SelectEnum.INPUT, name: 'personName'},
                    {labelName: '入院机构', formType: Global.SelectEnum.INPUT, name: 'inHosp'},
                    {labelName: '证件号码', formType: Global.SelectEnum.INPUT, name: 'identityCard'},
                    {labelName: '入院日期', formType: Global.SelectEnum.RangePickerSplit, name: 'dataTimes', dateFormat:Static.dateFormat,outName:['inHospDateFrom','inHospDateTo'],outFormat:'YYYY-MM-DD',
                        initialValue:[moment(fromData,Static.dateFormat), moment(toData,Static.dateFormat)]},
                    {labelName: '发起人', formType: Global.SelectEnum.INPUT, name: 'initPerson'},
                    {labelName: '审核状态', formType: Global.SelectEnum.SELECT, name: 'auditStatus', children: _dict.KFHL_ST},
                    {labelName: '填报状态', formType: Global.SelectEnum.INPUT, name: 'fillStatus'}
                ]
                // 为了冰冻页面 特殊处理 代表第一次初始化serach的时候，初始数据需要保存在临时对象中，用于页面切换页面时能显示临时数据使用
                if(searchVal == false){
                    dispatch(setTempSearchObj({inHospDateFrom:fromData,inHospDateTo:toData}));
                }
                // 写入查询初始值
                if (searchVal) {
                    forms = Global.setFormsValue(forms,searchVal);
                }
                // 写入查询Form，用于显示查询组件内容
                dispatch(getFormItems(forms));
                // 显示信息时使用
                dispatch(setStaticStatus({flowStatus:_dict.KFHL_ST,tableStatus:_dict.KFHL_TAB_S}));
            },
            setTempSearchObj:(_this,searchObj={})=>{
                dispatch(setTempSearchObj(searchObj));
            },
        },
        applicationForAdmission:{
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
                let result = {..._this.props.state.pageTempObjCY,...objs};
                dispatch(pageTempObjCY(result));
            },
            getUser:async (_this,personName)=>{
                let result = await api.person_infos({personName});
                Global.alert(result,{
                    successFun:()=>{
                        let personUserList = result.datas || [];
                        _this.props.dischargeAssessment.setPageTempObj(_this,{personUserList});
                    },
                    isSuccessAlert:false
                });
            },
            setBergFile:(_this,fileRecord={})=>{
                let {setPageTempObj} = _this.props.dischargeAssessment;
                let {uploadBergFiles =[]} = _this.props.state.pageTempObjCY;
                uploadBergFiles.push(fileRecord);
                setPageTempObj(_this,{uploadBergFiles});
            },
            removeBergFile:(_this,fileRecord)=>{
                let {setPageTempObj} = _this.props.applicationForAdmission;
                let {uploadBergFiles} = _this.props.state.pageTempObjCY;
                let array = uploadBergFiles.filter(res=>res.fileId != fileRecord.fileId);
                setPageTempObj(_this,{uploadBergFiles:array});
            },
        }
    }
}
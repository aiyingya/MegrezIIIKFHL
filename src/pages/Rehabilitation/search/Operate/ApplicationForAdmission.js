// 查看
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {message} from "antd/lib/index";
import { Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import Step from '@components/Step/Step';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import InHospApplication from '../../Service/Layout/InHospApplication/InHospApplication';
import InHospAssess from '../../Service/Layout/InHospAssess/InHospAssess';
import InHospBerg from '../../Service/Layout/InHospBerg/InHospBerg';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";

class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true,//打印时使用false
        }
        this.backUrl='/rehabilitation/search',
        this.inside = React.createRef();
        this.currentDay = KFHLService.currentDay();
        this.print = this.print.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
    }
    componentWillMount(){
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if(isFrozenPaging) return;
        //判断当前发起流程是否可以操作；
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};
        if(!record.inHospTableId){console.error("页面必须有数据")}
        else{
            this.props.common.getInfo(this,{inHospTableId:record.inHospTableId},this.setPageTempObj);
        }
    }
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
    }

    setPageTempObj(object={}){
        this.props.applicationForAdmission.setPageTempObj(this,{...object});
    }

    print() {
        // 打印
        Global.showLoading();
        this.setState({isHidePrint: false});
        setTimeout(()=> {
            $('#print-application').click();
            Global.hideLoading();
            this.setState({isHidePrint: true});
        }, 1000);
    }

    render() {
        let {tabValue="0",uploadBergFiles,uploadApplyFiles,record={},sumScore} = this.props.state.pageTempObj;
        const { isHidePrint } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadBergFileDataSource = (uploadBergFiles && uploadBergFiles.length>0 ? uploadBergFiles : Static.defaultUploadInfo);
        const uploadApplyFileDataSource = (uploadApplyFiles && uploadApplyFiles.length>0 ? uploadApplyFiles : Static.defaultUploadInfo);
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="查询" third="康复入院查看" secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={true}></Step>
                    <Divider/>

                    <div className={style.seatDiv}></div>
                        <Form >
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <div name="tab1" className={(tabValue == "0") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospApplication self={this} isDocter={false} canEdit={false}
                                                   getFieldDecorator ={getFieldDecorator}
                                                   isHidePrint ={isHidePrint}
                                                   uploadApplyFileDataSource={uploadApplyFileDataSource}
                                />

                            </div>

                            <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                               <InHospAssess self={this} isDocter={false} canEdit={false}
                                             getFieldDecorator ={getFieldDecorator}
                                             isHidePrint ={isHidePrint}/>
                            </div>

                            <div name="tab3" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>

                                <InHospBerg self={this} isDocter={false} canEdit={false}
                                            getFieldDecorator ={getFieldDecorator}
                                            isHidePrint ={isHidePrint}
                                            uploadBergFileDataSource ={uploadBergFileDataSource}
                                            record={record}
                                            sumScore={sumScore}
                                />
                            </div>
                        </div>
                        {/*<div className={style.buttons}>*/}
                            {/*<ReactToPrint trigger={() => <Button id="print-application" className={style.hidden}>打印</Button>} content={() => this.refs}/>*/}
                            {/*<BasicGroupComponent {...KFHLService.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit})}/>*/}
                        {/*</div>*/}
                        <div className={style.seatDiv}></div>
                    </Form>
                </div>
            </div>
        );
    }
}
ApplicationForAdmission = Form.create({ name: 'SearchApplicationForAdmission' })(ApplicationForAdmission);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, ApplicationForAdmission);
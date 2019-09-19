// 入院申请
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {message} from "antd/lib/index";
import { Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import nursingUtils from '../../Service/Util';
import Step from '@components/Step/Step';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import InHospApplication from '../../../Rehabilitation/Service/Layout/InHospApplication/InHospApplication';
import InHospAssess from '../../../Rehabilitation/Service/Layout/InHospAssess/InHospAssess';
import InHospBerg from '../../../Rehabilitation/Service/Layout/InHospBerg/InHospBerg';
import StageAssessmentLayout from '../../Service/Layout/StageAssessment';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";
class StageAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true,//true是隐藏所有Tabs, 打印时使用false
        }
        this.backUrl='/nursing/initiate';
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
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
            this.props.common.getInfo(this,{inHospTableId:record.inHospTableId,tableType:nursingUtils.myStatic.flowType.StageAssessment},this.setPageTempObj);
        }
    }
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
    }
    setPageTempObj(object={}){
        this.props.stageAssessment.setPageTempObj(this,{...object});
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
        const { isHidePrint } = this.state;
        const {dict} = this.props.state.staticStatus;
        const {record={},monthList} = this.props.state.pageTempObjStag;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="护理" second="发起流程" third="护理入院申请"  secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
                    <Divider/>

                    <Form>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <StageAssessmentLayout self={this} record={record} getFieldDecorator={getFieldDecorator} isHidePrint={isHidePrint}
                                                 canEdit={false} dict={dict} monthList={monthList} isDocter={false}/>
                        </div>
                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" style={{display:'none'}}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit:false,print:this.print})}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
StageAssessment = Form.create({ name: 'NursingSearchStageAssessment' })(StageAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, StageAssessment);
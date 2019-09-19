import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import Columns from './columns';
import nursingUtils from '../Service/Util';

class Initiate extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.inside = React.createRef();
        this.button ={
            direction : Global.Direction.UP,
                datas:[
                {
                    type : 'primary',
                    className: Global.BottomCss.ADD,
                    text:'护理入院评估',
                    onClick:(e)=>{
                        this.goAdmissionAssessment();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'护理阶段性评估',
                    onClick:(e)=>{
                        this.goStageAssessment();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'护理出院记录',
                    onClick:(e)=>{
                        this.goDischargeRecord();
                    }
                }
            ]
        }
        this.goAdmissionAssessment = this.goAdmissionAssessment.bind(this);
        this.goDischargeRecord = this.goDischargeRecord.bind(this);
        this.goStageAssessment = this.goStageAssessment.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        // 切换临时页面也冰冻，不需要刷新页面
        let isFrozenTabPaging =  Global.isFrozen();
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  isFrozenTabPaging || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            !isFrozenTabPaging && this.props.initiate.initTable(this,{isFrozenPaging});
            this.props.initiate.initSearch(this.props.state.tempSearchObj);
        }else{
            this.props.initiate.initSearch(false);
        }
        this.setState({isFrozenValue:(isFrozenPaging)});
    }
    componentDidMount(){
        new Scrollbar(this.inside.current).show()
    }

    goLook(record){
        record.inHospTableId = record.id;
        if(record.flowType == nursingUtils.myStatic.flowType.StageAssessment){
            this.goStageAssessment(record);
            return
        }
        if(record.flowType == nursingUtils.myStatic.flowType.DischargeAssessment){
            this.goDischargeRecord(record);
            return
        }
        this.goAdmissionAssessment(record);
    }
    goAdmissionAssessment(record){
        this.props.history.push({
            pathname: '/nursing/initiate/admissionAssessment',
            query: {
                record: record
            }
        })
    }
    goDischargeRecord(record){
        this.props.history.push({
            pathname: '/nursing/initiate/dischargeRecord',
            query: {
                record: record
            }
        })
    }
    goStageAssessment(record){
        this.props.history.push({
            pathname: '/nursing/initiate/stageAssessment',
            query: {
                record: record
            }
        })
    }
    handleSearch(value){
        this.props.initiate.initTable(this,{value});
    }

    handleChange(value){
        this.props.initiate.setTempSearchObj(this,value);
    }

    render() {
        // const Auth = AuthComponent(Table);
        return (
            <div className={`winning-body`} ref={this.inside}>
                <div className='winning-content'>
                    {/*搜索条件*/}
                    <BasicFormComponent forms={this.props.state.formItems} handleSearch={this.handleSearch} handleChange={this.handleChange} isFrozenValue={this.state.isFrozenValue}/>
                    <Divider />
                    <div className={'Table40 TableMain'}>
                        <BasicGroupComponent {...this.button}/>
                        <Table
                            loading={this.props.state.loading}
                            columns={ Columns(this)}
                            dataSource={this.props.state.datas}
                            pagination={this.props.state.pagination}
                            rowKey="inHospTableId"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Initiate);
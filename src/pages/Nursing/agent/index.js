import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import Columns from './columns';
import nursingUtils from "@/pages/Nursing/Service/Util";

class Initiate extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goAdmissionAssessment = this.goAdmissionAssessment.bind(this);
        this.goDischargeRecord = this.goDischargeRecord.bind(this);
        this.goStageAssessment = this.goStageAssessment.bind(this);
        this.inside = React.createRef();
    }

    goLook(record){
        record.inHospTableId = record.id;
        if(record.flowType == nursingUtils.myStatic.myEnum.flowType.StageAssessment){
            this.goStageAssessment(record);
            return
        }
        if(record.flowType == nursingUtils.myStatic.myEnum.flowType.DischargeAssessment){
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
        this.props.agent.initTable(this,{value});
    }

    handleChange(value){
        this.props.agent.setTempSearchObj(this,value);
    }
    componentWillMount(){
        // 切换临时页面也冰冻，不需要刷新页面
        let isFrozenTabPaging =  Global.isFrozen();
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  isFrozenTabPaging || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            !isFrozenTabPaging && this.props.initiate.initTable(this,{isFrozenPaging});
            this.props.agent.initSearch(this.props.state.tempSearchObj);
        }else{
            this.props.agent.initSearch(false);
        }
        this.setState({isFrozenValue:(isFrozenPaging)});
    }

    componentDidMount(){
        new Scrollbar(this.inside.current).show()
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
                        <Table
                            loading={this.props.state.loading}
                            columns={ Columns(this)}
                            dataSource={this.props.state.datas}
                            pagination={this.props.state.pagination}
                            rowKey="inHospTableId"
                            onRow={(record)=>{
                                return {
                                    onMouseEnter: (event)=> {
                                        // this.props.user.setOperateToDatas(Global.changeDatasById({data:this.props.state.datas,record,id:"yh_id"}))
                                    }
                                }
                            }}

                        />
                    </div>
                </div>
            </div>

        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Initiate);
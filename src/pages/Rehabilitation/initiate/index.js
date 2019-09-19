// 发起流程只能查看当前医生用户的流程节点
import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import Columns from './columns';
import curUtil from "@/pages/Rehabilitation/Service/Util";

class Initiate extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.goApplicationForAdmission = this.goApplicationForAdmission.bind(this);
        this.goDischargeAssessment = this.goDischargeAssessment.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inside = React.createRef();
        this.button ={
            direction : Global.Direction.UP,
                datas:[
                {
                    type : 'primary',
                    className: Global.BottomCss.ADD,
                    text:'康复入院申请',
                    onClick:(e)=>{
                        this.goApplicationForAdmission();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'康复出院评估',
                    onClick:(e)=>{
                        this.goDischargeAssessment();
                    }
                }
            ]
        }
    }
    goLook(record){
        if(record.flowType == curUtil.myStatic.flowType.outHosp){
            this.goDischargeAssessment(record);
            return
        }
        this.goApplicationForAdmission(record);
    }
    goApplicationForAdmission(record){
        this.props.history.push({
            pathname: '/rehabilitation/initiate/applicationForAdmission',
            query: {
                record: record
            }
        })
    }
    goDischargeAssessment(record){
        this.props.history.push({
            pathname: '/rehabilitation/initiate/dischargeAssessment',
            query: {
                record: record
            }
        })
    }

    handleSearch(value){
        this.props.initiate.initTable(this,{value});
    }

    handleChange(values){
        //forms 是临时所有的数据
        this.props.initiate.setTempSearchObj(this,values);
    }
    componentWillMount(){
        // 切换临时页面也冰冻，不需要刷新页面
        let isFrozenTabPaging =  Global.isFrozen();
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  isFrozenTabPaging || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            !isFrozenTabPaging && this.props.initiate.initTable(this,{isFrozenPaging:true});
            this.props.initiate.initSearch(this.props.state.tempSearchObj);
        }else{
            // this.props.initiate.initTable(this);
            this.props.initiate.initSearch(false);
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
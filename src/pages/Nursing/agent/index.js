import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import style from './common.less'
import Columns from './columns';
import curUtil from "@/pages/Rehabilitation/Service/Util";

class Initiate extends Component {
    constructor(props) {
        super(props);
        this.goApplicationForAdmission = this.goApplicationForAdmission.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inside = React.createRef();
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
            pathname: '/rehabilitation/agent/applicationForAdmission',
            query: {
                record: record
            }
        })
    }
    goDischargeAssessment(record){
        this.props.history.push({
            pathname: '/rehabilitation/agent/dischargeAssessment',
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
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            // this.props.initiate.initTable(this,{isFrozenPaging});
            this.props.agent.initSearch(this.props.state.tempSearchObj);
        }else{
            this.props.agent.initSearch();
            // this.props.initiate.initTable(this);
        }
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
                    <BasicFormComponent forms={this.props.state.formItems} handleSearch={this.handleSearch} handleChange={this.handleChange}/>
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
import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import style from './common.less'
import Columns from './columns';

class Initiate extends Component {
    constructor(props) {
        super(props);
        this.goEditApplicationForAdmission = this.goEditApplicationForAdmission.bind(this);
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
                        this.goEditApplicationForAdmission();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'康复出院评估',
                    onClick:(e)=>{
                        this.handleRemove(this.state.selectedRows);
                    }
                }
            ]
        }
    }
    goEditApplicationForAdmission(record){
        this.props.history.push({
            pathname: '/rehabilitation/initiate/applicationForAdmission',
            query: {
                record: record
            }
        })
    }
    goEditRole(record){

    }
    goEditOrg(record){

    }
    handleSearch(value){
        this.props.initiate.initTable(this,{value});
    }

    handleChange(value){
        this.props.initiate.setTempSearchObj(this,value);
    }
    componentWillMount(){
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            this.props.initiate.initTable(this,{isFrozenPaging});
            this.props.initiate.initSearch(this.props.state.tempSearchObj);
        }else{
            this.props.initiate.initSearch();
            this.props.initiate.initTable(this);
        }
    }

    componentDidMount(){
        new Scrollbar(this.inside.current).show()
    }

    render() {

        // const Auth = AuthComponent(Table);
        return (
            <div className={`winning-body ${style.speTable}`} ref={this.inside}>
                <div className='winning-content'>
                    {/*搜索条件*/}
                    <BasicFormComponent forms={this.props.state.formItems} handleSearch={this.handleSearch} handleChange={this.handleChange}/>
                    <Divider />
                    <div className={'Table40 TableMain'}>
                        <BasicGroupComponent {...this.button}/>
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
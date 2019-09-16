import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider  } from 'antd';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import style from './common.less'
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar,Loader} from 'winning-megreziii-utils';
import columns from './columns'
import columnsExpandeRow from './columnsExpandeRow'
import columnsExpandeRowChild from './columnsExpandeRowChild'
import curUtil from "@/pages/Rehabilitation/Service/Util";
import api from "@/api/RehabilitationApi";

class User extends Component {
    constructor(props) {
        super(props);
        this.goLook = this.goLook.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.expandedRowRender = this.expandedRowRender.bind(this);
        this.expandedRowRenderChild = this.expandedRowRenderChild.bind(this);
        this.goApplicationForAdmission = this.goApplicationForAdmission.bind(this);
        this.goDischargeAssessment = this.goDischargeAssessment.bind(this);
        this.inside = React.createRef();
        this.button ={
            direction : Global.Direction.UP,
            datas:[
                {
                    type : 'primary',
                    className: Global.BottomCss.ADD,
                    text:'导出',
                    onClick:()=>{
                        Loader.download(api.excel_export,this.props.state.tempSearchObj);
                    }
                }
            ]
        }
    }
    componentWillMount(){
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if (isFrozenPaging) {
            // this.props.initiate.initTable(this,{isFrozenPaging});
            this.props.search.initSearch(this.props.state.tempSearchObj);
        }else{
            this.props.search.initSearch();
            // this.props.initiate.initTable(this);
        }
    }

    componentDidMount(){
        new Scrollbar(this.inside.current).show();

    }
    goLook(record){
        if(record.type == curUtil.myStatic.type.outHosp){
            this.goDischargeAssessment(record);
            return
        }
        this.goApplicationForAdmission(record);
    }
    goApplicationForAdmission(record){
        this.props.history.push({
            pathname: '/rehabilitation/search/applicationForAdmission',
            query: {
                record: record
            }
        })
    }
    goDischargeAssessment(record){
        this.props.history.push({
            pathname: '/rehabilitation/search/dischargeAssessment',
            query: {
                record: record
            }
        })
    }
    handleSearch(value){
        this.props.search.initTable(this,{value});
    }
    handleChange(value){
        this.props.search.setTempSearchObj(this,value);
    }
    expandedRowRenderChild(record){
        return <Table columns={columnsExpandeRowChild(this)}
                      dataSource={record.tables}
                      pagination={false}
                      className="winning-child-table"
                      rowKey="ID"/>;
    };
    expandedRowRender(record){
        return <Table columns={columnsExpandeRow(this)}
                      dataSource={record.hosp}
                      pagination={false}
                      expandedRowRender={this.expandedRowRenderChild}
                      className="winning-child-table"
                      rowKey="ID"/>;
    };
    render() {

        const expandedRowRender1 = (record) => {
            console.log(1,record.key)
            const columns = [
                { title: 'Date', dataIndex: 'date', key: 'date', render: (text) => (
                        <span>
                        <Badge status="warning" />
                            {text}
                      </span>
                    ),
                },
                { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => (
                        <span>
                        <Badge status="processing" />
                            {text}
                      </span>
                    ),
                },
                {
                    title: 'Status',
                    key: 'state',
                    render: () => (
                        <span>
                        <Badge status="success" />
                        Finished
                      </span>
                    ),
                },
                { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    key: 'operation'
                },
            ];

            const data = [];
            for (let i = 0; i < 3; ++i) {
                data.push({
                    key: i,
                    date: '2014-12-24 23:12:00'+ "2級"+record.key,
                    name: 'This is production name'+record.key,
                    upgradeNum: 'Upgraded: 56',
                });
            }
            return <Table columns={columns}
                          dataSource={data}
                          pagination={false}
                          className="winning-child-table" />;
        };



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
                            className="winning-table-spe-nested"
                            loading={this.props.state.loading}
                            columns={columns(this)}
                            expandedRowRender={this.expandedRowRender}
                            dataSource={this.props.state.datas}
                            pagination={this.props.state.pagination}
                            rowKey="ID"
                        />
                    </div>
                </div>
            </div>

        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,User);
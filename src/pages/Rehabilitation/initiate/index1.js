import React, {Component} from 'react';
import { Table, Badge, Menu, Dropdown, Icon,Divider } from 'antd';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import style from './common.less'
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
class Initiate extends Component {
    constructor(props) {
        super(props);
        this.goEdit = this.goEdit.bind(this);
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
                        this.goEdit();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'图层康复出院评估',
                    onClick:(e)=>{
                        this.handleRemove(this.state.selectedRows);
                    }
                }
            ]
        }
    }
    goEdit(record){
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
        const menu = (
            <Menu>
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
            </Menu>
        );

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

        const expandedRowRender = (record) => {
            console.log(1,record.key)
            const columns = [
                { title: 'Date', dataIndex: 'date', key: 'date' },
                { title: 'Name', dataIndex: 'name', key: 'name' },
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
                    key: 'operation',
                    render: () => (
                        <span>
                        <Badge status="success" />
                        ddd
                      </span>
                    ),
                },
            ];

            const data = [];
            for (let i = 0; i < 3; ++i) {
                data.push({
                    key: i,
                    date: '2014-12-24 23:12:00'+record.key,
                    name: 'This is production name'+record.key,
                    upgradeNum: 'Upgraded: 56',
                });
            }

            return <Table columns={columns}
                          dataSource={data}
                          pagination={false}
                          expandedRowRender={expandedRowRender1}
                          className="winning-child-table" />;
        };

        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Platform', dataIndex: 'platform', key: 'platform' },
            { title: 'Version', dataIndex: 'version', key: 'version' },
            { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            { title: 'Creator', dataIndex: 'creator', key: 'creator' },
            { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' ,width:"80px", render: () => <div onClick={()=>{console.log(1111)}} className={style.jumpSelect}>Publish</div> },
            { title: 'Action', key: 'operation', render: () => <span className={style.textColor}>Publish</span> },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                name: 'Screem',
                platform: 'iOS',
                version: '10.3.4.5654',
                upgradeNum: 500,
                creator: 'Jack',
                createdAt: '2014-12-24 23:12:00',
            });
        }

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
                            columns={columns}
                            expandedRowRender={expandedRowRender}
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>

        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Initiate);
import React, {Component} from 'react';
import { Divider } from 'antd';
import style from './common.less'
import {message} from "antd/lib/index";
import {Global,BasicFormComponent,Scrollbar} from 'winning-megreziii-utils';
import moment from 'moment';

class ExForms extends Component {
    constructor(props) {
        super(props);
        this.inside = React.createRef();
    }

    componentWillMount(){
        let _searchData = [
            {
                "name": "主任医师",
                "value": "231"
            },
            {
                "name": "药士",
                "value": "245"
            },
            {
                "name": "主任护师",
                "value": "251"
            },
            {
                "name": "副主任护师",
                "value": "252"
            },
            {
                "name": "主管护师",
                "value": "253"
            },
            {
                "name": "护师",
                "value": "254"
            },
            {
                "name": "护士",
                "value": "255"
            },
            {
                "name": "主任技师",
                "value": "261"
            },
            {
                "name": "副主任技师",
                "value": "262"
            },
            {
                "name": "主管技师",
                "value": "263"
            },
            {
                "name": "技师",
                "value": "264"
            },
            {
                "name": "副主任医师",
                "value": "232"
            },
            {
                "name": "技士",
                "value": "265"
            },
            {
                "name": "主治医师",
                "value": "233"
            },
            {
                "name": "医师",
                "value": "234"
            },
            {
                "name": "医士",
                "value": "235"
            },
            {
                "name": "主任药师",
                "value": "241"
            },
            {
                "name": "副主任药师",
                "value": "242"
            },
            {
                "name": "主管药师",
                "value": "243"
            },
            {
                "name": "药师",
                "value": "244"
            }
        ]
        let forms = [
            {labelName: '用户名称', formType: Global.SelectEnum.INPUT, name: 'yh_mc'},
            {labelName: '职务头衔', formType: Global.SelectEnum.SELECT, name: 'zw', children: _searchData},
            {labelName: '操作日期', formType: Global.SelectEnum.RangePicker, name: 'dataTimes',
                dateFormat:'YYYY/MM/DD',outName:['startDate','endDate'],outFormat:'YYYY-MM-DD'}
        ]

        let forms1 = [
            {labelName: '用户名称', formType: Global.SelectEnum.INPUT, name: 'yh_mc',value:"我是用户名"},
            {labelName: '职务头衔', formType: Global.SelectEnum.SELECT, name: 'zw', children: _searchData,value:"243"},
            {labelName: '操作日期', formType: Global.SelectEnum.RangePicker, name: 'dataTimes',
                dateFormat:'YYYY/MM/DD',outName:['startDate','endDate'],outFormat:'YYYY-MM-DD',value:[moment('2015/01/01'), moment('2015/01/06')]}
        ]

        let forms2 = [
            {labelName: '用户名称', formType: Global.SelectEnum.INPUT, name: 'yh_mc',value:"我是用户名",initialValue:"我是用户名"},
            {labelName: '职务头衔', formType: Global.SelectEnum.SELECT, name: 'zw', children: _searchData,value:"243",initialValue:"243"},
            {labelName: '操作日期', formType: Global.SelectEnum.RangePicker, name: 'dataTimes',
                dateFormat:'YYYY/MM/DD',outName:['startDate','endDate'],outFormat:'YYYY-MM-DD',
                initialValue:[moment('2015/01/01'), moment('2015/01/06')]}
        ]

      /*  let forms2 = [
            {labelName: '年度', formType: Global.SelectEnum.SELECT, name:'nd',children: fl,activateSearch:true,initialValue:2019,value:2018},
            {labelName: '用户名称', formType: Global.SelectEnum.INPUT, name: 'yh_mc',value:'111',initialValue:'22'},
            {labelName: '用户id', formType: Global.SelectEnum.INPUT, name: 'yh_id'},
            {labelName: '操作日期', formType: Global.SelectEnum.RangePicker, name: 'dataTimes',
                dateFormat:'YYYY/MM/DD',outName:['startDate','endDate'],outFormat:'YYYY-MM-DD',
                initialValue:[moment('2015/01/01'), moment('2015/01/06')]}
        ]*/
        this.setState({forms,forms1,forms2})
    }
    handleSearch(value){
        message.success("选中值:"+JSON.stringify(value));
    }
    componentDidMount(){
        new Scrollbar(this.inside.current).show()
    }
    render() {
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                    {/*搜索条件*/}
                    <div>没有默认值的搜索表单</div>
                    <BasicFormComponent forms={this.state.forms} handleSearch={this.handleSearch} />
                    <Divider />
                    <div>有默认值的搜索表单,重置后的初始值为空</div>
                    <BasicFormComponent forms={this.state.forms1} handleSearch={this.handleSearch} />
                    <Divider />
                    <div>有默认值的搜索表单,重置后初始值为自己设定的initialValue值</div>
                    <BasicFormComponent forms={this.state.forms2} handleSearch={this.handleSearch} />
                </div>
            </div>
        )
    }
}
export default ExForms
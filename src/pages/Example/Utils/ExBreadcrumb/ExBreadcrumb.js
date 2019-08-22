import React, {Component} from 'react';
import { Divider } from 'antd';
import style from './common.less'
import {BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';

class ExBreadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'新增字典',
            backUrl:'/system/dict'
        };
        this.inside = React.createRef();

    }
    mock() {
        return [
            {
                label: '系统管理'
            },
            {
                label: '字典管理2',
                url: '/system/dict'
            },
            {
                label: '字典管理3',
                url: '/system/dict'
            },
            {
                label: '字典管理4',
                url: '/system/dict'
            },
            {
                label: '字典管理5',
                url: '/system/dict'
            },
            {
                label: '字典管理'
            }
        ]
    }

    componentWillMount(){}
    componentDidMount(){
        new Scrollbar(this.inside.current).show()
    }
    render() {

        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                    <div>点击【字典管理】可以跳转</div>
                    <BreadcrumbCustom first="系统管理" second="字典管理" third="新增字典" secondUrl={this.state.backUrl}/>
                    <Divider />
                    <div>不可以跳转</div>
                    <BreadcrumbCustom first="系统管理" second="字典管理" third="新增字典" title="我是title"/>
                    <Divider />
                    <div>4个导航</div>
                    <BreadcrumbCustom first="系统管理" second="字典管理1" third="新增字典2" fourth="新增类型" secondUrl={this.state.backUrl} thirdUrl={this.state.backUrl} />
                    <Divider />
                    <div>5个导航</div>
                    <BreadcrumbCustom first="系统管理" second="字典管理1" third="新增字典2" fourth="新增类型3" fifth="新增类型名称"
                                      secondUrl={this.state.backUrl} thirdUrl={this.state.backUrl} fourthUrl={this.state.backUrl}/>
                    <Divider />
                    <div>大与5个导航</div>
                    <BreadcrumbCustom breads = {this.mock()} title="我是title"/>

                </div>
            </div>
        );
    }
}
export default  ExBreadcrumb
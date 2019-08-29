import React, {Component} from 'react';
import { Modal,Icon } from 'antd';
const { confirm } = Modal;
import './layout.less'
import {Global,Uc} from 'winning-megreziii-utils';

class Header extends Component {
    constructor(props) {
        super(props);
        this.user =   Global.localStorage.get(Global.localStorage.key.userInfo) ||{};
    }
    async logout () {
        confirm({
            title: '确定要退出吗？',
            onOk:async ()=>{
                await Uc.Logout();
                window.location.href="/Login";
            }
        });
    }

    render() {

        return (
            <div className='admin' >
                {this.user.yh_mc}，<span className='logout' onClick={this.logout}>退出<Icon type="logout" /></span>
            </div>
        );
    }
}
export default Header;
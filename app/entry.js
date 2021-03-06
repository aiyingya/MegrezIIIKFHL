import React from 'react';
import Init from 'winning-megreziii-routers';
import pageRoutes from './router.config';
import {BasicsRouter} from './router.config';
import "./css/Wrapper.less";
import Header from './layout/Header'
// import SiderHeader from './layout/SiderHeader'
// import SiderFooter from './layout/SiderFooter'

Init({
    pageRoutes:pageRoutes,
    BasicsRouter:BasicsRouter,
    title:'MegrezzIII',
    icon:'pie-chart',
    isUseRouterRecord:true,
    isUseAccessRouter:true,
    Header:Header,
    successLogin:async ()=>{
        window._m = require("./js/_m.js");
    }
    // SiderHeader:SiderHeader,
    // SiderFooter:SiderFooter,
    // homePage:'/Login'
})

import React from 'react';
import './css/iconfont/font/iconfont.js';
import style from './css/iconfont/iconfont.less';
import {User,UserEdit,UserEditOrganization,
    Role,RoleEdit,RoleEditModule,RoleEditModuleResource,
    Module,ModuleEdit,Dict,DictEdit,
    Organization,OrganizationEdit,
    overallPlanningArea,overallPlanningAreaEdit,
    Login,License} from 'winning-megreziii-basic-service';

export default [
    {
        path: '/redirect',
        name: 'redirect',
        icon: '',
        redirect: '/dashboard/analysis'
    },
    {
        path: '/system',
        name: '系统管理',
        icon: (
            <svg className={style.icon} aria-hidden="true">
                <use xlinkHref="#icon-xitongshezhi"></use>
            </svg>
        ),
        authority: ['admin'],
        hidden: false,
        routes: [
            {
                path: '/system/user',
                name: '用户管理',
                authority: ['admin'],
                hidden: false,
                component: User
            },
            {
                path: '/system/user/operate',
                name: '用户更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/user',
                component: UserEdit
            },
            {
                path: '/system/user/editOrganization',
                name: '用户组织',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/user',
                component: UserEditOrganization
            },
            {
                path: '/system/role',
                name: '角色管理',
                authority: ['admin'],
                hidden: false,
                component: Role
            },
            {
                path: '/system/role/operate',
                name: '角色更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/role',
                component: RoleEdit
            },
            {
                path: '/system/role/operateModule',
                name: '分配模块',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/role',
                component: RoleEditModule
            },
            {
                path: '/system/role/operateModuleResource',
                name: '分配资源',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/role',
                component: RoleEditModuleResource
            },
            {
                path: '/system/module',
                name: '菜单管理',
                authority: ['admin'],
                hidden: false,
                component: Module
            },
            {
                path: '/system/module/operate',
                name: '菜单更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/module',
                component: ModuleEdit
            },
            {
                path: '/system/dict',
                name: '字典管理',
                authority: ['admin'],
                hidden: false,
                component: Dict
            },
            {
                path: '/system/dict/operate',
                name: '字典更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/dict',
                component: DictEdit
            },
            {
                path: '/system/organization',
                name: '系统组织',
                authority: ['admin'],
                hidden: false,
                component: Organization
            },
            {
                path: '/system/organization/operate',
                name: '机构更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/organization',
                component: OrganizationEdit
            },
            {
                path: '/system/overallPlanningArea',
                name: '统筹区管理',
                authority: ['admin'],
                hidden: false,
                component: overallPlanningArea
            },
            {
                path: '/system/overallPlanningArea/operate',
                name: '统筹区更新',
                authority: ['admin'],
                hidden: true,
                parentPath:'/system/overallPlanningArea',
                component: overallPlanningAreaEdit
            }
        ]
    },
    {
        path: '/rehabilitation',
        name: '康复',
        icon: (
            <svg className={style.icon} aria-hidden="true">
                <use xlinkHref="#icon-xitongshezhi"></use>
            </svg>
        ),
        authority: ['admin'],
        hidden: false,
        routes: [
            {
                path: '/rehabilitation/initiate',
                name: '发起流程',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Rehabilitation/initiate').default
            },
            {
                path: '/rehabilitation/initiate/applicationForAdmission',
                name: '康复入院申请',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/initiate',
                component: require('@pages/Rehabilitation/initiate/Operate/ApplicationForAdmission').default
            },
            {
                path: '/rehabilitation/initiate/dischargeAssessment',
                name: '康复出院评估',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/initiate',
                component: require('@pages/Rehabilitation/initiate/Operate/DischargeAssessment').default
            },
            {
                path: '/rehabilitation/agent',
                name: '流程待办',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Rehabilitation/agent').default
            },
            {
                path: '/rehabilitation/agent/applicationForAdmission',
                name: '待办康复入院申请',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/agent',
                component: require('@pages/Rehabilitation/agent/Operate/ApplicationForAdmission').default
            },
            {
                path: '/rehabilitation/agent/dischargeAssessment',
                name: '待办康复出院评估',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/agent',
                component: require('@pages/Rehabilitation/agent/Operate/DischargeAssessment').default
            },
            {
                path: '/rehabilitation/search',
                name: '查询',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Rehabilitation/search').default
            },
            {
                path: '/rehabilitation/search/applicationForAdmission',
                name: '查看康复入院申请',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/search',
                component: require('@pages/Rehabilitation/search/Operate/ApplicationForAdmission').default
            },
            {
                path: '/rehabilitation/search/dischargeAssessment',
                name: '查看康复出院评估',
                authority: ['admin'],
                hidden: true,
                parentPath:'/rehabilitation/search',
                component: require('@pages/Rehabilitation/search/Operate/DischargeAssessment').default
            },
        ]
    },
    {
        path: '/nursing',
        name: '护理',
        icon: (
            <svg className={style.icon} aria-hidden="true">
                <use xlinkHref="#icon-xitongshezhi"></use>
            </svg>
        ),
        authority: ['admin'],
        hidden: false,
        routes: [
            {
                path: '/nursing/initiate',
                name: '护理发起流程',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Nursing/initiate').default
            },
            {
                path: '/nursing/initiate/admissionAssessment',
                name: '护理入院评估',
                authority: ['admin'],
                hidden: true,
                parentPath:'/nursing/initiate',
                component: require('@pages/Nursing/initiate/Operate/AdmissionAssessment').default
            },
            {
                path: '/nursing/initiate/stageAssessment',
                name: '护理阶段性评估',
                authority: ['admin'],
                hidden: true,
                parentPath:'/nursing/initiate',
                component: require('@pages/Nursing/initiate/Operate/StageAssessment').default
            },
            {
                path: '/nursing/initiate/dischargeRecord',
                name: '护理出院记录',
                authority: ['admin'],
                hidden: true,
                parentPath:'/nursing/initiate',
                component: require('@pages/Nursing/initiate/Operate/DischargeAssessment').default
            },
            {
                path: '/nursing/agent',
                name: '护理流程代办',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Nursing/agent').default
            },
            {
                path: '/nursing/search',
                name: '护理查询',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/Nursing/search').default
            },
        ]
    },
    {
        path: '/Example',
        name: 'Example',
        icon: 'pie-chart',
        authority: ['admin'],
        // hidden: false,
        routes: [
            {
                path: '/Example/Scrollbar',
                name: 'Scrollbar',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExScrollbar/ExScrollbar').default
            },
            {
                path: '/Example/ExModal',
                name: 'Modal',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExModal/ExModal').default
            },
            {
                path: '/Example/ExDrawer',
                name: 'Drawer',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExDrawer/ExDrawer').default
            },
            {
                path: '/Example/ExAlert',
                name: 'Alert',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExAlert/ExAlert').default
            },
            {
                path: '/Example/ExMessage',
                name: 'Message',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExMessage/ExMessage').default
            },
            {
                path: '/Example/ExNotification',
                name: 'Notification',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExNotification/ExNotification').default
            },
            {
                path: '/Example/ExPopover',
                name: 'Popover',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExPopover/ExPopover').default
            },
            {
                path: '/Example/ExPopconfirm',
                name: 'Popconfirm',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExPopconfirm/ExPopconfirm').default
            },
            {
                path: '/Example/ExButton',
                name: 'Button',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExButton/ExButton').default
            },
            {
                path: '/Example/ExTabs',
                name: 'Tabs',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExTabs/ExTabs').default
            },
            {
                path: '/Example/ExTable',
                name: 'Table',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExTable/ExTable').default
            },
            {
                path: '/Example/ExDataEntry',
                name: 'DataEntry',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExDataEntry/ExDataEntry').default
            },
            {
                path: '/Example/ExTransfer',
                name: 'Transfer',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExTransfer/ExTransfer').default
            },
            {
                path: '/Example/ExForm',
                name: 'Form',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExForm/ExForm').default
            },
            {
                path: '/Example/ExProgress',
                name: 'Progress',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExProgress/ExProgress').default
            },
            {
                path: '/Example/ExSpin',
                name: 'Spin',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExSpin/ExSpin').default
            },
            {
                path: '/Example/ExEcharts',
                name: 'Echarts',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExEcharts/ExEcharts').default
            },
            {
                path: '/Example/ExIcon',
                name: 'Icon',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/ExIcon/ExIcon').default
            }
        ]
    },
    {
        path: '/Utils',
        name: 'Utils',
        icon: 'pie-chart',
        authority: ['admin'],
        // hidden: false,
        routes: [
            {
                path: '/Utils/ExBreadcrumb',
                name: '面包屑',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/Utils/ExBreadcrumb/ExBreadcrumb').default
            },
            {
                path: '/Utils/ExButtonGroup',
                name: 'Modal',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/Utils/ExButtonGroup/ExButtonGroup').default
            },
            {
                path: '/Utils/ExForms',
                name: 'Drawer',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Example/Utils/EXForms/EXForms').default
            }
        ]
    },
    {
        path: '/Basic',
        name: 'Basic',
        icon: 'pie-chart',
        authority: ['admin'],
        // hidden: false,
        routes:[
            {
                path: '/Basic/404',
                name: '404',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Basics/ErrorPage/ErrorPage').default
            },{
                path: '/Basic/500',
                name: '500',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Basics/ErrorPage/ErrorPage').default
            },{
                path: '/Basic/Upgrade',
                name: 'Upgrade',
                icon: 'pie-chart',
                authority: ['admin'],
                // hidden: false,
                component: require('@pages/Basics/ErrorPage/ErrorPage').default
            }
        ]
    }
];
export const BasicsRouter=[
    {
        path: '/Login',
        component: require('@pages/Basics/Login/Login').default
    },
    {
        path: '/License',
        component: License
    }
];

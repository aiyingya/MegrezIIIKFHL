import login from './mock/UserCentre/login';
import logout from './mock/UserCentre/logout';
import userModule from './mock/UserCentre/user_module';
import license_view from './mock/UserCentre/license_view';
import license_edit from './mock/UserCentre/license_edit';
import dictionary from './mock/UserCentre/dict';
import userInfo from './mock/UserCentre/useinfo';

const api = {
    Login: '/rest/bs/auth/login',
    Logout: '/rest/bs/auth/logout',
    UserModule: '/rest/bs/auth/user_module',
    license_view:"/rest/bs/auth/license_view",
    license_edit:"/rest/bs/auth/license_edit",
    Dictionary: '/rest/bs/auth/dict_type',
    UserInfo: '/KFHL/user_info'
};

export default {
    api:api,
    mock:[login,logout,userModule,license_view,license_edit,dictionary,userInfo]
}
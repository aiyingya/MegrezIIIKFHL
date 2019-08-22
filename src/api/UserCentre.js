import login from './mock/UserCentre/login';
import logout from './mock/UserCentre/logout';
import userinfo from './mock/UserCentre/userinfo';
import license_view from './mock/UserCentre/license_view';
import license_edit from './mock/UserCentre/license_edit';
import dictionary from './mock/UserCentre/dict';

const api = {
    Login: '/rest/bs/auth/login',
    Logout: '/rest/bs/auth/logout',
    UserInfo: '/rest/bs/auth/user_module',
    license_view:"/rest/bs/auth/license_view",
    license_edit:"/rest/bs/auth/license_edit",
    Dictionary: '/rest/bs/auth/dict_type'
};

export default {
    api:api,
    mock:[login,logout,userinfo,license_view,license_edit,dictionary]
}
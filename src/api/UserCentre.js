import login from './mock/UserCentre/login';
import logout from './mock/UserCentre/logout';
import userModule from './mock/UserCentre/user_module';
import license_view from './mock/UserCentre/license_view';
import license_edit from './mock/UserCentre/license_edit';
import dictionary from './mock/UserCentre/dict';
import userInfo from './mock/UserCentre/useinfo';
import file_upload from './mock/UserCentre/uploadFile';
import file_download from './mock/success';

const api = {
    Login: '/rest/bs/auth/login',
    Logout: '/rest/bs/auth/logout',
    UserModule: '/rest/bs/auth/user_module',
    license_view:"/rest/bs/auth/license_view",
    license_edit:"/rest/bs/auth/license_edit",
    Dictionary: '/rest/bs/auth/dict_type',
    UserInfo: '/KFHL/user_info',
    file_upload: '/KFHL/inHospApply/upload',
    //文件下载
    file_download: '/KFHL/inHospApply/download',
};

export default {
    api:api,
    mock:[login,logout,userModule,license_view,license_edit,dictionary,userInfo,file_upload,file_download]
}
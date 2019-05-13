export enum AppConstant {
    // error messages
    MEMBERALREADYEXIST = 'Member already exist',
    MEMBERNOTFOUND = 'Member not found',
    EMAILREQUIRED = 'Email required',
    // auth messages
    TOKENEXPIRED = 'Token Expired',
    NOTAUTHORIZED = 'Not Authorized',
    INVALIDUSER= 'Invalid User',
    SOMETHINGWENTWRONG = 'Oops something went wrong',
    INVALIDTOKEN = 'Invalid Token',
    INVALIDCREDENTIAL = 'Invalid credentials',
    // api routes
    AUTH = '/login',
    LISTTEAMMEMBER = '/v1/listteammember',
    ADDTEAMMEMBER = '/v1/addteammember',
    EDITTEAMMEMBER = '/v1/editteammember',
    DELETETEAMMEMBER = '/v1/deleteteammember'
}

import jwt from 'jsonwebtoken';
const appSecret = "CrXXGs5[)B5pOr^L;uV0:pn@A!T6gw%+q2Gk{ZN>?K4--jMyO#g^IA67C]9)@vt";
export function getAuthData(token) {
    if (token) {
        const { userId, roleId } = jwt.verify(token, appSecret);
        let authData = {
            userId,
            roleId
        };
        return authData;
    }
    return null;
}
export function getToken(userId, roleId) {
    return jwt.sign({ userId: userId, roleId: roleId }, appSecret);
}

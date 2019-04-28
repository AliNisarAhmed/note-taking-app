import checkTokenExpiry from "./checkTokenExpiry";
function isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token && checkTokenExpiry(token)) {
        return true;
    }
    return false;
}
export default isLoggedIn;

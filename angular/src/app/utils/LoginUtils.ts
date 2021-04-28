
export default class LoginUtils {


    public static setSessionStorageUserData = (serverResponseData) => {

    //Save User Details On Client Side
    sessionStorage.setItem("token", serverResponseData.token + "");
    sessionStorage.setItem("firstName", serverResponseData.firstName);
    sessionStorage.setItem("city", serverResponseData.city);
    sessionStorage.setItem("street", serverResponseData.street);
    sessionStorage.setItem("userType", serverResponseData.userType);

    }

    public static routeUserByUserType(comp): void {

        let userType = sessionStorage.getItem("userType");

        if (userType == "Admin") {
            comp.router.navigate(["/admin"])
        } else if (userType == "Client") {
            comp.router.navigate(["customer"]);
        } else {
            comp.router.navigate(["/home"]);
        }
    }
}
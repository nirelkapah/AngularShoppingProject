import SnackbarUtils from "../utils/SnackbarUtils";


export default class ErrorHandler {

    public static handleErrors(router: any, serverErrorResponse: any, comp: any) {
        let message = serverErrorResponse.error.error;
        console.log(serverErrorResponse.status + ": " + serverErrorResponse.error.error);

        if (serverErrorResponse.status === 0) {
            let message = "We are sorry, the service is not available at the moment.\nPlease come back later."
            SnackbarUtils.openSnackBar(message, "Ok", comp);
            return;
        }

        if (serverErrorResponse.status === 401 || serverErrorResponse.status === 410) {
            SnackbarUtils.openSnackBar(message, "Ok", comp);
            this.sendBackToHomePage(router);
            return;
        }

        if (serverErrorResponse.status === 404 || serverErrorResponse.status === 600 || serverErrorResponse.status === 500) {
            SnackbarUtils.openSnackBar(message, "Ok", comp);
            return;
        }

        console.log(serverErrorResponse.message);
        SnackbarUtils.openSnackBar(serverErrorResponse.error.error, "Ok", comp);
    }

    public static snackBar(message, comp:any) {
        console.log(message);
        console.log(comp)
        SnackbarUtils.openSnackBar(message, "Ok", comp);

    }

    public static sendBackToHomePage(router) {
        setTimeout(() => {
            localStorage.clear();
            router.navigate(["home"])
        }, 0)
    }
}
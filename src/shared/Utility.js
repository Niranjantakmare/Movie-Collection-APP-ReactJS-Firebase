export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}
export const deleteDialogBox = {
    title: "Delete Movie",
    body: "Do you want to delete movie",
    cancelText: "Cancel",
    okText: "Ok",
    open: false,
  };

export const checkValidity = (field, value, passwordValue) => {
    let errors;
    switch(field) {
        case 'email': 
            if (!value) {
                errors = "*Please enter your email-ID.";
            }
            if (typeof value !== "undefined") {
                //regular expression for email validation
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(value)) {
                    errors = "*Please enter valid email-ID.";
                }
            }
            return errors;
        case 'firstName': 
            if (!value) {
                errors = "*Please enter your first name.";
            }
            if (typeof value !== "undefined") {
                if (!value.match(/^[a-zA-Z ]*$/)) {
                    errors = "*Please enter alphabet characters only.";
                }
            }
            return errors;
        case 'lastName': 
            if (!value) {
                errors = "*Please enter your last name.";
            }
            if (typeof value !== "undefined") {
                if (!value.match(/^[a-zA-Z ]*$/)) {
                errors= "*Please enter alphabet characters only.";
                }
            }
            return errors;
        case 'address1': 
        if (typeof value !== "undefined") {
            if (!value.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) {
            errors= "*Please enter alphabet characters only.";
            }
        }
        return errors;
        case 'address2': 
            if (typeof value !== "undefined") {
                if (!value.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) {
                errors= "*Please enter alphabet characters only.";
                }
            }
            return errors;
        case 'city': 
            if (typeof value !== "undefined") {
                if (!value.match(/^[a-zA-Z ]*$/)) {
                errors= "*Please enter alphabet characters only.";
                }
            }
            return errors;
        case 'zip': 
            if (value.length > 6 || value.length < 6  ) {
                errors= "*Zip code should be six digits.";
            }
            return errors;
        case 'country': 
            if (typeof value !== "undefined") {
                if (!value.match(/^[a-zA-Z ]*$/)) {
                errors= "*Please enter alphabet characters only.";
                }
            }
            return errors;
        case 'password': 
            if (!value) {
                errors = "*Please enter your password.";
            }
            // if (typeof value !== "undefined") {
            //     if (!value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            //     errors = "*Please enter secure and strong password.";
            //     }     
            // }
            return errors;
        case 'confirmPassword': 
            if (value !== passwordValue) {
                errors = "*Password and confirm password is not matched.";
            } 
        return errors;
    }
}

export const authCheckState = () => {
    let isLoggedIn = false;
    const token = sessionStorage.getItem('token');
    if(!token) {
        isLoggedIn = false;
    } else {
        let dateTime = sessionStorage.getItem('expirationDate');
        let expirationDate = new Date(dateTime);
        if (expirationDate <= new Date()) {
            isLoggedIn = false;
        } else {
            let userId = sessionStorage.getItem('userId');
            isLoggedIn = true;
        }
    }

    return isLoggedIn;
}

export const addRequestHandler = (request) => {
    // Modify request here
    request.headers['Access-Control-Allow-Origin'] = '*';
    request.headers['Access-Control-Allow-Methods']= "DELETE, POST, GET, OPTIONS";
    request.headers['Access-Control-Allow-Headers'] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";
    return request
}

function validation(values) {

        let error = {}

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const uniquekey_pattern = /^[^\s]{4}$/

        const password_pattern = /^[^\s]{6,20}$/


        if (values.email === "") {
                error.email = "Email should not be empty"
        }
        else if (!email_pattern.test(values.email)) {
                error.email = "Email Didn't match"
        }
        else { error.email = "" }

        if (values.uniquekey === "") {
                error.uniquekey = "Unique Key should not be empty"
        }
        else if (!uniquekey_pattern.test(values.uniquekey)) {
                error.uniquekey = "Unique Key Didn't match"
        }
        else { error.uniquekey = "" }
        if (values.password === "") {
                error.password = "Password should not be empty"
        }
        else if (!password_pattern.test(values.password)) {
                error.password = "Password must be min 6 and max 20 characters"
        }
        else {
                error.password = ""
        }
        return error;
}
export default validation;
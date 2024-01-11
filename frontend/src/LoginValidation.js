function validation(values) {

    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const password_pattern = /^[^\s]{6,20}$/


    if(values.email === "") {    
            error.email = "Email should not be empty"    }  
               else if(!email_pattern.test(values.email)) { 
                       error.email = "Email Didn't match"    }   
                        else {        error.email = ""    }
      
    if(values.password === "") { 
               error.password = "Password should not be empty"    }  
                  else if(!password_pattern.test(values.password)) {     
                       error.password = "Password must be min 6 and max 20 characters"    }    
                        else {      
                              error.password = ""    }   
                               return error;}
export default validation;
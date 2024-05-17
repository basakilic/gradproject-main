

function AdminLoginValidation(values) {

    let error = {}

    const username_pattern = /^[^\s]{6,20}$/

    const password_pattern = /^[^\s]{6,20}$/


    if(values.username === "") {    
            error.username = "Username should not be empty"    }  
               else if(!username_pattern.test(values.username)) { 
                       error.username = "Username Didn't match"    }   
                        else {        error.username = ""    }
      
    if(values.password === "") { 
               error.password = "Password should not be empty"    }  
                  else if(!password_pattern.test(values.password)) {     
                       error.password = "Password must be min 6 and max 20 characters"    }    
                        else {      
                              error.password = ""    }   
                               return error;}

export default AdminLoginValidation;
function validation(values) {

    let error = {}

    const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
    const surname_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^[^\s]{6,20}$/
    


   

    if(values.name === "") {    
        error.name = "Name should not be empty"    }  
           else if(!name_pattern.test(values.name)) { 
                   error.name = "Name's should not consist special characters or number"    }   
                    else {        error.name = ""    }
    if(values.surname === "") {    
                        error.surname = "Surname should not be empty"    }  
                           else if(!surname_pattern.test(values.surname)) { 
                                   error.surname = "Surname's should not consist special characters or number"    }   
                                    else {        error.surname = ""    }
    if(values.username === "") {    
        error.username = "Username should not be empty"    }  else {
            error.username = ""
        }

    if(values.email === "") {    
            error.email = "Email should not be empty"    }  
               else if(!email_pattern.test(values.email)) { 
                       error.email = "Email Didn't match"    }   
                        else {        error.email = ""    }
    if(values.password === "") { 
               error.password = "Password should not be empty"    }  
                  else if(!password_pattern.test(values.password)) {     
                       error.password = "Password must min 3 and max 20 characters"    }    
                        else {      
                              error.password = ""    }   
 if(values.uniquekey === "") { 
                                error.uniquekey = "Uniquekey should not be empty"    }  else {        error.uniquekey = ""    }
                  
                                       
                                          
                               return error;}
export default validation;
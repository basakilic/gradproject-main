function validation(values) {

    let error = {}
   

    if(values.name === "") {    
        error.name = "Workshop name should not be empty"    }    
                    else {        error.name = ""    }
    if(values.time === "") {    
                        error.time = "Workshop time should not be empty"    }   
                                    else {        error.time = ""    }
    if(values.time === "") {    
        error.quota = "Quota should not be empty"    }  else {
            error.quota = ""
        }

    if(values.location === "") {    
            error.location = "Location should not be empty"    }     
                        else {        error.location = ""    }
    if(values.date === "") { 
               error.date = "Date should not be empty"    }  
                        else {      
                              error.date = ""    }   
 
                                       
                                          
                               return error;}
export default validation;
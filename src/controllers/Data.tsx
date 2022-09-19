// Functionality to get dat from json file
export const GetData = async () => {
    try {
        return await fetch('./data/data.json',{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }).then(function(response){
            return response.json();
           });
    } catch (error) {
        return error;
    }
};
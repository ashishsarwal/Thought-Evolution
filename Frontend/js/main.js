
// Function to get the domain either dev or production

function getAPIDomain(){
    return 'http://localhost:3000';
    // return 'https://thought-evolution-backend.onrender.com';
}

function getIntParam(paramName){
    let queryString = new URLSearchParams(location.search);
    paramName = queryString.get(paramName);
    return parseInt(paramName);
}
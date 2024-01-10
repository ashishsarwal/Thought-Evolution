//Set form data onload
function setFormData(){
    //clear sessionStorage
    sessionStorage.clear();
    //get parameter
    let param = getIntParam('topicId');
    //console.log(`read param... ${param}`);
    //get data
    fetch(getAPIDomain() + '/topic/' + param)
        .then((response) => response.json())
        .then(data=>{
            document.getElementById('name').value = data[0].Name; 
            document.getElementById('description').value = data[0].Description; 
            document.getElementById('active').checked = data[0].IsActive; 
            getFormData();
        });
}
setFormData();
//Get form data onload
function getFormData(){
    //clear sessionStorage
    sessionStorage.clear();
    //assign values in session storage
    sessionStorage.setItem('Id', getIntParam('topicId'));
    sessionStorage.setItem('Name', document.getElementById('name').value);
    sessionStorage.setItem('Description', document.getElementById('description').value);
    sessionStorage.setItem('IsActive', document.getElementById('active').checked);
}
//Save form data
function save(){
    //refresh form data into variable
    getFormData();

    //write form data to database
    console.log('saving form data...');
    console.log(sessionStorage);

    fetch(getAPIDomain() + '/topic',{
        method: 'POST',
        body: JSON.stringify({
            Id: sessionStorage.getItem('Id'),
            Name: sessionStorage.getItem('Name'),
            Description: sessionStorage.getItem('Description'),
            IsActive: sessionStorage.getItem('IsActive')
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
        sessionStorage.clear();
        //navigate back to topic list
        location.href = './topic-list.html';
    });
}
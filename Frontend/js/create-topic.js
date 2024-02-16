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
            document.getElementById('name').value = data[0].Name.replaceAll("\\'",`'`).replaceAll("<br>",`\n`); 
            document.getElementById('description').value = data[0].Description.replaceAll("\\'",`'`).replaceAll("<br>",`\n`); 
            document.getElementById('quotation').value = data[0].Quote.replaceAll("\\'",`'`).replaceAll("<br>",`\n`); 
            document.getElementById('active').checked = data[0].IsActive; 
            getFormData();
        });
}
setFormData();
//Get form data onload
function getFormData(){
    //assign values in session storage
    sessionStorage.setItem('Id', getIntParam('topicId'));
    sessionStorage.setItem('Name', document.getElementById('name').value);
    sessionStorage.setItem('Description', document.getElementById('description').value);
    sessionStorage.setItem('Quotation', document.getElementById('quotation').value);
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
            Name: sessionStorage.getItem('Name').replaceAll(`'`,"\\'").replaceAll(`\n`,"<br>"),
            Description: sessionStorage.getItem('Description').replaceAll(`'`,"\\'").replaceAll(`\n`,"<br>"),
            Quote: sessionStorage.getItem('Quotation').replaceAll(`'`,"\\'").replaceAll(`\n`,"<br>"),
            IsActive: sessionStorage.getItem('IsActive'),
            topicImage: sessionStorage.getItem('topicImage')
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
        sessionStorage.clear();
        //navigate back to topic list
        location.href = './topic-list.html';
    });
}

function onImageChange(){
    //get image blob
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.onload = ()=>{
        sessionStorage.setItem('topicImage', reader.result);
    }
    reader.readAsDataURL(file);
}
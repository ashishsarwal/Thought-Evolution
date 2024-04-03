//Set form data onload

function setFormData(){
    //clear session storage
    sessionStorage.clear();
    // get parameter from url
    let param = getIntParam('bannerId');
    //fetch data from db
    fetch(`${getAPIDomain()}/banner/${param}`)
    .then((response) => response.json())
    .then(data=>{
        document.getElementById('title').value = data[0].Title.replaceAll("\\'",`'`).replaceAll("<br>",`\n`);
        document.getElementById('description').value = data[0].Description.replaceAll("\\'",`'`).replaceAll("<br>",`\n`);
        document.getElementById('blogDropdown').value = data[0].BlogId;
        document.getElementById('active').checked = data[0].IsActive;

        //Set Dropdown Value
        createBlogDropDown(data[0].BlogId);
    });
}

function createBlogDropDown(blogId){
    fetch(getAPIDomain() + '/blog')
    .then((response) => response.json())
    .then(data =>{
        let blogDropdownHTML = `<option value="0" selected> - Select Blog - </option>`;
        console.log(data);
        data.forEach((blog, index) => {
            if(blog.Id == blogId){
                blogDropdownHTML += `<option value="${blog.Id}" selected>${blog.Title}</option>`;
            }
            else{
                blogDropdownHTML += `<option value="${blog.Id}">${blog.Title}</option>`;
            }
        });   
        document.getElementById('blogDropdown').innerHTML = blogDropdownHTML;                                 
    });
    //update sessionStorage
    getFormData();
}
//Function call

setFormData();
//Get form Data
function getFormData(){
    sessionStorage.setItem('Id', getIntParam('bannerId'));
    sessionStorage.setItem('Title', document.getElementById('title').value);
    sessionStorage.setItem('Description', document.getElementById('description').value);
    sessionStorage.setItem('BlogId', document.getElementById('blogDropdown').value);
    sessionStorage.setItem('IsActive', document.getElementById('active').checked);
}


//Save form data

function save(){
    //refresh form data into variable
    getFormData();

    fetch(getAPIDomain() + '/banner',{
    method: 'POST',
    body: JSON.stringify({
        Id: sessionStorage.getItem('Id'),
        Title: sessionStorage.getItem('Title').replaceAll(`'`,"\\'").replaceAll(`\n`,"<br>"),
        Description: sessionStorage.getItem('Description').replaceAll(`'`,"\\'").replaceAll(`\n`,"<br>"),
        BlogId: sessionStorage.getItem('BlogId'),
        IsActive: sessionStorage.getItem('IsActive'),
        bannerImage: sessionStorage.getItem('bannerImage')
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response =>{
        sessionStorage.clear();
        //navigate back to banner list
        //console.log('reached here...');
        location.href = './banner-list.html';
    });

}

//Save form data

function onImageChange(){
    //get image blob
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.onload = ()=>{
        sessionStorage.setItem('bannerImage', reader.result);
    }
    reader.readAsDataURL(file);
}
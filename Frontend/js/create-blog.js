//Create topic list

function createTopicList(){
    fetch(getAPIDomain() + `/topic_blog/${getIntParam('blogId')}`)
    .then((response) => response.json())
    .then(data=>{
        let listHtml = `<label for="" class="form-label">Select Topics</label>`;
        listHtml = listHtml + `<ul class="list-group">`;
        data.forEach(item =>{
            listHtml = listHtml + `<li class="list-group-item">`;
            listHtml = listHtml + `<div class="form-check">`;
            if(item.IsSelected){
                listHtml = listHtml + `<input type="checkbox" name="" id="" class="form-check-input" onchange="onSelectTopic(${item.Id})" checked>`;
                onSelectTopic(item.Id);
            }
            else{
                listHtml = listHtml + `<input type="checkbox" name="" id="" class="form-check-input" onchange="onSelectTopic(${item.Id})">`;
            }
            listHtml = listHtml + `<label for="" class="form-check-label">${item.Name}</label>`;
            listHtml = listHtml + `</div>`;
            listHtml = listHtml + `</li>`;
        });
        listHtml = listHtml + `</ul>`;

        document.getElementById('topic-list').innerHTML = listHtml;
    });
}


//Set form data onload

function setFormData(){
    //clear session storage
    sessionStorage.clear();
    // get parameter from url
    let param = getIntParam('blogId');
    //fetch data from db
    fetch(`${getAPIDomain()}/blog/${param}`)
    .then((response) => response.json())
    .then(data=>{
        document.getElementById('title').value = data[0].Title;
        document.getElementById('description').value = data[0].Description;
        document.getElementById('active').checked = data[0].IsActive;
        myCKEditor.setData(data[0].Content);
        //update sessionStorage
        getFormData();
    });
    //create topic list
    createTopicList();
}


//Function call

setFormData();
//Get form Data
function getFormData(){
    sessionStorage.setItem('Id', getIntParam('blogId'));
    sessionStorage.setItem('Title', document.getElementById('title').value);
    sessionStorage.setItem('Description', document.getElementById('description').value);
    sessionStorage.setItem('IsActive', document.getElementById('active').checked);
    sessionStorage.setItem('Content', myCKEditor.getData());
}


//Save form data

function save(){
    //refresh form data into variable
    getFormData();

    fetch(getAPIDomain() + '/blog',{
    method: 'POST',
    body: JSON.stringify({
        Id: sessionStorage.getItem('Id'),
        Title: sessionStorage.getItem('Title'),
        Description: sessionStorage.getItem('Description'),
        IsActive: sessionStorage.getItem('IsActive'),
        Content: sessionStorage.getItem('Content'),
        Topics: sessionStorage.getItem('TopicList'),
        BlogImage: sessionStorage.getItem('BlogImage')
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response =>{
        sessionStorage.clear();
        //navigate back to blog list
        //console.log('reached here...');
        location.href = './blog-list.html';
    });

}


//function to store the selected topics for the blog

function onSelectTopic(inId){
    // declare an array
    let topics = [];
    // check if sessionStorage already has items
    if(sessionStorage.TopicList){
        topics = sessionStorage.TopicList.split(',');
        if(topics.indexOf(inId.toString()) != -1){
            //console.log('logging array...' + topics);
            topics = topics.filter(item => item != inId);   
            //console.log('logging array after filter...' + topics);
        }
        else{
            topics.push(inId);
        }
    }
    else{
        topics.push(inId);
    }
    // update sessionStorage
    sessionStorage.TopicList = topics;
    console.log('topic list ' + sessionStorage.TopicList);
}

//Save form data

function onImageChange(){
    //get image blob
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.onload = ()=>{
        sessionStorage.setItem('BlogImage', reader.result);
    }
    reader.readAsDataURL(file);
}
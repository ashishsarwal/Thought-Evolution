
// Function to get the domain either dev or production

function getAPIDomain(){
    // return 'https://435te658.a2hosted.com/thought-evolution-api';
    return 'http://localhost:3000/thought-evolution-api';
    // return 'https://thought-evolution-backend.onrender.com';
}

function getImageDomain(){
    // return 'https://435te658.a2hosted.com/thought-evolution-api';
    return 'http://localhost:3000';
    // return 'https://thought-evolution-backend.onrender.com';
}

// Function to get input parameter from the url

function getIntParam(paramName){
    let queryString = new URLSearchParams(location.search);
    paramName = queryString.get(paramName);
    return parseInt(paramName);
}

// Function to create navigation bar

async function createNav(page){
    let navHTML;
    navHTML = ` <a href="" class="navbar-brand">
                    <img src="./resources/logo.png" alt="Thought Evolution" width="220px">
                </a>
                <ul class="navbar-nav ml-3">`;
    if(page == 'HOME'){
        navHTML += `<li class="nav-item"><a href="./index.html" class="nav-link active">HOME</a></li>`;
    }
    else{
        navHTML += `<li class="nav-item"><a href="./index.html" class="nav-link">HOME</a></li>`;
    }
    navHTML += `<li class="nav-item dropdown">
                <a href="" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    TOPIC
                </a>`;
    navHTML += await createTopicMenu();
    navHTML += '</li>';
    navHTML += `<li class="nav-item"><a href="" class="nav-link">ABOUT PROJECT</a></li>
                <li class="nav-item"><a href="" class="nav-link">CONTACTS</a></li>
                <li class="nav-item dropdown">`;
    if(page == 'ADMIN'){        
        navHTML += `<a href="" class="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown">
                        ADMIN
                    </a>`;
    }
    else{
        navHTML += `<a href="" class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown">
                        ADMIN
                    </a>`;
    }
    navHTML += `<ul class="dropdown-menu">
                    <li><a href="./topic-list.html" class="dropdown-item">Manage Topics</a></li>
                    <li><a href="./blog-list.html" class="dropdown-item">Manage Blogs</a></li>
                    <li><a href="./banner-list.html" class="dropdown-item">Manage Banner</a></li>
                </ul>
                </li>
                </ul>`; 
    document.getElementsByTagName('nav')[0].innerHTML = navHTML;
}

function getAllBlogsForTopicById(topicId){
    console.log(topicId);
    //Create HTML
    let blogsByTopic = ``;
    //Fetch Blogs
    fetch(getAPIDomain() + `/blogs_by_topic/${topicId}`)
    .then((response) => response.json())
    .then((data) => {
        //initialize counter for each topic
        let counter = 0;
        data.forEach(blog =>{
            //Check if counter is zero and start creating a new row
            if(counter == 0){
                blogsByTopic = blogsByTopic + '<div class="row mt-5">';//row starts here
            }
            blogsByTopic = blogsByTopic + `<div class="col-4"><a href="./view-blog.html?blogId=${blog.Id}">`;//column starts here
            // if(blog.BlogImage = ''){
                blogsByTopic = blogsByTopic + `<img src="${getImageDomain() + '/images/blog-' + blog.Id + '.png'}" alt=" loading..." height="200" style="max-width: 100%;" class="mb-3">`;
            // }
            // else{
            //     blogsByTopic = blogsByTopic + `<div style="height: 200px"></div>`;
            // }
            blogsByTopic = blogsByTopic + `<div><h4>${blog.Title}</h4></div>`;
            blogsByTopic = blogsByTopic + `<div><h6><i>${blog.Description}</i></h6></div>`;
            blogsByTopic = blogsByTopic + `</a></div>`; // column ends here
            counter = counter + 1;
            //Check if four columns are added start new row
            if(counter == 3){
                blogsByTopic = blogsByTopic + '</div>'; // row ends here
                counter = 0;
            }
        });
        if(counter < 3 && counter > 0){
            blogsByTopic = blogsByTopic + '</div>'; // end last row
        }
        document.getElementById(`topic-${topicId}-container`).innerHTML = blogsByTopic;
    });
}


async function createTopicMenu(){
    const response = await fetch(getAPIDomain() + '/topic/active');
    const data = await response.json();
    let listHtml = `<ul class="dropdown-menu">`;
    data.forEach(item =>{
        listHtml = listHtml + `<li>`;
        listHtml = listHtml + `<a href="#topic-${item.Id}" class="dropdown-item">${item.Name}</a>`;
        listHtml = listHtml + `</li>`;
    });
    listHtml = listHtml + `</ul>`;
    return listHtml;
     
};

function enableUpload(paraName){
    let a = getIntParam(paraName);
    if(a == 0){
        document.getElementsByClassName('upload')[0].style.display = 'none';
    }
}
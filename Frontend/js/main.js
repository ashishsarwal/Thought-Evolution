
// Function to get the domain either dev or production

function getAPIDomain(){
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

function createNav(page){
    console.log('page... ' + page);
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
    navHTML += `<li class="nav-item"><a href="" class="nav-link">TOPICS</a></li>
                <li class="nav-item"><a href="" class="nav-link">ABOUT PROJECT</a></li>
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

                </ul>
                </li>
                </ul>`; 
    document.getElementsByTagName('nav')[0].innerHTML = navHTML;
}
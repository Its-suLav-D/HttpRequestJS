const listelement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method,url) {

    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            resolve(xhr.response)
            // const listOfPosts = JSON.parse(xhr.response     
        }
        xhr.send()
    })
   return promise
}


function fetchPosts()
{
    sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        for(const post of response) {
            const postEl = document.importNode(postTemplate.content, true); 
            postEl.querySelector('h2').textContent = post.title.toUpperCase()
            postEl.querySelector('p').textContent = post.body;
            listelement.append(postEl); 
        }
    })
    
}

fetchPosts()

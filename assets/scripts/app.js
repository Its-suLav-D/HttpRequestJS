const listelement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')
const form = document.querySelector('#new-post form')
const fetchButton = document.querySelector('#available-posts button')

const postList = document.querySelector('ul')

function sendHttpRequest(method,url, data = null) {

    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if(xhr.status >=200 && xhr.status <300){
                resolve(xhr.response)
                // const listOfPosts = JSON.parse(xhr.response   
            }

            reject(new Error('Something went Wrong'))
             
        }

        xhr.onerror = function() {
            reject(new Error("Failed to send Request!!!"))
        }
        xhr.send(JSON.stringify(data));

      
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
                postEl.querySelector('li').id = post.id;
                listelement.append(postEl); 
            }
        })
        .catch(error => {
            alert(error.message)
        })
    
    
}

async function createPost(title, content) {
    const postId = Math.random(); 
    const post ={
        title:title, 
        body: content, 
        userId: postId 
    };

    await sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
};

fetchButton.addEventListener('click', fetchPosts)

form.addEventListener('click', event => {
    event.preventDefault(); 
    const formTitle= event.currentTarget.querySelector('#title').value; 
    const formValue = event.currentTarget.querySelector('#content').value;
    createPost(formTitle, formValue); 
})



postList.addEventListener('click', event=> {
    if(event.target.tagName == "BUTTON") {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})
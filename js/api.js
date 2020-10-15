const baseUrl = "https://readerapi.codepolitan.com/";

function status(response){
    if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        // Method reject
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah objek jadi promise agar bisa diproses
        return Promise.resolve(response);
    }
}

// Parsing json jadi array javascript
function json(response) {
    return response.json();
}

// Handle error diblok catch
function error(error){
    // Parameter error dari Promise.reject()
    console.log(`Error: ${error}`);
}

// Request data json articles
function getArticles() {
    const endPoint = `${baseUrl}/articles`;
    fetch(endPoint)
    .then(status)
    .then(json)
    .then( data => {
        let articlesHTML = '';
        data.result.forEach(article => {
            articlesHTML += `
                <div class="card">
                    <a href="./article.html?id=${article.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${article.thumbnail}">
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title truncate"> ${article.title}</span>
                        <p> ${article.description} </p>
                    </div>
                </div>
            `;
        });
        // Insert element ke id #content
        document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
};
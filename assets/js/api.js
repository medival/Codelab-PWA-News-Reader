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
    if ("caches" in window) {
        caches.match(`${baseUrl}articles`).then(response => {
            if (response) {
                // console.log(response);
                response.json().then(data => {
                    let articlesHTML = "";
                    data.result.forEach(article=> {
                        articlesHTML += `
                            <div class="card">
                                <a href="./artice.html?id=${article.id}">${article.title}
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${article.thumbnail}">
                                    </div>      
                                </a>
                                <div class="card-content>
                                    <span class="card-title truncate"> ${article.title} </span>
                                    <p> ${article.description} </p>
                                </div>
                            </div>
                        `;
                    });
                    document.getElementById("articles").innerHTML=articlesHTML;
                });
            }
        });
    }

    const endPoint = `${baseUrl}articles`;
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

function getArticleById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
  
    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articleHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.result.cover}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.result.post_title}</span>
                  ${snarkdown(data.result.post_content)}
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
          });
        }
      });
    }
  
    fetch(base_url + "article/" + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
      });
  }
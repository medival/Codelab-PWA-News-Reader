const baseUrl = "https://readerapi.codepolitan.com/";

// Blok kode
// function status(respnse) {

// }

let status = response => {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// Blok kode parsing json -> array
let json = (response) => {
    return response.json();
}

// Blok kode handle catch
let error = (error) => {
    // Parameter error dr Promise.reject()
    console.log(`Error : ${error}`);
}

// Blok request data json
function getArticles() {
    if ("caches" in window) {
      caches.match(baseUrl + "articles").then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articlesHTML = "";
            data.result.forEach(function(article) {
              articlesHTML += `
                    <div class="card">
                      <a href="./article.html?id=${article.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${article.thumbnail}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${article.title}</span>
                        <p>${article.description}</p>
                      </div>
                    </div>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("articles").innerHTML = articlesHTML;
          });
        }
      });
    }

    fetch(baseUrl + "articles")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.result.forEach(function(article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.thumbnail}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.title}</span>
                  <p>${article.description}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

let getArticleById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    return new Promise(function(resolve, reject) {

      if ("caches" in window) {
          caches.match(baseUrl + "article/" + idParam).then(function(response) {
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
                resolve(data);
              });
            }
          });
      } 

      let endPoint = `${baseUrl}article/${idParam}`;


      fetch(endPoint)
      .then(status)
      .then(json)
      .then((data) => {
          console.log(data);
          let articleHTML = `
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
          document.getElementById("body-content").innerHTML = articleHTML;
          resolve(data);
      })
    })
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);

    var articlesHTML = "";
    articles.forEach(function(article) {
      var description = article.post_content.substring(0,100);
      articlesHTML += `
        <div class="card">
          <a href="./article.html?id=${article.ID}&save=true">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${article.cover}">
            </div>
          </a>
          <div class="card-content">
            <span class="card-title truncate">${article.post_title}</span>
            <p>${description}</p>
          </div>
        </div>
      `;
    });
    document.getElementById("body-content").innerHTML = articlesHTML;
  })
}

function getSavedArticleById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then(function(article) {
      articleHTML = "";
      var articleHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${article.cover}" />
          </div>
          <div class="card-content">
            <span class="card-title"> ${article.post_title} </span>
            ${snarkdown(article.post_content)}
          </div>
        </div>
      `;
      document.getElementById("body-content").innerHTML = articleHTML;
    })
}
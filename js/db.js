// Buat database
const dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "ID"
    });
    articlesObjectStore.createIndex("post_title", "post_title", { unique: false});
});
// Fitur add save for later
let saveForLater = (article) => {
    dbPromised
    .then((db) => {
        const tx = db.transaction("articles", "readwrite");
        const store = tx.objectStore("articles");
        console.log(article);
        store.add(article.result);
        return tx.complete;
    })

    .then(() => {
        console.log("Artikel berhasil disimpan");
    })
}
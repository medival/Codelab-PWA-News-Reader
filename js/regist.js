if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then( () => {
            console.log("Pendaftaran serviceWorker berhasil");
        })
        .catch( () => {
            console.log("Pendaftaran serviceWorker gagal")
        });
    });
} else {
    console.log("serviceWorker not supported for this browser");
}
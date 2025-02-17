// Function to cache the actual content of index.html
function cacheHTMLFromIndex() {
    fetch('schoolsnice/index.html')
        .then(response => response.text())
        .then(htmlContent => {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('offlinePageWithJS', htmlContent);
                console.log("Index.html content cached successfully!");
            } else {
                console.log("localStorage is not supported.");
            }
        })
        .catch(error => console.error("Error fetching index.html:", error));
}

// Function to completely replace the page with cached content
function injectCachedHTMLWithJS() {
    const cachedHTML = localStorage.getItem('offlinePageWithJS');
    if (cachedHTML) {
        console.log("Offline and no service worker detected. Loading cached content...");
        document.open();
        document.write(cachedHTML);
        document.close();
    } else {
        console.log("No cached HTML found.");
    }
}

// Cache the current index.html content
cacheHTMLFromIndex();

// Function to check if a service worker is enabled
function isServiceWorkerEnabled() {
    return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
}

// Check conditions when the page loads
window.onload = function() {
    if (!navigator.onLine && !isServiceWorkerEnabled()) { 
        injectCachedHTMLWithJS(); // Now replaces entire page
    } else {
        console.log("Online or service worker is enabled. No need to load cache.");
    }
};

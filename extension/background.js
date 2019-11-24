// Return for contentscript id of app searching by name 
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if(msg.getId){
            chrome.management.getAll(function (res){           
                port.postMessage(res.find(function (el) {
                    return el.name === "Dashboard mDNS"}).id);
            });
        }
    });
});
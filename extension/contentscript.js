var newdiv = document.createElement('div'); 
var button = document.createElement('button'); 
var ul = document.createElement('ul');
var res = {};


button.innerHTML="Recuperar";
button.addEventListener("click", sendMessage) ;

/**
 * Using chrome api communication 
 * More on: https://developer.chrome.com/apps/messaging
 */
var appId;
// Find app id to start comunicate
function findAppId(){
    let port = chrome.runtime.connect({name: "port"});
    port.postMessage({getId: true});
    port.onMessage.addListener(function(msg) {     
        appId = msg;  
    });
}  
findAppId();

// Send message to app and create a list with response
function sendMessage() {
    if(appId){
        let port = chrome.runtime.connect(appId);
        port.postMessage({request: true});
        port.onMessage.addListener(function(msg) {                
            createList(msg);
        });
    }else{
        var strong = document.createElement('strong');
        strong.innerHTML = "You need to install Dashboard mDNS app";
        ul.appendChild(strong);
    }
}

function createList(arr){
    ul.innerHTML = "";
    arr.forEach(function(el) {
        var li = document.createElement('li');
        li.innerHTML = el.service;        
        let ulIp = document.createElement('ul');
        el.ips.forEach(function(ip){            
            let liIp = document.createElement('li');
            liIp.innerHTML = ip;
            ulIp.appendChild(liIp);
        })
        li.appendChild(ulIp);
        ul.appendChild(li);
    });
}

// Inject list on page
newdiv.appendChild(button);
newdiv.appendChild(ul);
document.body.appendChild(newdiv);

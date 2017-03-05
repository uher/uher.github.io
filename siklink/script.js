console.log("in script.js");

var g_params = '';

function checkUserDevice() {

    var isIPhone = false;
    var useragent = navigator.userAgent.toLowerCase();

    if( useragent.search("iphone") )
        isIPhone = true;
    else if( useragent.search("ipod") )
        ; // ipod
    else if( useragent.search("android") )
        ; // android


    console.log("is iphone : " + isIPhone);
    return isIPhone;
}


function getHashParams(hashString) {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = hashString;
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}


deli = '?';


function main() {

    console.log("main fucntion");


    

    var hash = window.location.hash;
   
   var state;
   var params = {};
   var hashString;
   
   if (hash.length > 1) {
       
       var splited = hash.substring(1).split(deli); 
       state = splited[0];
       hashString = splited[1];
       g_params = getHashParams(hashString);  
       params = g_params;
   } else {
       state = 'init';
   }





    // 1 query string...

    // if ios redirect to sik app


    // else sik hompage load.
    // and embed player update.

    

    if (checkUserDevice()) {


        // redirect sik!!!!


    } else {



    }

}


main();
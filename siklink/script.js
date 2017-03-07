console.log("in script.js");

var g_params = '';
var g_iframe = '';


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

function generateEmbedPlayer(playlistid, ownerid) {


{/*<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A2PXdUld4Ueio2pHcB6sM8j" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>*/}

    var iframe = '<iframe src="https://embed.spotify.com/?uri=spotify:user:__OWNERID__:playlist:__PLAYLISTID__" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'

    iframe = iframe.replace("__OWNERID__", ownerid);
    iframe = iframe.replace("__PLAYLISTID__",playlistid); 

    return iframe;
}


function generateSiklinkUrl(playlistid, ownerid) {

    // sik://play/playlist?playlistid=5O2ERf8kAYARVVdfCKZ9G7&amp;ownerid=spotify
    var url = "sik://play/playlist?playlistid=" + playlistid + "&" + "ownerid=" + ownerid;

    console.log("generated url : " + url);

    
    window.location.replace(url);
    //     setTimeout(function () {
    //   window.location.replace("http://getsik.io/");
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
   
//    var div = document.createElement('div');
//     div.innerHTML = "<h1>hash string: " + hash +"</h1>";
//     var elements = div.childNodes;
//     document.body.appendChild(div);


   if (hash.length > 1) {
       
       var hashString = hash.substring(1); 
       g_params = getHashParams(hashString);



    //    var div = document.createElement('div');
    //      div.innerHTML = "<h1>g_params string: " + g_params +"</h1>";
    //     document.body.appendChild(div);


       params = g_params;
   } else {
       state = 'init';
   }


   var playlistId = params.playlistid;
   var ownerId = params.ownerid;


   var iframe = generateEmbedPlayer(playlistId, ownerId);

   console.log("iframe : " + iframe);

   g_iframe = iframe;


    var div = document.createElement('div');
    div.innerHTML = iframe;
    var elements = div.childNodes;
    document.body.appendChild(div);
    // 1 query string...

    // if ios redirect to sik app


    // else sik hompage load.
    // and embed player update.

    
    

    if (checkUserDevice()) {

        generateSiklinkUrl(playlistId, ownerId);

        // redirect sik!!!!


    } else {



    }

}


main();
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

    var iframe = '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3A__OWNERID__%3Aplaylist%3A__PLAYLISTID__&theme=white" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'

    iframe = iframe.replace("__OWNERID__", ownerid);
    iframe = iframe.replace("__PLAYLISTID__","playlistid"); 

    return iframe;
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
       
       var hashString = hash.substring(1); 
       g_params = getHashParams(hashString);  
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


//    var iframe = document.createElement('iframe');
//     iframe.style.display = "none";
//     iframe.src = /* your URL here */;
    document.body.appendChild(div);
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
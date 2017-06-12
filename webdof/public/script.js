
console.log("Called in js");

var d = document;
var g_trackId;
var g_trackInfo;
var g_player;

function main() {
    
    console.log("main start");

    // init
    g_player = document.getElementById('player');
    addClickListener();
}

function playTrack(trackId) {

    console.log("play track!");
    // playTrack!
    g_trackInfo = getTrackInfo(trackId);

    previewUrl = g_trackInfo['preview_url'];

    g_player.pause();

    console.log('previewUrl: ' + previewUrl);
    if (previewUrl != null) {
        // play track on web
        g_player.src = previewUrl;
        g_player.play();

    } else {
        // play track with spotify
        var url = "https://open.spotify.com/track/"  + g_trackInfo.id;
        var win = window.open(url, '_blank');
        win.focus(url);
    }

    // Update UI
    updateUI(g_trackInfo)

}

function updateUI(trackInfo) {

   console.log("update UI!");
   textTitle = document.getElementById('title');
   textArtist = document.getElementById('artist');

   // get title
   textTitle.innerText = trackInfo.name;
   
   // get artist
   text = '';
   artists = trackInfo['artists'];
   
    for (i = 0 ; i < artists.length ; i++) {

        text += artists[i].name;

        if (i != artists.length - 1) {
            text += ", "
        }
    }

    textArtist.innerText = text;
}

// etc

function getTrackInfo(id) {
    var http_request = new XMLHttpRequest();
    var url = 'https://api.spotify.com/v1/tracks/' + id;
    http_request.open("GET", url, false);
    http_request.send(null);
    g_currentTrack = JSON.parse(http_request.responseText);
    
    return g_currentTrack;
}


// Cotorll Feedback

function sendFeedback(feedback, trackId) {

    console.log("sendfeedback. feedback: " + feedback, ", trackId:" + trackId);

    sendUrl = window.location.origin + "/track/" + feedback + "/" + trackId;

    $.ajax({
        url: sendUrl,
        type: 'GET',
        success: function (response) {

            console.log("response: " + response);

            // auto play
            onClickedGetTrack();

        },
        error: function (response) {
            console.log('error in GET track');
        },
    }).done(function (data) {
        console.log('getTrack complented');
    });

}

function onClickedGetTrack() {
    console.log("onClickedGetTrack start");

    $.ajax({
        url: window.location.origin + "/track",
        type: 'GET',
        success: function (response) {

            console.log("response: " + response);

            g_trackId = response;
            playTrack(g_trackId);

        },
        error: function (response) {
            console.log('error in GET track');
        },
    }).done(function (data) {
        console.log('getTrack completed');
    });
}

function onClickedLike() {
    console.log("onClickedLike start");
    sendFeedback("like", g_trackId);
}

function onClickedDislike() {    
    console.log("onClickedDislike start");
    sendFeedback("dislike", g_trackId);
}

function onClickedNeutral() {
    console.log("onClickedNeutral start");
    sendFeedback("neutral", g_trackId);
}

function addClickListener() {
    d.getElementById('btn-gettrack').addEventListener('click', onClickedGetTrack);
    d.getElementById('btn-like').addEventListener('click', onClickedLike);
    d.getElementById('btn-dislike').addEventListener('click', onClickedDislike);
    d.getElementById('btn-neutral').addEventListener('click', onClickedNeutral);
}

// App start.
main();
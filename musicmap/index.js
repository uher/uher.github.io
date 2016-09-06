
// "use strict"

var g_jsonObj;
var VIEW_SIZE = 1500;
var SCALE = VIEW_SIZE/5;
var RADIUS = 4;
var TEST = true;
var TEST = false;
;

var g_svgContainer;
var g_currentTrack;

var PLAY_MODE = {
    WEB: {value:0, text: 'Play on Browser'},
    SPOTIFY: {value:0, text: 'Play on Spotify'}
}

var COLOR_PLAY = "#E64A19";
var COLOR_NONE = "#757575";

var g_play_mode = PLAY_MODE.WEB;

var currentPlayingId = '';
var nowpending = '';
var spotifyPlayer = '';
var textTitle= '';

function init() {
    console.log('init!!!');
    spotifyPlayer = document.getElementById('spotifyplayer');
    textTitle = document.getElementById('text-title');
    d3.json('output.txt', draw);
}

function getTrackInfo(id) {
    var http_request = new XMLHttpRequest();
    var url = 'https://api.spotify.com/v1/tracks/' + id;
    http_request.open("GET", url, false);
    http_request.send(null);
    g_currentTrack = JSON.parse(http_request.responseText);
    
    return g_currentTrack;
}

function playMusic(id, me) {

    console.log('playMusic()!!')

    window.clearTimeout(nowpending);

    

    if (id == currentPlayingId) {
        console.log('play music');
        // pause
        spotifyPlayer.pause();
        currentPlayingId = '';
    } else {
        // play

        var trackInfo = getTrackInfo(id);
        var previewurl;

        if ('preview_url' in trackInfo) {
            previewurl = trackInfo['preview_url'];
        } else {
            previewurl = null;
        }

        console.log('previewurl : ' + previewurl);

        
        currentPlayingId = id;
            
        if (g_play_mode == PLAY_MODE.WEB) {

            if (previewurl) {
                spotifyPlayer.src = previewurl;
                spotifyPlayer.play();
                }

        } else {
            // play on spotify
            var url = "https://open.spotify.com/track/"  + id;
            var win = window.open(url, '_blank');
            win.focus(url);
            spotifyPlayer.pause();       
        } 
        
        textTitle.textContent = 'Artist:' + g_currentTrack['artists'][0].name + ', Title: '  + g_currentTrack.name

    }
}


var g_currentCircle = '';
function onClickedItem(data, me) {
    console.log('clicked!! : ' + data.id);
    playMusic(data.id, me);

    if (g_currentCircle != '') {
        g_currentCircle.style.fill = COLOR_NONE;
    }

    g_currentCircle = me;
    g_currentCircle.style.fill = COLOR_PLAY;

}

function onClickedSwitch(me) {
    console.log("log..." + me);
    
    spotifyPlayer.pause();
    if (g_play_mode == PLAY_MODE.WEB) {
        g_play_mode = PLAY_MODE.SPOTIFY;
    } else {
        g_play_mode = PLAY_MODE.WEB;
    }

    me.textContent = g_play_mode.text;
}

function draw(data) {
    g_jsonObj = data;

    if (TEST) {
        g_jsonObj = g_jsonObj.slice(0, 10);
    }

    g_svgContainer = d3.select('body')
            .append('svg')
                .attr('width', VIEW_SIZE)
                .attr('height', VIEW_SIZE)
    
    var circles = g_svgContainer.selectAll('circle')
            .data(g_jsonObj)
            .enter()
            .append('circle');

    var circleAttributes = circles
                            .attr('cx', function (d) { return parseFloat(d.x) * SCALE + VIEW_SIZE / 2;} )
                            .attr('cy', function (d) { return parseFloat(d.y) * SCALE + VIEW_SIZE / 2;} )
                            .attr('r', function (d) { return RADIUS;})
                            // .attr('onclick', function (d) { onClickedItem(d); })
                            .on('click', function (d) {return onClickedItem(d, this);})
                            .style('fill', function (d) { return COLOR_NONE})
    
}

init();



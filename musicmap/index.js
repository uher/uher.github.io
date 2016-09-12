
// "use strict"

var g_jsonObj;
var VIEW_SIZE = 1500;
var SCALE = VIEW_SIZE/5;
var RADIUS = 4;
// var TEST = true;
var TEST = false;


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
var currentData = ''
var nowpending = '';
var spotifyPlayer = '';
var textTitle= '';

function init() {
    console.log('init!!!');
    spotifyPlayer = document.getElementById('spotifyplayer');
    textTitle = document.getElementById('text-title');
    d3.json('map.json', draw);
}

function getTrackInfo(id) {
    var http_request = new XMLHttpRequest();
    var url = 'https://api.spotify.com/v1/tracks/' + id;
    http_request.open("GET", url, false);
    http_request.send(null);
    g_currentTrack = JSON.parse(http_request.responseText);
    
    return g_currentTrack;
}

function playMusic(data, me) {

    console.log('playMusic()!!')

    window.clearTimeout(nowpending);

    

    if (data.id == currentPlayingId) {
        console.log('play music');
        // pause
        spotifyPlayer.pause();
        currentPlayingId = '';
    } else {
        // play

        // var trackInfo = getTrackInfo(data.id);
        var previewurl = null;

        if (data['preview_url'] != null) {
            previewurl = data['preview_url'];
            console.log('spotify preview url null');

        } else {

            console.log('find preview in apple');

            if ('apple_info' in data) {

                try {
                    if ('previewUrl' in data['apple_info']) {
                        previewurl = data['apple_info']['previewUrl'];
                        console.log('finded preview in apple!!!');
                    } else {
                        console.log('No preview Url in Apple Info');
                    }
                } catch (e) {
                    console.log("error" + e);
                }
            } else {
                console.log('No apple info');      
            }
        }

        console.log('previewurl : ' + previewurl);

        
        currentPlayingId = data.id;
        currentData = data;
        
        if (g_play_mode == PLAY_MODE.WEB && previewurl ) {

            spotifyPlayer.src = previewurl;
            spotifyPlayer.play();

        } else {
            // play on spotify
            var url = "https://open.spotify.com/track/"  + data.id;
            var win = window.open(url, '_blank');
            win.focus(url);
            spotifyPlayer.pause();       
        } 
        
        textTitle.innerHTML = makeDescription(data);

    }
}


var g_currentCircle = '';
function onClickedItem(data, me) {

    playMusic(data, me);

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

g_genres = ''
index = 0
function makeDescription(data) {
    // title
    // artists
    // spotify genre
    // apple genre
    // gracenote genre
    // gracenote mood

    description = "Title  : " + data.name + "\n";

    description += "Artist : "

    artists = data['artists'];

    for (i = 0 ; i < artists.length ; i++) {

        description += artists[i].name;

        if (i != artists.length - 1) {
            description += ", "
        }
    }

    description += '<br/>'
    description += "Spotify Genre : ";

    if ('genres' in data) {
        genres = data['genres'];
        g_genres = genres;

        console.log('spotify genre length : ' + genres.length)
        for (i = 0 ; i < genres.length ; i++) {
            description += genres[i] + ", ";
            console.log('spotify genre: ' + genres[i])
        }
    }

    description += '<br/>'
    description += "Apple Genre : ";

    if ('apple_info' in data) {
        description += data.apple_info.primaryGenreName;
    }

    description += '<br/>'
    description += "Gracenote Genre : "


    if ('gracenote_info' in data) {

        if ('genre' in data['gracenote_info']) {
            
            // this is object.
            genres = data.gracenote_info.genre;

            keys = Object.keys(genres)

            for (i = 0; i < keys.length; i++) {
                description += genres[keys[i]].TEXT;
                if (i != keys.length - 1) {
                    description += ", "
                }
            }
        }
    }
    
    description += "<br/>"
    description += "Gracenote Mood : "

    if ('gracenote_info' in data) {
        if ('mood' in data['gracenote_info']) {

            moods = data['gracenote_info']['mood'];
            keys =  Object.keys(moods);



            for (i = 0; i < keys.length; i++) {
                description += moods[keys[i]].TEXT;

                if (i != data.gracenote_info.length -1) {
                    description += ", "
                }
            }
        }
    }

    return description;
}


function draw(data) {
    console.log('start draw');
    g_jsonObj = data;

    if (TEST) {
        g_jsonObj = g_jsonObj.slice(0, 10);
    }

    g_svgContainer = d3.select('body')
            .append('svg')
                .attr('width', VIEW_SIZE)
                .attr('height', VIEW_SIZE)
    

    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#4DB6AC")
    .style("margin", "5px")
    .html(" ");


    var circles = g_svgContainer.selectAll('circle')
            .data(g_jsonObj)
            .enter()
            .append('circle').on("mouseover", function(d){tooltip.html(makeDescription(d)); return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    
    // circles.append('svg:title').text(function (d) { return d.})

    var circleAttributes = circles
                            .attr('cx', function (d) { return parseFloat(d.x) * SCALE + VIEW_SIZE / 2;} )
                            .attr('cy', function (d) { return parseFloat(d.y) * SCALE + VIEW_SIZE / 2;} )
                            .attr('r', function (d) { return RADIUS;})
                            // .attr('onclick', function (d) { onClickedItem(d); })
                            .on('click', function (d) {return onClickedItem(d, this);})
                            .style('fill', function (d) { return COLOR_NONE})
                            .style("stroke", "yellow")
                            .style("stroke-width", "0.5px");

    
}

init();



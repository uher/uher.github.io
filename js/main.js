'use strict';

// TODO
// API KEY: AIzaSyAq6KXhw-ktfX8CrKguH07hqPFbbHwnm_I

var d = document;
var endpoint;

var err = d.getElementById('error');

err.innerText = "start regist service worker";


if ('serviceWorker' in navigator) {
    
    // console.log('error tag: ' + d.getElementById('error'));

    console.log('Service worker is supported!');
    err.innerText = 'Service worker is supported';
    navigator.serviceWorker.register('sw.js', { insecure: true }).then(function(reg) {
        
        

        console.log(':^)', reg);
        //TODO?
         err.innerText = 'registing pushManager';

        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {

            err.innerText = 'done!. sub is:\n' + sub; 

            console.log('endpoint:', sub.endpoint);
            endpoint = sub.endpoint;

            var t = d.getElementById('token');

            t.value = endpoint
            //t.innerText = sub.endpoint;
            
            
            // sub endpoint:
            // https://android.googleapis.com/gcm/send/c8eKpMdjCkM:APA91bHEzUoSIV4l7tY6kN2K0dEJL2MCT5XEiWaEz5mC4rHDjRs_VifbEybUfJM8HPnIlQ0d3Ho_asRYl_zqUsZ5aLV27tiAfSrpu5xEaBMVjl_HUIrg3MNYKVTZrMFMDSGJG2noprcF
            
            // canary
            // https://android.googleapis.com/gcm/send/fwsbc733B6g:APA91bG6wcqwtDoL7WFJjTnPK77BawAdmq-sj0wOTR-htMJqZ_xU8KqVHqGTJE6BVFDgtAx9xpNMmHkKoZn_IwSHhqwNTZeRQetsh7p1fDmZ7pIZx_NqCXlyEEUbWrYnwMrF9SnAnYpa
        }, function(error) {

            err.innerText = 'error in subscribe. error:\n' + sub;

        });

    }).catch(function(err) {
        console.log(':^(', err);
        
        var err = d.getElementById('error');

        err.innerText = "error in registing service worker. error msg:\n" + err;
    });
} else {
    err.innerText = "Not supported Service worker";
}

function ClipBoard_() {

    var t = d.getElementById('token');
    
    Copied = t.createTextRange();
    console.log("coped: " + Copied);
    Copied.execCommand("Copy");
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

(function(){
    new Clipboard('#copy-button');
})();


// curl --header "Authorization: key=AIzaSyAq6KXhw-ktfX8CrKguH07hqPFbbHwnm_I" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"erw7xn0ScMs:APA91bF47DaZr_67L27vayVOS55ZwLKgZ6ReOCzv1zqQGGUUsJHMyCD2c5hBvjnLtGQNsns1enhvv6n_8P9xPXNpY0yxskLFlqnVmR64f1OGWaYiHCWzoJBN9XxEjYHGOjyK7DN-GVVx\"]}"


// curl --header "Authorization: key=AIzaSyAq6KXhw-ktfX8CrKguH07hqPFbbHwnm_I" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fwsbc733B6g:APA91bG6wcqwtDoL7WFJjTnPK77BawAdmq-sj0wOTR-htMJqZ_xU8KqVHqGTJE6BVFDgtAx9xpNMmHkKoZn_IwSHhqwNTZeRQetsh7p1fDmZ7pIZx_NqCXlyEEUbWrYnwMrF9SnAnYpa\"]}"



// curl --header "Authorization: key=AIzaSyAq6KXhw-ktfX8CrKguH07hqPFbbHwnm_I" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fWMqAxzg4mM:APA91bHr8xqyQLPfMASkai8kmKiBqw9vGBD5nTGKzL22_3CD-YsWJQWv6RnqTtS_LoDPHcvNyZjgTrGjgzwhdpC2RBVUFOBrlSg1cdGmRQWsvQB9G_3uyVUHSTtdDS8tfql4zSvzfQC2\"]}"


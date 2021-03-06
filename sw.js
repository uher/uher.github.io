/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

var g_event;
var g_noti_event;

'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  console.log('Installed', event);
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

var event
self.addEventListener('push', function(event) {

  console.log('Push message', event);
  g_event = event;
  var title = 'Push message';

  event.waitUntil(
    self.registration.showNotification(title, {
      'body': 'The Message',
      'icon': 'images/icon.png',
      'tag' : 'my tag'
    }));
});


console.log('re-run...');

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click tag:', event.notification.tag);
    
    g_noti_event = event;

    event.notification.close();
    // var url = 'https://youtu.be/gYMkEMCHtJ4';
    // var url = "https://open.spotify.com/user/gukhyeon/playlist/5obyUkls1V8moSCbd7SgxQ#Intent;scheme=http;package=com.spotify.music;end";


    // working
    // var url = "intent://spotify:user:gukhyeon:playlist:5obyUkls1V8moSCbd7SgxQ";

    var url = "https://uher.github.io/index2";

    // not working   
    // android-app://{package_id}[/{scheme}[/{host}[/{path}]]][#Intent;{...}]
    // var uri = "android-app://com.spotify.music/https://open.spotify.com/user/gukhyeon/playlist/5obyUkls1V8moSCbd7SgxQ"
    // var uri = "android-app://com.spotify.music/https://open.spotify.com/user/gukhyeon/playlist/5obyUkls1V8moSCbd7SgxQ#Intent;action=com.example.MY_ACTION;end"
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});



// This is others option for adding click listener

// self.onnotificationclick = function(event) {
//   console.log('On notification click: ', event.notification.tag);
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(clients.matchAll({
//     type: "window"
//   }).then(function(clientList) {
//     for (var i = 0; i < clientList.length; i++) {
//       var client = clientList[i];
//       if (client.url == '/' && 'focus' in client)
//         return client.focus();
//     }
//     if (clients.openWindow)
//       return clients.openWindow('/');
//   }));
// };
    



//Browser key: AIzaSyAq6KXhw-ktfX8CrKguH07hqPFbbHwnm_I

'use strict';

/* eslint-env browser, serviceworker */

importScripts('./scripts/analytics.js');

self.analytics.trackingId = 'UA-79003627-1';

self.addEventListener('push', function(event) {
  console.log('Received push');
  let notificationTitle = 'Hello';
  const notificationOptions = {
    body: 'Thanks for sending this push msg.',
    icon: './images/icon-192x192.png',
    tag: 'simple-push-demo-notification',
    data: {
      // url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/'
      url: 'https://uher.github.io/index2'
    }
  };

  if (event.data) {
    const dataText = event.data.text();
    notificationTitle = 'Received Payload';
    notificationOptions.body = `Push data: '${dataText}'`;
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(
        notificationTitle, notificationOptions),
      self.analytics.trackEvent('push-received')
    ])
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  let clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    // clickResponsePromise = clients.openWindow(event.notification.data.url);
    clickResponsePromise = clients.openWindow('https://uher.github.io/index2');
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise,
      self.analytics.trackEvent('notification-click')
    ])
  );
});

self.addEventListener('notificationclose', function(event) {
  event.waitUntil(
    Promise.all([
      self.analytics.trackEvent('notification-close')
    ])
  );
});

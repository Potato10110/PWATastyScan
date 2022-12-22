window.onload = () => {
    'use strict';

    navigator.serviceWorker.register('/public/sw.js').then(function(registration) {
      console.log('Service Worker registered with scope: ', registration.scope);
    }).catch(function(error) {
      console.error('Error registering Service Worker: ', error);
    });

    /*if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/public/sw.js').then(function(registration) { //To check if the registration is success
        console.log('SW registration succeeded with scope:', registration.scope);
      }).catch(function(e) {
        console.log('SW registration failed with error:', e);
      });
    }*/
  }
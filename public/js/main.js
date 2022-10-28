window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) { //To check if the registration is success
        console.log('SW registration succeeded with scope:', registration.scope);
      }).catch(function(e) {
        console.log('SW registration failed with error:', e);
      });
    }
  }
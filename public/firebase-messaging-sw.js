// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBSY3EBjz73WT3F06LzwlL1_qGOOVPR888",
    authDomain: "vue-push-test-cde69.firebaseapp.com",
    projectId: "vue-push-test-cde69",
    storageBucket: "vue-push-test-cde69.appspot.com",
    messagingSenderId: "289423162632",
    appId: "1:289423162632:web:de726a6e13c275ac2040bd",
    measurementId: "G-YGFXX0S5BK",
});

// 2단계 config와 같게 진행
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging();

// 브라우저가 꺼진후에도 진행되어질수 있도록하는 method
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

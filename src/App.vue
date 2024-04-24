<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "vue-push-test-cde69.firebaseapp.com",
//     projectId: "vue-push-test-cde69",
//     storageBucket: "vue-push-test-cde69.appspot.com",
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// const messaging = getMessaging();

// Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//         console.log("Notification permission granted.");
//     } else {
//         console.log("Unable to get permission to notify.");
//     }
// });

// onMessage(messaging, (payload) => {
//     console.log("Message received. ", payload);
//     // ...
// });
// getToken(messaging, {
//     vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
// })
//     .then((currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             console.log("currentToken", currentToken);
//             // ...
//         } else {
//             // Show permission request UI
//             console.log("No registration token available. Request permission to generate one.");
//             // ...
//         }
//     })
//     .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//     });
</script>

<template>
    <component :is="$route.meta.layout">
        <router-view></router-view>
    </component>
</template>

<style scoped></style>

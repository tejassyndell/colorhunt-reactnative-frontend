importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCP0tqLlappvqjHC4FqKsaTdjJIb4jZKmM",
    authDomain: "pushnotification-22eeb.firebaseapp.com",
    projectId: "pushnotification-22eeb",
    storageBucket: "pushnotification-22eeb.appspot.com",
    messagingSenderId: "456358245923",
    appId: "1:456358245923:web:37776161a045686f73e396",
    measurementId: "G-WT7ZDZXSJR"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
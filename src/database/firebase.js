import firebase from "firebase";

const config = {
    apiKey: "94h7GnQCQKGgwJNdYkOgkY2zf9VsTdvgBZx0KZeS",
    authDomain: "iot-system-bf0ba-default-rtdb.firebaseio.com",
    databaseURL: "https://iot-system-bf0ba-default-rtdb.firebaseio.com",
    projectId: "iot-system-bf0ba",
    storageBucket: "iot-system-bf0ba.appspot.com",
    messagingSenderId: "945629110560"
};
firebase.initializeApp(config);

// export default firebase;
// vì test thử database nên ta export database trong firebase
export const database = firebase.database();
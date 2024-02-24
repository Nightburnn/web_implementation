/*
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp0L0dA9VZc2d_LHqXVGB9UdcMsUVajmI",
  authDomain: "web-implementation-9e055.firebaseapp.com",
  projectId: "web-implementation-9e055",
  storageBucket: "web-implementation-9e055.appspot.com",
  messagingSenderId: "911762071689",
  appId: "1:911762071689:web:468786ac2889747df72658",
  measurementId: "G-899CQMMC01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize variables

const auth = firebase.auth()
const database = firebase.database()

// Register function
function register() {
    // Get the input values
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    // Reset previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validate email
    if (!validate_email(email)) {
        document.getElementById('emailError').textContent = 'Email already exists';
        return;
    }

    // Validate password
    if (!validate_password(password)) {
        document.getElementById('passwordError').textContent = 'Password must be least 8 characters';
        return;
    }

    // If all validations pass, proceed with registration
    // You can add Firebase registration logic here

auth.createUserWithEmailAndPassword(email, password)
.then(function(){

})
.catch(function(error){
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
})
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;

    if (expression.test(email)) {
        // Email validated
        return true;
    } else {
        // Email error
        return false;
    }
}

function validate_password(password) {
    passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
}
*/
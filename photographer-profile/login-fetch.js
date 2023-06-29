const login = document.querySelector('#submit');
const loginUser = async (e) => {
    e.preventDefault();
    let email = document.getElementById('inputEmails').value;
    let password = document.getElementById('inputPassword').value;
    let data = JSON.parse(localStorage.getItem('data'));
    document.getElementById('signupForm').reset();
    let token = await fetch(`http://localhost:8080/photographer/authtoken?name=${data.name}&password=${password}`);
                console.log(token);
    try {
        
        let response = await fetch(`http://localhost:8080/photographer/signin?email=${email}&password=${password}`);
        
        if (response.status === 400) {
            window.alert('Please verify your account');
        } else if (response.ok) {
            let data = await response.json();
            // Store the data in localStorage
            localStorage.setItem('data', JSON.stringify(data));

            console.log(data.authToken);
            // ganarate a JWT token
            // store the token to the local storage

            window.location.href = 'profile-album.html';

        } else {
            window.alert('Invalid Credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

login.addEventListener('click', loginUser);
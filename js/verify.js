const verify = document.querySelector('#verify');

const verifyUser = async (e) => {
    e.preventDefault();

    let email = document.getElementById('verifyemail').value;
    let otp = document.getElementById('verifyotp').value;

    document.getElementById('verifyForm').reset();

    let response = await fetch('http://localhost:8080/customer/validate?email=' + email + '&otp=' + otp)
    //let response = await fetch('http://localhost:8080/validate?email=gopiajt23@gmail.com&otp=0')
    if (response.ok) {
        window.alert('Your Account has been verified Please Login');
        window.open('/loginPage.html');
    }
    else {
        window.alert('Invalid');
    }
    console.log(response);
};

verify.addEventListener('click', verifyUser);
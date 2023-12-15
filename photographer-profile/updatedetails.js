const updateDetails = document.getElementById('updateDetails');

async function details() {
    let name = document.getElementById('name').value;
    let email = data.email;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let serviceLocation = document.getElementById('serviceLocation').value;
    let languagesKnown = document.getElementById('languagesKnown').value;
    let services = document.getElementById('services').value;
    let experience = document.getElementById('experience').value;
    let description = document.getElementById('description').value;

    let token = data.authToken;

    let response = await fetch('http://localhost:8080/photographer/updateBasicInfo', {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            serviceLocation: serviceLocation,
            languages: languagesKnown,
            services: services,
            experience: experience,
            aboutMe: description,
        })
    })
    console.log(response);
    if (response.status == 200) {
        data.name = name;
        data.phoneNumber = phoneNumber;
        data.serviceLocation = serviceLocation;
        data.languages = languagesKnown;
        data.services = services;
        data.experience = experience;
        data.aboutMe = description;

        localStorage.setItem('data', JSON.stringify(data));
        window.alert('updated successfully!');
    }
    if (response.status == 409) {
        window.alert('error');
    }
}

updateDetails.addEventListener('click', details);


// Event listener for "Send OTP" button
const sendOtpButton = document.getElementById('sendOtp');
sendOtpButton.addEventListener('click', function () {
    // Implement logic to send OTP via emails
    // You can use fetch or any other method here
    console.log('Sending OTP...');
});

// Event listener for "Update" button
const updatePasswordButton = document.getElementById('updatePassword');
updatePasswordButton.addEventListener('click', function () {

    const oldPasswordInput = document.getElementById('oldPassword');
    const newPassword1Input = document.getElementById('newPassword1');
    const newPassword2Input = document.getElementById('newPassword2');
    const otpInput = document.getElementById('otp');
    // Validate form inputs
    if (!validateForm()) {
        return;
    }

    // Fetch API to reset password
    const resetData = {
        oldPassword: oldPasswordInput.value,
        newPassword: newPassword1Input.value,
        otp: otpInput.value,
    };

    fetch('your_reset_password_api_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            return response.json();
        })
        .then(data => {
            // Password reset successful, handle accordingly (e.g., show success message)
            console.log('Password reset successful', data);
        })
        .catch(error => {
            // Handle errors (e.g., show error message)
            console.error('Error resetting password', error);
        });
});

// Function to validate form inputs
function validateForm() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword1 = document.getElementById('newPassword1').value;
    const newPassword2 = document.getElementById('newPassword2').value;
    const otp = document.getElementById('otp').value;

    // Check if any field is empty
    if (!oldPassword || !newPassword1 || !newPassword2 || !otp) {
        alert('Please fill in all fields.');
        return false;
    }

    // Check if the new passwords match
    if (newPassword1 !== newPassword2) {
        alert('New passwords do not match.');
        return false;
    }

    // Add more validation logic as needed

    // If all validation passes, return true
    return true;
}

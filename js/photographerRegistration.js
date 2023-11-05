// Function to handle form submission
const submitForm = async (event) => {
    event.preventDefault(); // Prevent form from submitting and page refreshing

    // Fetch form values
    const name = document.getElementById('first_name').value;
    const email = document.getElementById('email').value;
    console.log(email);
    const phoneNumber = document.getElementById('phone_number').value;
    const serviceLocation = document.getElementById('service_location').value;
    const languagesKnown = document.getElementById('languages_known').value;
    const services = document.getElementById('services').value;
    const experience = document.getElementById('experience').value;
    const aboutMe = document.getElementById('about_me').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password_confirm').value;

    // Get the selected profile photo file
    // const profilePhotoInput = document.getElementById('profilePhoto');
    // const profilePhotoFile = profilePhotoInput.files[0];


    document.getElementById('form').reset();
    // Make API call to send form data to the backend
    let response = await fetch('http://localhost:8080/photographer/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Corrected capitalization
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
            aboutMe: aboutMe,
        })
    })
    console.log(response);
    if (response.status == 201) {
        // window.alert('please verify your email')

    }
    if (response.status == 409) {
        window.alert('Email Alredy exists');
    }
};



// Add event listener to the form's submit event
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

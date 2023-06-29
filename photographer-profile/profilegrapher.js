// Retrieve the data from localStorage
let data = JSON.parse(localStorage.getItem('data'));


function previewImages(event) {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = ''; // Clear previous previews

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = document.createElement('img');
        image.classList.add('preview-image');
        image.src = URL.createObjectURL(file);

        previewContainer.appendChild(image);
    }
}

function previewEquipment(event) {
    const previewContainer = document.getElementById('previewEquipContainer');
    previewContainer.innerHTML = ''; // Clear previous previews

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = document.createElement('img');
        image.classList.add('preview-image');
        image.src = URL.createObjectURL(file);

        previewContainer.appendChild(image);
    }
}

const form = document.getElementById('galleryForm');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve selected category
    const category = document.getElementById('category').value;

    // Retrieve selected images
    const imageFiles = document.getElementById('images').files;
    const image = [];

    // Add each selected image file to the array
    for (var i = 0; i < imageFiles.length; i++) {
      image.push(imageFiles[i]);
    }
    const photographerName = data.name;

    const token = data.authToken;
    console.log(token);
    // Perform validation, if necessary

    // Send the form data to the server using AJAX
    fetch('http://localhost:8080/photographer/add', {
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            file: image,
            category: category,
            photographerName: photographerName
        }),
        // mode: 'no-cors'
    })
        .then(response => {
            // Handle the response from the server
            if (response.ok) {
                // Gallery submitted successfully
                console.log('Gallery submitted successfully');
            } else {
                // Error occurred
                console.error('Error:', response.status);
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the AJAX call
            console.error('Error:', error);
        });

    // Here, we're just logging the data for demonstration purposes
    console.log('Category:', category);
    console.log('Images:', images);

    // Reset the form
    form.reset();
    document.getElementById('previewContainer').innerHTML = '';
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the element by ID
    const formEquip = document.getElementById('equipmentForm');

    // Check if the element exists
    if (formEquip) {
        // Add an event listener to the element
        formEquip.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Retrieve selected category
            // const category = document.getElementById('category').value;

            // Retrieve selected images
            const images = document.getElementById('imagesEquip').files;

            // Perform validation, if necessary

            // Send form data to the server using AJAX or any other method
            // Here, we're just logging the data for demonstration purposes
            // console.log('Category:', category);
            console.log('Images:', images);

            // Reset the form
            form.reset();
            document.getElementById('previewContainer').innerHTML = '';
        });
    }
});


const populateProfileData = (data) => {
    // document.getElementById('profileImage').src = data.profilePhoto;
    document.getElementById('name').textContent = data.name;
    document.getElementById('location').textContent = data.location;
    document.getElementById('phoneNumber').textContent = data.phoneNumber;
    document.getElementById('serviceLocation').textContent = data.serviceLocation;
    document.getElementById('languagesKnown').textContent = data.languages;
    document.getElementById('services').textContent = data.services;
    document.getElementById('description').textContent = data.aboutMe;
};
// Now you can use the data variable here
console.log(data);
populateProfileData(data);

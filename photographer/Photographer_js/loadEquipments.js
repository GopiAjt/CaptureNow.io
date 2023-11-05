document.addEventListener('DOMContentLoaded', () => {
    let data = JSON.parse(localStorage.getItem('photographerData'));
    console.log(data);
    fetchPhotographerByEmail(data);

    loadEquipments(data.email);
});

//populate the profile Data
async function fetchPhotographerByEmail(data) {

    console.log(data);
    document.getElementById('name').textContent = data.name;
    // document.getElementById('phoneNumber').textContent = data.phoneNumber;
    document.getElementById('serviceLocation').textContent = data.serviceLocation;
    document.getElementById('languagesKnown').textContent = data.languages;
    document.getElementById('services').textContent = data.services;
    document.getElementById('description').textContent = data.aboutMe;
    document.getElementById('experience').textContent = data.experience + ' Years';
    let img = document.getElementById('profileImage');
    let navImg = document.getElementById('nav-img');


    document.title = data.name;

    if (data.profilePhoto == null) {
        img.src = '/images/profile.jpg';
        navImg.src = '/images/profile.jpg';
    }
    else {
        img.src = 'data:image/jpeg;base64,' + data.profilePhoto;
        // navImg.src = 'data:image/jpeg;base64,' + data.profilePhoto;
    }
    console.log(data);
}

function loadEquipments(email) {
    let data = JSON.parse(localStorage.getItem('user'));

    const url = 'http://localhost:8080/customer/getEquipmentsByEmail?email=' + email;
    let token = data.authToken;
    // Display loading indication
    // Replace 'loadingIndicatorElement' with the element where you want to show the loading indication
    const loadingIndicatorElement = document.getElementById('loading-indicator');
    loadingIndicatorElement.style.display = 'block';
    loadingIndicatorElement.style.backgroundColor = 'red';
    loadingIndicatorElement.style.height = '4px';



    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error retrieving albums');
            }
            return response.json();
        })
        .then(equipment => {

            console.log(equipment);
            createAndPopulateAlbums(equipment);
            // Hide loading indication
            loadingIndicatorElement.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
            // Hide loading indication
            loadingIndicatorElement.style.display = 'none';
        });
}

function createAndPopulateAlbums(equipments) {
    // Clear existing album containers

    const albumContainer = document.querySelector('.album-container');

    albumContainer.innerHTML = '';

    console.log('populating');
    equipments.forEach((equipment, index) => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('gallery');

        const albumLink = document.createElement('a');
        albumLink.href = 'data:image/jpeg;base64,' + equipment.photo;

        const albumImage = document.createElement('img');
        albumImage.src = 'data:image/jpeg;base64,' + equipment.photo;
        albumImage.alt = 'Cinque Terre';
        albumImage.width = '600';
        albumImage.height = '400';

        // Add a click event listener to the album image to open the modal when clicked
        albumImage.addEventListener('click', () => {
            openModal(equipment.photo); // Pass the base64-encoded image data to the openModal function
        });

        const albumDescription = document.createElement('div');
        albumDescription.classList.add('desc');

        const albumName = document.createElement('div');
        albumName.classList.add('album-name');
        albumName.textContent = equipment.category;

        albumDescription.appendChild(albumName);

        albumLink.appendChild(albumImage);
        albumDiv.appendChild(albumLink);
        albumDiv.appendChild(albumDescription);

        albumContainer.appendChild(albumDiv);

    });
}


// Function to open the modal
function openModal(imageData) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    // Set the image data to the modal content
    modalImage.src = 'data:image/jpeg;base64,' + imageData;

    const img = new Image();
    img.src = imageData;
    img.onload = function () {
        if (img.height > img.width) {
            modalContent.classList.add('portrait');
        } else {
            modalContent.classList.remove('portrait');
        }
    };
    // Display the modal
    modal.style.display = 'block';

    // Add a click event listener to the close button to close the modal when clicked
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', closeModal);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}
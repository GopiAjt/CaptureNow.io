const albumContainer = document.querySelector('.album-container');

document.addEventListener('DOMContentLoaded', () => {
    const albumLink = document.getElementById('albumLink');
    albumLink.addEventListener('click', loadAlbum());
});

function createAndPopulateAlbums(albums) {
    // Clear existing album containers
    albumContainer.innerHTML = '';

    console.log('populating');
    albums.forEach((album, index) => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('gallery');

        const albumLink = document.createElement('a');
        albumLink.href = 'data:image/jpeg;base64,' + album.photo;

        const albumImage = document.createElement('img');
        albumImage.src = 'data:image/jpeg;base64,' + album.photo;
        albumImage.alt = 'Cinque Terre';
        albumImage.width = '600';
        albumImage.height = '400';

        // Add a click event listener to the album image to open the modal when clicked
        albumImage.addEventListener('click', () => {
            openModal(album.photo); // Pass the base64-encoded image data to the openModal function
        });

        const albumDescription = document.createElement('div');
        albumDescription.classList.add('desc');

        const albumName = document.createElement('div');
        albumName.classList.add('album-name');
        albumName.textContent = album.category;

        const albumButton = document.createElement('div');
        albumButton.classList.add('album-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add("btn", "btn-outline-dark", "btn-sm");

        deleteButton.addEventListener('click', () => {
            // Call the function to delete the photo with the appropriate identifier
            deletePhoto(album.id);
        });

        albumButton.appendChild(deleteButton);
        albumDescription.appendChild(albumName);
        albumDescription.appendChild(albumButton);

        albumLink.appendChild(albumImage);
        albumDiv.appendChild(albumLink);
        albumDiv.appendChild(albumDescription);

        albumContainer.appendChild(albumDiv);

    });
}


function loadAlbum() {
    let data = JSON.parse(localStorage.getItem('data'));

    const url = 'http://localhost:8080/photographer/getAlbums?email=' + data.email;
    let token = data.authToken;
    // Display loading indication
    // Replace 'loadingIndicatorElement' with the element where you want to show the loading indication
    // const loadingIndicatorElement = document.getElementById('loading-indicator');
    // loadingIndicatorElement.style.display = 'block';
    // loadingIndicatorElement.style.backgroundColor = 'red';
    // loadingIndicatorElement.style.height = '4px';

    const loadingModal = document.getElementById('loadingModal');
    loadingModal.classList.add('show-modal');


    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error retrieving albums');
            }
            return response.json();
        })
        .then(albums => {

            console.log(albums);
            createAndPopulateAlbums(albums);
            // Hide loading indication
            loadingModal.classList.remove('show-modal');
        })
        .catch(error => {
            console.error(error);
            // Hide loading indication
            loadingModal.classList.remove('show-modal');
        });
}

function deletePhoto(photoId) {
    const deleteUrl = 'http://localhost:8080/photographer/deletePhoto?id=' + photoId; // Replace 'photos' with the appropriate endpoint for deleting photos
    const token = data.authToken; // Replace with the actual authentication token

    // Make the API request to delete the photo
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting photo');
            }
            // If the photo is successfully deleted, you may want to update the UI or take other actions as needed.
            window.alert('Deleted Successfully!');
            loadAlbum();
        })
        .catch(error => {
            console.error(error);
            // Handle any errors that occur during the delete process
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
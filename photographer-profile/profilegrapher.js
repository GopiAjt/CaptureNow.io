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
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission

  const category = document.getElementById('category').value;
  const imageFiles = document.getElementById('images').files;
  const photographerName = data.name;
  const token = data.authToken;

  const formData = new FormData(form);
  formData.set('category', category);
  formData.set('photographerName', photographerName);

  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('file', imageFiles[i]);
  }

  try {
    const response = await fetch('http://localhost:8080/photographer/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      console.log('Gallery submitted successfully');
      window.alert('Album Added successfully');
      loadAlbum();
      let albumData = await response.json();
      data.Albums = albumData;
      // localStorage.setItem('data', JSON.stringify(data));
      console.log(albumData);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }

  form.reset();
  document.getElementById('previewContainer').innerHTML = '';
});


document.addEventListener('DOMContentLoaded', () => {
  // Get the element by ID
  const formEquip = document.getElementById('equipmentForm');

  // Check if the element exists
  if (formEquip) {
    // Add an event listener to the element
    formEquip.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent form submission

      // Retrieve selected category
      // const category = document.getElementById('category').value;

      // Retrieve selected images
      const imageFiles = document.getElementById('imagesEquip').files;
      const photographerName = data.name;
      const token = data.authToken;

      const formData = new FormData(form);
      formData.set('category', 'equipment');
      formData.set('photographerName', photographerName);

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('file', imageFiles[i]);
      }

      try {
        const response = await fetch('http://localhost:8080/photographer/add', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        if (response.ok) {
          console.log('Gallery submitted successfully');
          window.alert('Equipments Added successfully');
          loadEquipments()
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      // Perform validation, if necessary
      // Reset the form
      form.reset();
      document.getElementById('previewContainer').innerHTML = '';
    });
  }
});


const populateProfileData = (data) => {
  // document.getElementById('profileImage').src = data.profilePhoto;
  document.getElementById('name').textContent = data.name;
  document.getElementById('phoneNumber').textContent = data.phoneNumber;
  document.getElementById('serviceLocation').textContent = data.serviceLocation;
  document.getElementById('languagesKnown').textContent = data.languages;
  document.getElementById('services').textContent = data.services;
  document.getElementById('description').textContent = data.aboutMe;
  document.getElementById('experience').textContent = data.experience + ' Years';
  let img = document.getElementById('profileImage');
  let navImg = document.getElementById('nav-img');

  document.title = data.name;

  if(data.profilePhoto == null)
  {
    img.src = '/images/profile.jpg';
    navImg.src = '/images/profile.jpg';
  }
  else
  {
    img.src = 'data:image/jpeg;base64,' +  data.profilePhoto;
    navImg.src = 'data:image/jpeg;base64,' +  data.profilePhoto;
  }
};
// Now you can use the data variable here
console.log(data);
populateProfileData(data);
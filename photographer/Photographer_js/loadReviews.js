document.addEventListener('DOMContentLoaded', () => {
    let data = JSON.parse(localStorage.getItem('photographerData'));
    console.log(data.email);
    fetchPhotographerByEmail(data);
});

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

loadReviewsByEmail()
{
    let response = await fetch();
}
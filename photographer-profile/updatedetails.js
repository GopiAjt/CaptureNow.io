const updateDetails = document.getElementById('updateDetails');

async function details()
{
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
    if(response.status == 200)
    {
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
    if(response.status == 409){
        window.alert('error');
    }
}

updateDetails.addEventListener('click', details);
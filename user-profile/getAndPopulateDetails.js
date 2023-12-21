let data = JSON.parse(localStorage.getItem('user'));

document.addEventListener('DOMContentLoaded', () => {

    populateDetails(data);
});

function populateDetails(data) {
    const name = document.getElementById('updateName');
    const email = document.getElementById('updateEmail');
    const phoneNumber = document.getElementById('updatePhoneNumber');

    name.value = data.name;
    email.value = data.email;
    phoneNumber.value = data.phoneNo;
}

const updateDetailsBtn = document.getElementById('updateDetailsBtn');
updateDetailsBtn.addEventListener('click', async function() {
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const phoneNumber = document.getElementById('updatePhoneNumber').value;

    const token = data.authToken;

    var customerUpdateDto = {
        name : name,
        email : email,
        phoneNo : phoneNumber
    }

    let response = await fetch('http://localhost:8080/customer/updateDetails',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customerUpdateDto)
    });

    if(response.ok){
        let data = await response.json();
        populateDetails(data);
    }
});
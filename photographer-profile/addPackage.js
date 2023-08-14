// let data = JSON.parse(localStorage.getItem('data'));
const addPackage = document.querySelector('#add-package');
const add = async (e) => {
    e.preventDefault();
    // Get the input values
    var packageName = document.getElementById("package-name").value;
    var category = document.getElementById("packageCategory").value;
    var eventRate = document.getElementById("eventrate").value;
    var dayRate = document.getElementById("Day-rate").value;
    var hourRate = document.getElementById("Hour-rate").value;
    var videoRate = document.getElementById("video-rate").value;
    var description = document.getElementById("floatingTextarea2").value;

    // Create an object with the data
    var p = {
        email: data.email,
        packageName: packageName,
        category: category,
        eventRate: eventRate,
        oneDayRate: dayRate,
        oneHourRate: hourRate,
        videoRate: videoRate,
        description: description
    };

    const token = data.authToken;
    console.log(token);
    // Send the data to the backend using fetch
    let response = await fetch('http://localhost:8080/photographer/addpackage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(p)
    })
    console.log(response);
    let packageData = await response.json();
    console.log('pacakge Data: ', packageData);
    if (response.ok) {
        window.alert('added successfully');
        data.Packages = packageData;
        localStorage.setItem('data', JSON.stringify(data));
        console.log(data.Packages);
        update();
    }
    else {
        console.log('error');
    }
    form.reset();
}
addPackage.addEventListener('click', add);
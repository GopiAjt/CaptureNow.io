const login = document.querySelector('#signin');
const loginUser = async(e) => {
    e.preventDefault();
    let email = document.getElementById('inputEmails').value;
    let pass = document.getElementById('inputPassword').value;
    document.getElementById('signupForm').reset();
    let token = await fetch(`http://localhost:8080/customer/authtoken?email=${email}&password=${pass}`);
    let response = await fetch('http://localhost:8080/customer/signin?email='+email+'&password='+pass);
    // .then(response => response.json())
    //.then(json => console.log(json));
    console.log(pass);

    console.log(response);
    if(response.status == 400)
    {
        window.alert('Please verify your account');
    }
    else if(response.ok)
    {
        let data = await response.json();
            // Store the data in localStorage
        localStorage.setItem('user', JSON.stringify(data));

        window.open('/home.html');
    }
    else
    {
        window.alert('Invalid Credentials');
    }
};
login.addEventListener('click',loginUser,);
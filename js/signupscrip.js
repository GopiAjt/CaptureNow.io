    
const submit = document.querySelector('#submit');

var emailGlobal;

const saveUser = async(e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    emailGlobal = email;
    let pass = document.getElementById('password').value;
    let phno = document.getElementById('phno').value;
    document.getElementById('signup-form').reset();
    
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: pass,
            phno: phno
        })
    };
    let response = await fetch('http://localhost:8080/signup',options);
    while(response.ok)
    {
        window.alert('Please Verify your Account');
        break;
    }
    if(response.status == 409)
    {
        window.alert('Email Alredy Exists')
    }
    if(response.ok)
    {
        window.open('verify.html');
    }
    console.log(response);
};
submit.addEventListener('click',saveUser);
const submit = document.querySelector('#submit');
const loginUser = async(e) => {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    document.getElementById('signupForm').reset();
    //await fetch('http://localhost:8080/signin?email=gopiajt23@gmail.com&password=rish')
    let response = await fetch('http://localhost:8080/signin?email='+email+'&password='+pass);
     // .then(response => response.json())
      //.then(json => console.log(json));

    if(response.status == 400)
    {
        window.alert('Please verify your account');
    }
    else if(response.ok)
    {
        window.open('/home.html');
    }
    else
    {
        window.alert('Invalid Credentials');
    }
    console.log(response);
};
submit.addEventListener('click',loginUser,);
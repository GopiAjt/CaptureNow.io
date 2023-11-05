  
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

const submit = document.querySelector('#submit');

var emailGlobal;

const saveUser = async(e) => {
    e.preventDefault();
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    emailGlobal = email;
    let pass = document.getElementById('inputPassword1').value;
    // let phno = document.getElementById('inputphone').value;
    // document.getElementById('signup-form').reset();
    // $('exampleModal').modal('toggle');
    // $('verifyModal').modal('toggle');
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: pass
        })
    };
    let response = await fetch('http://localhost:8080/customer/signup',options);
    while(response.ok)
    {
        window.alert('Please Verify your Account');
        break;
    }
    if(response.status == 409)
    {
        window.alert('Email Alredy Exists')
    }
    console.log(response);
    
};
submit.addEventListener('click',saveUser);
  
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
    // let phoneNo = document.getElementById('inputphone').value;
    emailGlobal = email;
    let pass = document.getElementById('inputPassword').value;
    // let phno = document.getElementById('inputphone').value;
    // document.getElementById('signup-form').reset();
    // $('exampleModal').modal('toggle');
    // $('verifyModal').modal('toggle');
    let options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phoneNo: phoneNo,
            password: pass
        })
    };
    let response = await fetch('http://localhost:8080/customer/signup',options);
    while(response.ok)
    {
        window.alert('Please Verify your Account');
        break;
    }
    if(response.status == 400)
    {
        window.alert('Email Alredy Exists')
    }
    console.log(response);
    
};
submit.addEventListener('click',saveUser);
let form = document.querySelector('form');
let firstName = form.querySelector('input[name="firstName"]');
let lastName = form.querySelector('input[name="lastName"]');
let nationality = form.querySelector('select[name="nationality"]');
let email = form.querySelector('input[name="e-mail"]');
let day = form.querySelector('select[name="day"]');
let month = form.querySelector('select[name="month"]');
let year = form.querySelector('select[name="year"]');
let male = form.querySelector('input[id="male"]');
let female = form.querySelector('input[id="female"]');
let password = form.querySelector('input[name="password"]');
let confirmPassword = form.querySelector('input[name="confirmPassword"]');

let fields = form.querySelectorAll('.field');
let registration = document.querySelector('.registration');
let successRegistration = document.querySelector('.successRegistration');
let validateBtn = document.querySelector('button');
let user = document.querySelector('object');
let check = document.querySelector('input[name="e-mail"]~img')

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

form.addEventListener('focus', function(e){
    formValidate(); 
},true);

validateBtn.addEventListener('click', async function(e){
    e.preventDefault();
    if(emailValidate(e) && !passwordValidate(e) && firstName.value && lastName.value){
        let data = {
            firstName: firstName.value,
            lastName: lastName.value,
            nationality: nationality.value,
            email: email.value,
            day: day.value,
            month: month.value,
            year: year.value,
            gender: male.checked ? 'male' : 'female',
            password: password.value
        };
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(function (){
            registration.style.display = "none";
            successRegistration.style.display = "flex";
            user.style.width = 0;
        })
    }else{
        shakeButton();
        formValidate();
    }
})

function formValidate(){
    fields.forEach((field)=>{
        let span = field.nextElementSibling;
        if(!field.value){
            field.classList.add("error");
            span.style.display = "inline";
            span.textContent = "Пустое поле";
        }else if(field.name == "e-mail" && !emailValidate()){
            field.classList.add("error");
            span.style.display = "inline";
            span.textContent = "Неверный e-mail";
        }else if(field.name == "password" || field.name == "confirmPassword"){
            let passwRes = passwordValidate();
            if(passwRes){
                field.classList.add("error");
                span.style.display = "inline";
                span.textContent = passwRes;
            }
        }else{
            field.classList.remove("error");
            span.style.display = "none";
        }
    })
}

function emailValidate(e){
    if(email.value && EMAIL_REGEXP.test(email.value)){
        check.style.display = "block";
        return true
    }else{
        console.log(check)
        check.style.display = "none";
        return false
    }
}

function passwordValidate(e){
    if(password.value != confirmPassword.value){
        return 'Пароли не совпадают'
    }else if(password.value == confirmPassword.value && !password.value.match(passw)){
        return 'Пароль от 8 символов, заглавные и строчные буквы, а также цифры'
    }else if(password.value == confirmPassword.value && password.value.match(passw)){
        return ''
    }
}

function shakeButton(){
    validateBtn.classList.add('shake');
    setTimeout(() => validateBtn.classList.remove('shake'), 2000);
}
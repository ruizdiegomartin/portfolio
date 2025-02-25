// ----------------------------------------------------- navigator

let togglerActive = false;
const togglerButton = document.querySelector('.navbar-toggler');
togglerButton.addEventListener('click', ()=> handleToggler())

const handleDropdownMenu = () => {
    document.querySelector('.top-bar-collapsed').classList.toggle('top-bar');
    document.querySelector('.middle-bar-collapsed').classList.toggle('middle-bar');
    document.querySelector('.bottom-bar-collapsed').classList.toggle('bottom-bar');
    document.querySelector('.nav-dropdown').classList.toggle('dropdown-menu-show');
}

const handleToggler = () => {
    
    togglerActive = !togglerActive;
    handleDropdownMenu();
    
}



const dropdownLinks = document.querySelectorAll('.dropdown-link');
console.log(dropdownLinks)
dropdownLinks.forEach(link => {
    link.addEventListener('click', ()=> {
        handleDropdownMenu();
    })
})
// -------------------------------------------------------- contact


const regExp = {
    name: /^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})\s?([a-zA-Z]{2,})?\s?([a-zA-Z]{2,})?\s?([a-zA-Z]{2,})?\s?([a-zA-Z]{2,})?$/,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
}

const validateName = (name) => {
    if  (   regExp.name.test(name) ) {
        return true;
    }
    else { 
        return false;
    }
}
const validateEmail = (mail) => {
    if  (   regExp.email.test(mail) ) {
        return true;
    }
    else { 
        return false;
    }
}
const validateMessage = (message) => {
    if  (  message === "" ) {
        return false;
    }
    else { 
        return true;
    }
}



const validateFields = (data) => {
   
    if (validateName(data.user_name) === false) {
        document.querySelector('.name-error-msg').classList.add('show-warning');
        setTimeout(()=>{
            document.querySelector('.name-error-msg').classList.remove('show-warning');
        },3000)
    }
    if (validateEmail(data.user_email) === false) {
        document.querySelector('.email-error-msg').classList.add('show-warning');
        setTimeout(()=>{
            document.querySelector('.email-error-msg').classList.remove('show-warning');
        },3000)
    } 
   
    if (validateName(data.user_name) ===  true && validateEmail(data.user_email)) {
        return true;
    } 

    document.querySelector('.submit-warning').classList.add('d-flex');
    setTimeout(()=>{
        document.querySelector('.submit-warning').classList.remove('d-flex');
    }, 3000);

    return false;
}


const sendEmail = () => {
    
    emailjs.sendForm('service_3vrlpd6', 'template_0ywdl6g', '.contact-form').then(
        (response) => {
        console.log('SUCCESS!', response.status, response.text);
        messageSended();
    },(error) => {
        console.log('FAILED...', error);
    })
} 

const messageSended = () => {
    document.querySelector('.dark-button').classList.add('hide-element');
    document.querySelector('.green-button').classList.add('d-flex');
}
    


const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(
        new FormData(e.target) 
    )
    console.log(data)
    
    validateFields(data) && sendEmail(data);
    })





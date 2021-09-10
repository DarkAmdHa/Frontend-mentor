document.querySelector('form').addEventListener('submit', validateEmail);

let input;

const emailField = document.querySelector('.email-input');

function validateEmail(e){
    e.preventDefault();
    input= emailField.value;
    atpos = input.indexOf('@');
    dotpos = input.indexOf('.')

    if(atpos<1 || (dotpos - atpos < 2)){
        showAlert('Please provide a valid email')

    }
    else{
        showCongrats('Thank you! We will keep you up-to-date');
    }
}



function showAlert(message){
    while(!document.querySelector('.alert')){
        const alert = document.createElement('p');
        alert.textContent = message;
        alert.className = 'alert';
        document.querySelector('form').insertBefore(alert, document.querySelector('.subscribe'));
        emailField.style.borderColor= 'hsl(0, 100%, 63%)';
        
        setTimeout(()=>{
            document.querySelector('.alert').style.opacity = '1';
        },100);

        setTimeout(()=>{
            document.querySelector('.alert').style.opacity = '0';
            emailField.style.borderColor= 'transparent';
            
            setTimeout(()=>{
                document.querySelector('.alert').remove();
    
            },500);
        },3000);
    }
    emailField.value=input;
}

function showCongrats(message){
    while(!document.querySelector('.congrats')){
        const congrats = document.createElement('p');
        congrats.textContent = message;
        congrats.className = 'congrats';
        document.querySelector('form').insertBefore(congrats, document.querySelector('.subscribe'));
        emailField.style.borderColor= 'green';        
        
        setTimeout(()=>{
            document.querySelector('.congrats').style.opacity = '1';
        },100);

        setTimeout(()=>{
            document.querySelector('.congrats').style.opacity = '0';
            emailField.style.borderColor= 'transparent';       
            setTimeout(()=>{
                document.querySelector('.congrats').remove();
            },500);
        },3000);
    }
}
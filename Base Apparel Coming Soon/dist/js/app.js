document.querySelector('form').addEventListener('submit', validateEmail);
let input;

const field = document.querySelector('.email');




function validateEmail(e){
    e.preventDefault();
    input = document.querySelector('.email').value;
    const email = field.value;
    atpos = email.indexOf('@');
    dotpos = email.indexOf('.');

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
        document.querySelector('form').insertBefore(alert, document.querySelector('.submit-container'));
        field.style.borderColor= 'hsl(0, 93%, 68%)';
        field.style.borderWidth = '2px';
        
        setTimeout(()=>{
            document.querySelector('.alert').style.opacity = '1';
            document.querySelector('.exclamation').style.opacity='1';
        },100);

        setTimeout(()=>{
            document.querySelector('.alert').style.opacity = '0';
            document.querySelector('.exclamation').style.opacity='0';
            field.style.borderColor= 'hsl(0, 36%, 70%)';
            field.style.borderWidth = '1px';
            
            setTimeout(()=>{
                document.querySelector('.alert').remove();
    
            },500);
        },3000);
    }
    document.querySelector('.email').value=input;
}

function showCongrats(message){
    while(!document.querySelector('.congrats')){
        const congrats = document.createElement('p');
        congrats.textContent = message;
        congrats.className = 'congrats';
        document.querySelector('form').insertBefore(congrats, document.querySelector('.submit-container'));
        field.style.borderColor= 'green';
        field.style.borderWidth = '2px';
        
        
        setTimeout(()=>{
            document.querySelector('.congrats').style.opacity = '1';
        },100);

        setTimeout(()=>{
            document.querySelector('.congrats').style.opacity = '0';
            field.style.borderColor= 'hsl(0, 36%, 70%)';       
            field.style.borderWidth = '1px';
            setTimeout(()=>{
                document.querySelector('.congrats').remove();
            },500);
        },3000);
    }
}
class UI{
    constructor(){

    }


    showResults(data){
        console.log(data);

        const ipField = document.querySelector('.response-ip');
        const timezoneField = document.querySelector('.tz');
        const ispField = document.querySelector('.response-isp');
        let locationField = document.querySelector('.response-location');
        locationField.innerText = '';
        ipField.innerText = data.ip;
        if (data.location.timezone === " "){
            document.querySelector('.response-timezone').innerText = 'Unavailable'; 
        }
        else{
            timezoneField.innerText = data.location.timezone; 
        }

        ispField.innerText = data.isp;
        
        if (data.location.city != ''){
            locationField.innerText += data.location.city;
        }
        if (data.location.region != ''){
            locationField.innerText += `, ${data.location.region}`;
        }
        if (data.location.postalCode != ""){
            locationField.innerText += ` ${data.location.postalCode}`;
        }
        if (data.location.country != 'ZZ'){
            locationField.innerText += `, ${data.location.country}`;
        }
        if (locationField.innerText === " "){
            locationField.innerText = 'Unavailable';
        }

    }

    showAlert(message){
        while(!document.querySelector('.alert')){
            const alert = document.createElement('div');
            alert.classList.add('alert');
            alert.innerText = message;
            window.setTimeout(()=>{
                alert.style.opacity = '1';
                alert.style.transform = 'translateY(0)';
            },100);
            document.querySelector('main').insertBefore(alert,document.querySelector('.results'));
            setTimeout(()=>{
                window.setTimeout(()=>{
                    document.querySelector('.alert').style.opacity='0';
                    document.querySelector('.alert').style.transform='translateY(80px)';
                },100);
            },2000);
            setTimeout(()=>{
                document.querySelector('.alert').remove();
            },2200);
        }
    }
}
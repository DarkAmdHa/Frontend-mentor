let map = L.map('map').setView([51.505, -0.09], 13);
var blackIcon = L.icon({
    iconUrl: './images/icon-location.svg',

});
let marker = L.marker([51.5,-0.09],{icon: blackIcon}).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);

document.addEventListener('DOMContentLoaded', defaultLocationLoad);
const form = document.querySelector('.form');
const ipInput = document.querySelector('.ip-address');
const ip = new Ipify();
const ui = new UI();

function defaultLocationLoad(){

	ip.getDomainDetails('www.google.com')
	.then(data=>{
		ui.showResults(data);
		if(data.location.lat != 0 || data.location.lng !=0){
			reMap(data.location.lat,data.location.lng);
		}
	})
}

form.addEventListener('submit', (e)=>{
	if (validateIpAddress(ipInput.value)){
		ip.getIpDetails(ipInput.value)
		.then(data=>{
			ui.showResults(data);
			if(data.location.lat != 0 || data.location.lng !=0){
				reMap(data.location.lat,data.location.lng);
			}
		});
	}
	else if(validateDomain(ipInput.value)){
		ip.getDomainDetails(ipInput.value)
		.then(data=>{
			ui.showResults(data);
			if(data.location.lat != 0 || data.location.lng !=0){
				reMap(data.location.lat,data.location.lng);
			}

		});
	}
	else{
		ui.showAlert('Please enter a valid IP address or Domain');
	}
	e.preventDefault();
});

function validateIpAddress(ipaddress){
	const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	if(ipaddress.match(ipformat)){
		return true;
	}
	else{
		return false;
	}
}

function validateDomain(domain){



	const domainformat = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
	if(domain.match(domainformat)){
		return true;
	}
	else{return false;}
}

function reMap(latitude,longitude){
	map.setView([latitude,longitude]);
	marker.setLatLng([latitude,longitude]);
}
var parent = document.querySelector(".parent");
var sun = document.querySelector(".sun");
var text = document.querySelector(".text");
var locat = document.querySelector(".location");
var temp = document.querySelector(".temp");
var celcius = document.querySelector(".celcius");

sun.addEventListener('animationstart', () => parent.classList.add("full_width_parent"));
var rotatant = document.querySelector('.loading_sun').style.getPropertyValue('--rotatant');
console.log(rotatant);
document.addEventListener("DOMContentLoaded", getTemp);
async function getTemp() {

	async.tryEach([

				// -4- AERIS WEATHER API
				function getDataFromSecondWebsite(callback) {
					const options = {
						method: 'GET',
						headers: {
							'X-RapidAPI-Key': '03ea6b6876mshc2f2dcf88a97a71p1eaa9ejsnab496bf3f824',
							'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
						}
					};
					
					return fetch('https://aerisweather1.p.rapidapi.com/observations/delhi,%20in', options)
					.then(response => {
						return response.ok ?  response.json(): false
					})
					.then(response =>{
						return response? callback(null,{temperature:response.response.ob.tempC}): callback("All APIs failed")
					})
				},
		
		// -1- OPEN WEATHER API
		function getDataFromFirstWebsite(callback) {
			var locn = "Delhi";

			// configurations
			var options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '03ea6b6876mshc2f2dcf88a97a71p1eaa9ejsnab496bf3f824',
					'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
				}
			};

			// fetch call
			
			fetch('https://open-weather13.p.rapidapi.com/city/' + locn, options)
			.then(response => {
				return response.ok ?  response.json(): false
			})
			.then(response =>{
				return response? callback(null,response): callback("")
			})
		},

		// -2- WEATHER BIT API
		function getDataFromSecondWebsite(callback) {
			var options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '03ea6b6876mshc2f2dcf88a97a71p1eaa9ejsnab496bf3f824',
					'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
				}
			};
			
			fetch('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5', options)
			.then(response => {
				return response.ok ?  response.json(): false
			})
			.then(response =>{
				return response? callback(null,response): callback("")
			})
		},

		// -3- FORECAST API
		function getDataFromSecondWebsite(callback) {
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '03ea6b6876mshc2f2dcf88a97a71p1eaa9ejsnab496bf3f824',
					'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
				}
			};
			
			fetch('https://forecast9.p.rapidapi.com/rapidapi/forecast/28.6/77.2/summary/', options)
			.then(response => {
				return response.ok ?  response.json(): false
			})
			.then(response =>{
				var avgTemp=(response.items[0].temperature.min+response.items[0].temperature.max)/2;
				return response? callback(null,{temperature:avgTemp}): callback("")
			})
		},


	],
		// optional callback
		function (err, result) {
			if(err){
				sun.addEventListener('animationiteration', () => {
					sun.classList.remove("loading_sun");
					celcius.textContent = "! ! !";
					text.classList.add("visible_text");
				});
			}
			else if (result) {
				// animation-on-iteration event runs when
				// an iteration of animation is completed
				runner(result.temperature+" ")
			}
		});


	function runner(warm){
		console.log(warm);

			sun.addEventListener('animationiteration', () => {
				sun.classList.remove("loading_sun");
				celcius.textContent = warm+" ";
				text.classList.add("visible_text");
			});
	}

}


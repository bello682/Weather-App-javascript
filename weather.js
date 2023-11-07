const apiKeys = "c03e363a01b916eb2b5bf9983bd543f3";
const weatherDataInfo = document.getElementById("weather_datas_info");
const citySearchInput = document.getElementById("search_input");
const temperature_temp = document.getElementById("temperature_tem");
const overCast = document.getElementById("over_cast");
const feels = document.getElementById("feels");
const humi_dity = document.getElementById("humidity");
const windspeed = document.getElementById("wind_speed");
const iconWeather = document.getElementById("icon");
// const backColor = document.getElementsByClassName("back_color");

const Form = document.querySelector("form");

Form.addEventListener("submit", async (event) => {
	event.preventDefault();

	// to get the value of the inputed
	const cityInputValue = citySearchInput.value;

	await getWeatherData(cityInputValue);

	const message = document.getElementById("msg");
	if (citySearchInput.value === "") {
		// alert("Input can not be Empty!!");
		message.innerHTML = "Input can not be Empty!!";
		message.style.color = "red";
	} else {
		message.style.display = "none";
	}

	// after the input of city as been sent of by the button the input should return empty.
	citySearchInput.value = "";
});

async function getWeatherData(cityInputValue) {
	try {
		// const errorMessage = data.message;
		// if (errorMessage) {
		// 	alert(errorMessage);
		// }

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKeys}&units=metric`
		);

		const data = await response.json();

		//  targeting the data from the json(data).

		const icon = data.weather[0].icon;
		weatherDataInfo.querySelector(
			".icon"
		).innerHTML = `<img  src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">;`;

		const temperature_data = data.main.temp;
		temperature_temp.innerHTML = `${temperature_data}&#8451;`;

		const over_cast_data = data.weather[0].description;
		overCast.innerHTML = over_cast_data;

		const feelsLike = data.main.feels_like;
		feels.innerHTML = `Feels like: ${feelsLike}`;

		const humidity = data.main.humidity;
		humi_dity.innerHTML = `Humidity: ${humidity + "%"}`;

		const windSpeed = data.wind.speed;
		windspeed.innerHTML = `Winds speed: ${windSpeed + "m/s"}`;

		const feelsHumidityWndColor = document.getElementsByClassName("back_color");
		for (let i = 0; i < feelsHumidityWndColor.length; i++) {
			feelsHumidityWndColor[i].style.backgroundColor = "#e7e5e5";
		}
	} catch (error) {}
}

  document.getElementById('weather-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const city = document.getElementById('city').value.trim();
            if (!city) {
                alert('Please enter a city name');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8081/weather?city=${city}`);
                if (!response.ok) throw new Error('Failed to fetch weather data');

                const data = await response.json();

                // Displaying weather information in a structured and user-friendly way
                document.getElementById('location').textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
                document.getElementById('temperature').textContent = `${data.current.temp_c} °C / ${data.current.temp_f} °F`;
                document.getElementById('condition').textContent = `${data.current.condition.text}`;
                document.getElementById('wind').textContent = `${data.current.wind_kph} kph / ${data.current.wind_mph} mph (${data.current.wind_dir})`;
                document.getElementById('humidity').textContent = `${data.current.humidity} %`;
                document.getElementById('weather-icon').src = `http:${data.current.condition.icon}`;
                document.getElementById('weather-icon').alt = data.current.condition.text;

                document.getElementById('weather-result').classList.remove('hidden');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });

import conf from '../../conf/conf'
import axios from 'axios'

const base_url =`https://api.openweathermap.org/data/2.5`


export const getCurrentWeather = async (city) => {

  try {
    const url = `${base_url}/weather?q=${city}&units=metric&appid=${conf.weatherApiKey}`;

    const response = await axios.get(url)
    return response.data
  } catch (error) {
    
    throw error
  }
}

export const getWeatherForecast = async (city) => {
  try {
    const url = `${base_url}/forecast?q=${city}&units=metric&appid=${conf.weatherApiKey}`;
    const response = await axios.get(url)
    return response.data


  } catch (error) {
    
    throw error
  }


}

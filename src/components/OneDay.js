import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
// import OneChange from './OneChange';
import OneDaysEx from './OneDayWeatherEx'
import { addToLocalStorage, getFromLocalStorage } from "../helpers/localStorage";

const OneDay = ({ keyC, keyF, city, country }) => {

    const [oneDay, setDay] = useState(OneDaysEx)

    const {chosen, favKeys, setFav} = useContext(AppContext)
    

    console.log(chosen.key, chosen.city, chosen.country);
    console.log(`oneday component props` + keyC + keyF + city + country)
    let toFetch;
    if (window.location.href.indexOf("favorites") > -1) {
        toFetch = keyF
        console.log(toFetch)
    } else {
        toFetch = chosen.key
        console.log(toFetch)
    }


    const fetchWeather = (id) => {
        fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=lBHawUgG9LRqS3TZNMPItFBx1VH87wIt`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDay(data);
            })
            .catch((err) => {
                console.log(err)
            })
        //  setDay(OneChange)

    }
    let iconId;
    if (oneDay[0].WeatherIcon < 9) {
        iconId = "0" + oneDay[0].WeatherIcon.toString()
    } else {
        iconId = oneDay[0].WeatherIcon
    }

    let imgSrc = `https://developer.accuweather.com/sites/default/files/${iconId}-s.png`



    useEffect(() => {
        fetchWeather(toFetch)
        console.log(`oneday fetched weather`)
    }, [chosen, favKeys])

    if (window.location.href.indexOf("favorites") > -1) {

        return (
            <div key={keyF}>
                <p>{country}, {city} </p>
                <p>Temperature: </p>
                <p>{oneDay[0].Temperature.Metric.Value} C</p>
                <img src={imgSrc} />
                <p>{oneDay[0].WeatherText}</p>

            </div>
        )
    } else if (!chosen.key) {

        return (
            <div>no city is chosen</div>
        )
    }

    else {
        return (
            <div className='center w-80 w-40-m w-20-ns h-25 pa2 hidden ba br3 b--light-purple shadow-3 mv4'>
                <p>{chosen.country}, {chosen.city}</p>
                <p>Temperature: </p>
                <p>{oneDay[0].Temperature.Metric.Value} C</p>
                <img src={imgSrc} />
                <p>{oneDay[0].WeatherText}</p>
                <button className='f6 grow no-underline br-pill b--dark-green ba ph3 pv2 mb2 dib dark-green' onClick={() => {
                    let favorite = getFromLocalStorage('favorites') || [];
                    favorite.push(chosen);
                    console.log(chosen)
                    addToLocalStorage('favorites', favorite)
                    // console.log(favorite)
                }}
                >Add to Favorite</button>
            </div>
        )
    }


}

export default OneDay
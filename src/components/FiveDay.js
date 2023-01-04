import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
// import FiveDaysEx from './FiveDaysWeatherEx.json';
// import FiveChange from './FiveChange.json'

const FiveDays = (props) => {
    const { fiveDays, setFiveDay, chosen } = useContext(AppContext)
    const [err, setErr]=useState('');
    const fetchWeatherFive = (id) => {
        fetch(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=lBHawUgG9LRqS3TZNMPItFBx1VH87wIt&metric=true`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFiveDay(data.DailyForecasts);
            })
            .catch((err) => {
                console.log(err)
                setErr(err)
            })


        //  setFiveDay(FiveDaysEx.DailyForecasts)

    }

    useEffect(() => {

        fetchWeatherFive(chosen.key)
    }, [])

    useEffect(() => {

        fetchWeatherFive(chosen.key)
    }, [chosen])

    if (err) {
        return (
            <p>Oops data can't be fetched try again later</p>
        )
    }
    else if (!chosen.key) {
        return (
            <p>No forecast yet</p>
        )
    } else {


        return (
            <>
                <h2 className='purple'>5 Day Forecast</h2>
                <div className='flex center w-100 flex-wrap justify-center'>
                    {
                        fiveDays.map((item, i) => {
                            let iconId;
                            if (item.Day.Icon < 9) {
                                iconId = "0" + item.Day.Icon.toString()
                            } else {
                                iconId = item.Day.Icon
                            }
                            let date = item.Date.slice(0, 10)

                            let imgSrc = `https://developer.accuweather.com/sites/default/files/${iconId}-s.png`
                            return (

                                <div className='w-80 w-40-m w-20-ns h5 pa2 ma2 hidden ba br3 b--light-purple shadow-3  bg-lightest-green' key={i}>
                                    <p>{chosen.country}, {chosen.city},</p>
                                    <p>Date: {date}</p>
                                    <p>Temperature: {item.Temperature.Minimum.Value} C - {item.Temperature.Maximum.Value} C</p>
                                    <img src={imgSrc} />
                                    <p>{item.Day.IconPhrase}</p>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </>


        )
    }


}

export default FiveDays


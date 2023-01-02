import { useContext } from 'react'
import { AppContext } from '../App'
import AutocompleteEx from './AutoCompleteEx'

const Search = (props) => {
    const fetchCity = (input) => {

        fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=lBHawUgG9LRqS3TZNMPItFBx1VH87wIt&q=${input}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setKeyList(data || []);
            })
            .catch((err) => {
                console.log(err)
            })
        //  setKeyList(AutocompleteEx)

    }



    const { keyList, setKeyList, chosen, setChosen } = useContext(AppContext)

    return (
        <div className=' h4 flex-column items-center justify-center h-100'>
            <input className="w-80 w-40-m w-20-ns mv4 self-center ba br3 b--light-purple shadow-3 pa2" type='text' placeholder="Start typing city name"
                onChange={(e) => {
                    fetchCity(e.target.value)
                }

                }

            />

            <div className='mv2 w-80 w-20-ns center bg-white br3 '>

                {
                    keyList.map((item) => {
                        return (
                            <p className='pa1' onClick={
                                (e) => {
                                    setKeyList([])
                                    setChosen({ country: item.Country.LocalizedName, city: item.LocalizedName, key: item.Key })
                                    // fetchWeatherFive(item.Key);
                                }
                            }
                                key={item.Key}> {item.LocalizedName}, {item.Country.LocalizedName} </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search


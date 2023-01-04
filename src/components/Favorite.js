import {useState} from 'react'
import OneDay from "./OneDay"
// import OneChange from './OneChange'
import Navbar from './Navbar'
import { addToLocalStorage, getFromLocalStorage } from "../helpers/localStorage";
import ErrorBoundary from './ErrorBoundary';

const Favorite = (props)=> {
    const [favKeys, setFav] = useState(getFromLocalStorage('favorites')|| [])
    console.log(favKeys)
        
        if(favKeys.length < 1) {
            return (
                <div style={{minHeight:"80vh"}}>
                
                <p>no favorites yet</p>
                </div>
                
            )
        } else {

            return (
                <div style={{minHeight:"100vh"}}>
                <h2 className="center purple">Now in your picked locations</h2>
                <div div className='flex center w-75 flex-wrap justify-center'>
                

                {
                    favKeys.map ((item, i) => {

                        
                                return (
                                       
                                    <div className="center w-100 w-40-m w-33-ns h-25 pa2 hidden ba br3 b--light-purple shadow-3 mt4  " key={i}>                   
                                            <ErrorBoundary> <OneDay keyF={item.key} country ={item.country} city ={item.city} /> </ErrorBoundary>
                                        
                                            <button className='f6 grow no-underline br-pill b--dark-pink ba  ph3 pv2 mb2 dib dark-pink bg-washed-red' onClick = {()=>{
                                                favKeys.splice(favKeys.indexOf(item), 1);
                                                addToLocalStorage('favorites', favKeys);
                                                setFav(getFromLocalStorage('favorites'))
                                            }}>Remove</button>
                                    </div>
                                    )
                            
                            })
                  
                }
                </div>
                </div>
               
            )
}
    
    
}

export default Favorite


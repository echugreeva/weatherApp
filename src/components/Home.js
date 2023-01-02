import ErrorBoundary from './ErrorBoundary';
import Search from './Search'
import OneDay from './OneDay';
import FiveDays from './FiveDay';
import { useContext } from 'react';
import { AppContext } from '../App';

const Home = (props) => {
    const { chosen, oneDay } = useContext(AppContext)

    return (
        <div style={{ minHeight: '100vh' }}>

            <ErrorBoundary><Search className='z-999' /></ErrorBoundary>
            <h2 className="center purple">Weather Now</h2>
            <ErrorBoundary><OneDay keyC={chosen.key} /></ErrorBoundary>
            <ErrorBoundary><FiveDays /></ErrorBoundary>


        </div>

    )

}

export default Home


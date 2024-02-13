import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import TimezoneSelect from 'react-timezone-select'
import './Timezone.css'

const TimezoneApp = () => {
    const [selectedTimezone, setSelectedTimezone] = useState('')
  
    return (
    <div className="container">
          <div className='timezone'>
                            <h5>Select your timezone</h5>
                                <div className='selection-menu'>
                                <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone}/>
                                </div>
                        </div>
                   
    </div>
    )
    }
  
  const rootElement = document.getElementById('root')
  ReactDOM.render(<TimezoneApp />, rootElement)

  export default TimezoneApp;

 
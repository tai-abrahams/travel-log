import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API/LogEntries'
import PinDropIcon from '@material-ui/icons/PinDrop';
import LogEntryForm from './LogEntryForm'
import './index.css'

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.5235,
    longitude: 0.0760,
    zoom: 16 
  });

  const [ logEntries, setLogEntries] = useState([]);
  const [ showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null)

//what are expressions

  const getEntries = async ()=>{
    const logEntries = await listLogEntries();
    setLogEntries(logEntries)
  }
useEffect(() =>{
  getEntries()
      // (async ()=>{ // Immediately Involked Function Expression IIFE (function(){})()
      //   const logEntries = await listLogEntries();
      //   setLogEntries(logEntries)
      // })();

}, []); // useEffect second argument array of dependencies, So props or state that if were to change, the useEffect would re-render. But only want use effect being rendered on first mount


const showAddMarkerPopup = (event)=>{
  //find longitude and latitude from event double click
  //console.log(event.lngLat)
  const [ longitude, latitude ] = event.lngLat;
  
  setAddEntryLocation({
    longitude,
    latitude
  })

  
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={'mapbox://styles/taiabrahams/ckduijhd50mly19pamnjba28v'}
      mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(logEntry => (
          <div key={logEntry._id}>
          <Marker
            latitude={logEntry.latitude}
            longitude={logEntry.longitude}
            offsetTop={-22}
            offsetLeft={-12}
            >
              <div className="reactMapGL__marker"
              onClick={()=>{
                setShowPopup({
                  //...showPopup, remove spread of popup to allow popups to close when a new one is clicked
                  [logEntry._id]: true
                })
              }}
              >
                <PinDropIcon
                  style={{
                    width: `6vmin * ${viewport.zoom}`,
                    height:`6vmin * ${viewport.zoom}`
                  }}
                />
                </div>
            </Marker>
            {
              showPopup[logEntry._id] ? (
                <Popup
                className='reactMapGL__popup'
                dynamicPosition={true}
                latitude={logEntry.latitude}
                longitude={logEntry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={()=>{
                  setShowPopup({})
                }}
                anchor="top"
                >
                  <div className="reactMapGL__popupInfo">
                    <h3>{logEntry.title}</h3>
                    <p>{logEntry.comments}</p>
              <div className="reactMapGL__popup__img">{logEntry.image ? <img src ={logEntry.image} alt={logEntry.title} /> : null}</div>
                    <small>Visitied on: {new Date(logEntry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
                ) : null
            }
            </div>
        ))
      } 
      {
        
        addEntryLocation ? (
          <div>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              offsetTop={-22}
              offsetLeft={-12}
              >
                <div>
                  <PinDropIcon
                    style={{
                      width: `6vmin * ${viewport.zoom}`,
                      height:`6vmin * ${viewport.zoom}`
                    }}
                  />
                </div>
            </Marker>
            <Popup className="reactMapGL__popupInfo"
              dynamicPosition={true}
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              closeButton={true}
              closeOnClick={false}
              onClose={()=>{
                setAddEntryLocation(null)
              }}
            >
              <div>
                <LogEntryForm onClose={()=>{
                  setAddEntryLocation(null) //gives latitude and longitude a clean slate for next entry
                  getEntries()
                }} locationData={addEntryLocation}/> 
              </div>
            </Popup>
          </div>
        ) : null

      }
      </ReactMapGL>
  );
}

export default App;
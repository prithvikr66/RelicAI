import React, { useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, Source, Layer, NavigationControl, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios, { all } from "axios"
import toast from "react-hot-toast"
import {FaMapPin} from "react-icons/fa"
import Tesseract from 'tesseract.js';


function App() {
  const [viewState, setViewState] = useState({
    longitude: 77.580643,
    latitude: 12.972442,
    zoom: 12
  })
  const [start, setStart] = useState([77.580643, 12.972442])
  const [end, setEnd] = useState([77.58032, 12.972234])
  const [coordinates, setCoordinates] = useState([])
  const [newPlace,setNewPlace]=useState(null)
  const [showPopUp,setShowPopUp]=useState(false)
  const [title,setTitle]=useState("")
  const [review,setReview]=useState("")
  const [rating,setRating]=useState(0)
  const [file,setFile]=useState()
  const [pins,setPins]=useState([])
  const [ocrText,setOcrText]=useState("")
  const success=()=>toast("Successfully Submitted")
  useEffect(() => {
    getRoute();
  }, [start, end])

  const getRoute = async () => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiaHJpc2hpa2VzaGtoIiwiYSI6ImNsbWFlbHdweTB1em8za3RjeDZ0YjZtMnMifQ.5xb9p08aEPcHKrZoapSlyg`)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    // console.log(data.routes[0].distance)
    const coords = data.routes[0].geometry.coordinates
    // console.log(coords)
    setCoordinates(coords)
  }
  const geojson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [...coordinates]
      }
    }]
  }

  const lineStyle = {
    id: "roadLayer",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": 'blue',
      "line-width": 4,
      "line-opacity": 0.75
    }
  }
  

useEffect(() => {
  const getPins = async () => {
    try {
      const allPins = await axios.get("http://localhost:3000/pins");
      // const allPins=await fetch("http://localhost:3000/pins")
      setPins(allPins.data);
      console.log(allPins.data)
    } catch (err) {
      console.log(err);
    }
  };
  getPins();
}, []);

  const mapClickHandler = (event) => {
    setEnd([event.lngLat.lng, event.lngLat.lat])
  }
  const dblClickHandler = async(event) => {
    setFile()
    setOcrText("")
    setNewPlace({
      lng:event.lngLat.lng,
      lat:event.lngLat.lat
    })
    // setNewPlace([event.lngLat.lng,event.lngLat.lat])
    setShowPopUp(true)

  }
  useEffect(()=>{
    
  },[newPlace])

  const handleConfirm=async(e)=>{
    e.preventDefault()
    console.log("doing")
    
    const newPin={
      username:"NewUser",
      title,
      review,rating,
      latitude:newPlace.lat,
      longitude:newPlace.lng
      
    }
    console.log("done")
    try{
      const res=await axios.post("http://localhost:3000/pins",newPin)
      console.log(res.data)
      setPins([...pins,res.data])
    setShowPopUp(false)
    success();

    }catch(err){
      console.log(err.message)
    }

  }
  const handleOcr=(e)=>{
    Tesseract.recognize(
      file,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      setOcrText(text)
      setReview(text)
    })

  }

  return (<>
    <Map
      // onClick={mapClickHandler}
      doubleClickZoom={false}
      onDblClick={dblClickHandler}
      {...viewState}
      onMove={e => setViewState(e.viewState)}
      mapboxAccessToken="pk.eyJ1IjoiaHJpc2hpa2VzaGtoIiwiYSI6ImNsbWFlbHdweTB1em8za3RjeDZ0YjZtMnMifQ.5xb9p08aEPcHKrZoapSlyg"

      style={{
        width: 900,
        height: 400,
        borderRadius: 15
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Source id="routeSource" type="geojson" data={geojson}>
        <Layer {...lineStyle}>

        </Layer>
      </Source>
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl />
      <Marker longitude={start[0]}
        latitude={start[1]}
      />
      <Marker
        longitude={end[0]}
        latitude={end[1]}
      />
      {
        showPopUp &&(
          <Popup  latitude={newPlace.lat}
          longitude={newPlace.lng}
          anchor="left"
          onClose={()=>setShowPopUp(false)}
          style={{borderRadius:10}}
          >
            <div className=" p-3">
              <form onSubmit={handleConfirm}>
                <label className=" underline font-bold text-lg block py-2 ">Title</label>
                <input placeholder="Enter a title.." className="block border italic focus:outline-none p-1 rounded-sm w-full"
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <label className=" block font-bold text-lg underline py-2">Review</label>
                

                {
                  ocrText?(
                    <textarea placeholder="Say something about this place.."
                  className=" border rounded-sm block p-1 focus:outline-none italic w-full"
                  onChange={(e)=>setReview(e.target.value)}
                  value={ocrText}
                />
                  ):(
                    <textarea placeholder="Say something about this place.."
                  className=" border rounded-sm block p-1 focus:outline-none italic w-full"
                  onChange={(e)=>setReview(e.target.value)}
                  // value={ocrText}
                />
                  )
                }
                

               

               <div className=" flex mt-2">
               <input type="file" placeholder="" className=" " onChange={(e)=>setFile(e.target.files[0])}/>
              <button onClick={handleOcr} className=" border p-1 rounded-sm">Read</button>

               </div>
                <label className=" block font-semibold text-lg underline py-2">Rating</label>
               <select className="border block w-full p-2 bg-whie italic"
               onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
               </select>
                <button
                 type="submit"
                 className=" border p-1 mt-2 rounded-sm bg-buttonColor text-whie w-full font-semibold"
                >Confirm</button>
              </form>
            </div>
          </Popup>
        )
      }
      {
  pins &&
  pins.map((i) => (
    <Marker
      key={i.id} // Don't forget to add a unique key when mapping over components
      longitude={i.longitude}
      latitude={i.latitude}
    ><FaMapPin
      className=" w-20"
    /></Marker>
  ))
}

     
     
       
     


    </Map>
    <p>Distance covered </p>
  </>

  )
}

export default App

import React, { useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, Source, Layer, NavigationControl, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios, { all } from "axios"
import toast from "react-hot-toast"
import { FaMapPin } from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import Tesseract from 'tesseract.js';
// import { Room, Star, StarBorder } from "@mui/icons-material";
import {ThreeBody,RaceBy} from "@uiball/loaders"



function App() {



  const [viewState, setViewState] = useState({
    longitude: 77.580643,
    latitude: 12.972442,
    zoom: 12
  })
  const [start, setStart] = useState([77.580643, 12.972442])
  const [distance, setDistance] = useState(Number)
  const [end, setEnd] = useState([77.58032, 12.972234])
  const [coordinates, setCoordinates] = useState([])
  const [newPlace, setNewPlace] = useState(null)
  const [showPopUp, setShowPopUp] = useState(false)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [file, setFile] = useState()
  const [pins, setPins] = useState([])
  const [mode, setMode] = useState("tour")
  const [ocrText, setOcrText] = useState("")
  const [pinPopup, setPinPopup] = useState(false)
  const [pinCord, setPinCord] = useState([])
  const [viewPopUpId, setViewPopUpId] = useState("")
  const [ocrLoad,setOcrLoad]=useState(false)
  // const [setPO]



  const success = () => toast("Successfully Submitted")
  useEffect(() => {
    getRoute();
  }, [start, end])


  const getRoute = async () => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiaHJpc2hpa2VzaGtoIiwiYSI6ImNsbWFlbHdweTB1em8za3RjeDZ0YjZtMnMifQ.5xb9p08aEPcHKrZoapSlyg`)
    const data = await response.json()
    setDistance(data.routes[0].distance)
    // console.log(distance)
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
        // console.log(allPins.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);




  const mapClickHandler = (event) => {

    if (mode === "tour")
      setEnd([event.lngLat.lng, event.lngLat.lat])
  }

  const dblClickHandler = async (event) => {

    if (mode === "create") {
      setFile()
      setOcrText("")
      setNewPlace({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat
      })
      setShowPopUp(true)

    }

  }
  useEffect(() => {

  }, [newPlace])

  const handleConfirm = async (e) => {
    e.preventDefault()

    const newPin = {
      username: "NewUser",
      title,
      review, rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng

    }
    try {
      const res = await axios.post("http://localhost:3000/pins", newPin)
      console.log(res.data)
      setPins([...pins, res.data])
      setShowPopUp(false)
      success();

    } catch (err) {
      console.log(err.message)
    }
  }
  // setFile()
  //   setOcrText("")
  //   setNewPlace({
  //     lng:event.lngLat.lng,
  //     lat:event.lngLat.lat
  //   })
  //   setShowPopUp(true)

  // }
  const handleOcr = (e) => {
setOcrLoad(true)
    Tesseract.recognize(
      file,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      setOcrText(text)
      setReview(text)
      setOcrLoad(false)
    })
    setFile()
    // setOcrText('')
  }

  const mapPopUpHandler = (id, lat, lng) => {

    // setPinCord([e.target._lngLat.lng, e.target._lngLat.lat])
    // console.log(viewPopUp)
    // console.log(pinCord)
    // const pin = axios.get("http://localhost:3000/pins")
    setViewPopUpId(id)
    console.log(viewPopUpId)

    console.log(lng)
    console.log(lat)


  }

  useEffect(() => {
    // Inside the useEffect, you can use the viewPopUpId to conditionally show the pop-up
    // based on whether a pin is clicked or not.
    const clickedPin = pins.find((pin) => pin._id === viewPopUpId);

    if (clickedPin) {
      // If a pin is clicked, show the pop-up
      setPinPopup(true);
      setPinCord([clickedPin.longitude, clickedPin.latitude]);
    } else {
      // If no pin is clicked, hide the pop-up
      setPinPopup(false);
      setPinCord([]); // Clear the coordinates
    }
  }, [viewPopUpId, pins]);



  return (<>
    <select className=" focus:outline-none" onChange={(e) => setMode(e.target.value)}>
      <option value="tour">Touring</option>
      <option value="create">Create Tour</option>
    </select>
    <Map
      onClick={mapClickHandler}
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
        showPopUp && (
          <Popup latitude={newPlace.lat}
            longitude={newPlace.lng}
            anchor="left"
            onClose={() => setShowPopUp(false)}
            style={{ borderRadius: 10 }}
          >
            <div className=" p-3">
              <form onSubmit={handleConfirm}>
                <label className=" underline font-bold text-lg block py-2 ">Title</label>
                <input placeholder="Enter a title.." className="block border italic focus:outline-none p-1 rounded-sm w-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className=" block font-bold text-lg underline py-2">Review</label>


                {
                  ocrText ? (
                    <textarea placeholder="Say something about this place.."
                      className=" border rounded-sm block p-1 focus:outline-none italic w-full"
                      onChange={(e) => setReview(e.target.value)}
                      value={ocrText}
                    />
                  ) : (
                    <textarea placeholder="Say something about this place.."
                      className=" border rounded-sm block p-1 focus:outline-none italic w-full"
                      onChange={(e) => setReview(e.target.value)}
                    // value={ocrText}
                    />
                  )
                }




                <div className=" flex mt-2">
                  <input type="file" placeholder="" className=" " onChange={(e) => setFile(e.target.files[0])} />
                  {/* <ThreeBody/> */}
                  
                  <button onClick={handleOcr} className=" border p-1 rounded-sm">Read</button>
                  

                </div>
                {ocrLoad&&
                <RaceBy/>
                }
                <label className=" block font-semibold text-lg underline py-2">Rating</label>
                <select className="border block w-full p-2 bg-whie italic"
                  onChange={(e) => setRating(e.target.value)}>
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
      {/* {
        pins &&
        pins.map((i) => (
          <>
            <Marker
              key={i.id}
              longitude={i.longitude}
              latitude={i.latitude}

            ><FaMapPin
                onClick={() => {
                  mapPopUpHandler(i._id, i.latitude, i.longitude)
                  console.log(viewPopUpId)
                }}
                // onClick={(e) => setViewPopUp(true)}
                className=" w-20"
              /></Marker>
            {i._id === viewPopUpId && (
              <Popup
                longitude={i.longitude}
                latitude={i.latitude}
                anchor="left"
                style={{ borderRadius: 10 }}
              >
                <div className="w-72 h-52">
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor">Place</h2>
                    <p>{i.title}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor">Review</h2>
                    <p className="h-20 overflow-y-auto">{i.review}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor">Rating</h2>
                    <p>{i.rating}</p>
                  </div>
                  <p>Created by <b>{i.user}</b></p>
                </div>
              </Popup>
            )}
          </>
        ))
      } */}
      {pins&& 
      pins.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              // offsetLeft={-3.5 * viewport.zoom}
              // offsetTop={-7 * viewport.zoom}
            >
              <FaMapPin
                onClick={() => {
                  mapPopUpHandler(p._id, p.latitude, p.longitude)
                  console.log(viewPopUpId)
                }}
                // onClick={(e) => setViewPopUp(true)}
                className=" w-20"
              />
            </Marker>
            {p._id === viewPopUpId && (
              <Popup
                key={p._id}
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                // onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="w-72 h-52">
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor underline">Place</h2>
                    <p className=" text-xl font-bold ">{p.title}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor underline">Review</h2>
                    <p className="h-20 overflow-y-auto text-md font-semibold  border rounded-sm p-1 mt-2">{p.review}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-black text-buttonColor">Rating</h2>
                   <p className=" flex"><AiFillStar className=" text-starColor text-xl "/>
                   <AiFillStar className=" text-starColor text-xl "/>
                   <AiFillStar className=" text-starColor text-xl "/> 
                   </p>
                  </div>
                  {/* <p>Created by <b>Prithvi</b></p> */}
                </div>
              </Popup>
            )}
          </>
        ))}
      {/* {
        viewPopUp === true ? (
          <Popup
            latitude={pinCord[1]}
            longitude={pinCord[0]}
            anchor="left"
            // onClose={() => mapPopUpHandler()}
            style={{ borderRadius: 10 }}

          />) : (<></>)
      }
      {/* {
        pins &&
        pins.map((i) => (
          <>
            <Marker
              key={i.id}
              longitude={i.longitude}
              latitude={i.latitude}
              onClick={()=>{
                mapPopUpHandler(i._id,i.latitude,i.longitude)
              console.log(viewPopUpId)}}
            ><FaMapPin
                // onClick={(e) => setViewPopUp(true)}
                className=" w-20"
              /></Marker>
           {
            {pinPopup && (
      <Popup
        longitude={pinCord[0]}
        latitude={pinCord[1]}
        anchor="left"
        onClose={() => setPinPopup(false)}
        style={{ borderRadius: 10 }}
      >
        {/* ... (pop-up content) */}
      {/* </Popup> */}
      {/* )} */}


      {/* </> */}
      {/* )) */}
      {/* } */}


    </Map>
    <p>Distance covered </p>
  </>

  )
}

export default App

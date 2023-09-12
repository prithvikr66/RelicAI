import React, { useState,useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// import {MapboxGeocoder} from "@mapbox/mapbox-gl-geocoder"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

const Map = () => {
    const [userLatitude,setUserLatitude]=useState( 77.5946)
    const [userLongitude,setUserLongitude]=useState( 12.9716)
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                 setUserLatitude(position.coords.latitude)
                 setUserLongitude(position.coords.longitude)
                // console.log(position.coords.latitude)
                // console.log(position.coords.longitude)
            
               },)
            }
            mapboxgl.accessToken = "pk.eyJ1IjoiaHJpc2hpa2VzaGtoIiwiYSI6ImNsbWFlbHdweTB1em8za3RjeDZ0YjZtMnMifQ.5xb9p08aEPcHKrZoapSlyg";

            
            const map = new mapboxgl.Map({
                container: 'map-container', // HTML element ID where the map will be rendered
                style: 'mapbox://styles/mapbox/streets-v11', // Map style
                center: [userLatitude, userLongitude], // Initial map center (longitude, latitude)
                zoom: 15, // Initial zoom level
            });
            const geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl,
            });
             map.addControl(geocoder, 'top-left');
           
            // Clean up the map when the component is unmounted
            return () => map.remove();
        }, []);
    
    
return <div id="map-container"  style={{ width: '100%', height: '400px'}} />;

    }
export default Map;



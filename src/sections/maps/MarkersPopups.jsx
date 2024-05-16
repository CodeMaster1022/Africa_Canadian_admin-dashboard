import React, { useEffect, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import PropTypes from 'prop-types';

const MarkersPopups = ({ search, data }) => {
  useEffect(() => console.log(data));

  useEffect(() => {
    console.log('ok');
    async function initMap() {
      // Request needed libraries.
      const { Map, InfoWindow } = await window.google.maps.importLibrary('maps');
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary('marker');
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 3.5,
        center: { lat: 56.1304, lng: -106.3468 },
        mapId: '4504f8b37365c3d0'
      });
      const infoWindow = new window.google.maps.InfoWindow({
        content: '',
        disableAutoPan: true
      });
      // Create an array of alphabetical characters used to label the markers.
      const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // Add some markers to the map.

      const markers = data
        .filter((city) => city.province === search)
        .map((city, i) => {
          const position = { lat: city.latlng[0], lng: city.latlng[1] };
          const label = labels[i % labels.length];
          const pinGlyph = new window.google.maps.marker.PinElement({
            glyph: label,
            glyphColor: 'white'
          });
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position,
            content: pinGlyph.element
          });

          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener('click', (e) => {
            const innerHTML = `
            <div>
              <img
                src=${city.image}
                style={{ width: '100%', height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}
                alt="hello"
              />
              <h3>${city.name}</h3>
              <h3>${city.nickName}</h3>
              <h3>${city.joined}</h3>
              <h3>${city.country}</h3>
              <h3>${city.joined}</h3>
              <button style="background-color:MediumSeaGreen;color: white;padding: 15px 32px;border: none; width:100%";border-radius: 12px;">View Detail</button>
            </div>`;
            infoWindow.setContent(innerHTML);
            console.log('info::', e.domEvent.clientX, e.domEvent.clientY);
            infoWindow.open(map, marker);
          });
          return marker;
        });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    }
    initMap();
  });
  return <div id="map" style={{ width: '100%', height: '80vh' }}></div>;
};

export default MarkersPopups;
MarkersPopups.propTypes = { data: PropTypes.array, search: PropTypes.string, other: PropTypes.any };

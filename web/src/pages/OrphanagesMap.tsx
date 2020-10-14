import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMoon, FiSun, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../utils/mapIcon";

import "leaflet/dist/leaflet.css";

import mapMarker from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";
import api from "../services/api";

interface Images {
  url: string;
  id: number;
}

export interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Images[];
}

const OrphanagesMap: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  const SwitchMode = useCallback(() => {
    setDark((state) => !state);
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Ponta Grossa</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map
        center={[-25.0995908, -50.1523865]}
        zoom={15}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            dark ? "dark" : "light"
          }-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${
            process.env.REACT_APP_MAPBOX_TOKEN
          }`}
        />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <button onClick={SwitchMode} className="switch-mode">
        {dark ? (
          <FiMoon size={32} color="#121212" />
        ) : (
          <FiSun size={32} color="#ffd666" />
        )}
      </button>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;

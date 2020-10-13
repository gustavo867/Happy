import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMoon, FiSun } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import mapMarker from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";

const OrphanagesMap: React.FC = () => {
  const [dark, setDark] = useState(false);

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
        center={[-24.6169813, -51.3214141]}
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
      </Map>

      <button onClick={SwitchMode} className="switch-mode">
        {dark ? (
          <FiMoon size={32} color="#121212" />
        ) : (
          <FiSun size={32} color="#ffd666" />
        )}
      </button>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;

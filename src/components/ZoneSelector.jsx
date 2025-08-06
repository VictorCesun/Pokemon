import React from "react";

const ZoneSelector = ({ onSelectZone }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🌍 Selecciona una Zona de Combate</h2>
      <button onClick={() => onSelectZone("bosque")} style={{ margin: "10px" }}>
        🌲 Bosque
      </button>
      <button onClick={() => onSelectZone("volcán")} style={{ margin: "10px" }}>
        🌋 Volcán
      </button>
    </div>
  );
};

export default ZoneSelector;

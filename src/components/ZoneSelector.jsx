import React from "react";

const ZoneSelector = ({ onSelectZone }) => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#282c34", // fondo oscuro
        color: "#fff", // texto blanco
        minHeight: "150px",
        borderRadius: "8px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "10px", fontWeight: "bold" }}>
        Pokémon Pirata No tan pirata 1
      </h1>
      <h2>🌍 Selecciona una Zona de Combate</h2>
      <button
        onClick={() => onSelectZone("bosque")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#4caf50",
          color: "white",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4caf50")}
      >
        🌲 Bosque
      </button>
      <button
        onClick={() => onSelectZone("volcán")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#f44336",
          color: "white",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#da190b")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f44336")}
      >
        🌋 Masmorra
      </button>
    </div>
  );
};

export default ZoneSelector;

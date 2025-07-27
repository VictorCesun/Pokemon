import React from 'react';
import Game from './components/Game'; // Importa el nuevo componente principal del juego
import './index.css'; // Asegúrate de que los estilos globales sigan aquí

function App() {
  return (
    <div className="app-container">      
      <Game /> {/* Renderiza el componente que contiene toda la lógica del juego */}
    </div>
  );
}

export default App;
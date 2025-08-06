import React, { useState, useRef, useEffect } from "react";
import OverworldComponent from "./OverworldComponent.jsx";
import CombatComponent from "./CombatComponent.jsx";
import ZoneSelector from "./ZoneSelector.jsx";

// Etapa 9: Importa todo lo necesario para crear las instancias del juego
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
import { TileMap } from "../game/TileMap.js";
import mapaBosque from "../assets/mapa/mapa_bosque.json";
import mapaVolcan from "../assets/mapa/mapa_volcan.json";
import tilesetImageSrc from "../assets/tiles/basictiles.png";
import playerSpriteSrc from "../assets/sprites/RED_v03.png";

const Game = () => {
  const [gameState, setGameState] = useState("SELECT_ZONE");
  const [selectedZone, setSelectedZone] = useState(null); 

  const gameRef = useRef(null);
  const [isGameReady, setGameReady] = useState(false);

  // Cargar assets
useEffect(() => {
  if (!selectedZone) return; // Espera a que se seleccione una zona

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });

  Promise.all([loadImage(tilesetImageSrc), loadImage(playerSpriteSrc)]).then(
    ([tilesetImage, playerImage]) => {
      const input = new InputHandler();

      // Seleccionamos el mapa correcto según la zona
      const mapData = selectedZone === "volcán" ? mapaVolcan : mapaBosque;

      const map = new TileMap(mapData, tilesetImage);
      const player = new Player(playerImage, input, handleEnterCombat);

      gameRef.current = { map, player, input };
      setGameReady(true);
    }
  );

  return () => {
    if (gameRef.current?.input) {
      gameRef.current.input.destroy();
    }
  };
}, [selectedZone]); 


  // Cambiar a combate
  const handleEnterCombat = () => setGameState("COMBAT");

  // Salir del combate: volver al overworld
  const handleExitCombat = () => setGameState("OVERWORLD");

  // Después de elegir zona: iniciar el juego
  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setGameState("OVERWORLD");
  };

  return (
    <div>
      {gameState === "SELECT_ZONE" && <ZoneSelector onSelectZone={handleZoneSelect} />}

      {gameState === "OVERWORLD" && isGameReady && (
        <OverworldComponent game={gameRef.current} />
      )}

      {gameState === "COMBAT" && (
        <CombatComponent zone={selectedZone} onExitCombat={handleExitCombat} />
      )}
    </div>
  );
};

export default Game;

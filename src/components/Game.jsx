import React, { useState, useRef, useEffect } from "react";
import OverworldComponent from "./OverworldComponent.jsx";
import CombatComponent from "./CombatComponent.jsx";

// Etapa 9: Importa todo lo necesario para crear las instancias del juego
import { Player } from "../game/Player.js";
import { InputHandler } from "../game/InputHandler.js";
import { TileMap } from "../game/TileMap.js";
import mapData from "../assets/mapa/mapa.json";
import tilesetImageSrc from "../assets/tiles/basictiles.png";
import playerSpriteSrc from "../assets/sprites/RED_v03.png";

const Game = () => {
  const [gameState, setGameState] = useState("OVERWORLD");

  // 1. Usamos useRef para guardar las instancias del juego.
  // Esto asegura que solo se creen una vez.
  const gameRef = useRef(null);

  const [isGameReady, setGameReady] = useState(false);

  // 2. Usamos useEffect para cargar los assets y crear las instancias.
  // Esto se ejecutará solo una vez al inicio.
  useEffect(() => {
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
        const map = new TileMap(mapData, tilesetImage);
        const player = new Player(playerImage, input, handleEnterCombat); // Pasamos la función de combate

        // Guardamos todo en el ref
        gameRef.current = { map, player, input };

        // 2. Cuando todo está cargado, actualizamos el estado.
        // Esto SÍ provocará un re-renderizado.
        setGameReady(true);
      }
    );
    // Etapa 9: Esta función de retorno se ejecutará cuando el componente Game se desmonte
    return () => {
        if (gameRef.current && gameRef.current.input) {
            // Limpiamos los listeners del teclado para evitar fugas de memoria
            gameRef.current.input.destroy();
        }
    }
  }, []); // El array vacío asegura que se ejecute solo una vez.

  const handleEnterCombat = () => setGameState("COMBAT");
  const handleExitCombat = () => setGameState("OVERWORLD");

  return (
    <div>
      {/* 3. La condición ahora usa el nuevo estado 'isGameReady' */}
      {gameState === "OVERWORLD" && isGameReady && (
        <OverworldComponent game={gameRef.current} />
      )}
      {gameState === "COMBAT" && (
        <CombatComponent onExitCombat={handleExitCombat} />
      )}
    </div>
  );
};

export default Game;

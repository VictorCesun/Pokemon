import React, { useRef, useEffect } from "react";

const OverworldComponent = ({ game }) => {
  const canvasRef = useRef(null);
  const lastTimeRef = useRef(0);
  // Etapa 9: Entrando y saliendo de combate
  // 1. Se usa un 'ref' para guardar el ID de la animación.
  // A diferencia de una variable 'let', un 'ref' sobrevive al ciclo de
  // desmontaje y montaje, permitiéndonos cancelar el bucle correcto.
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    // Este log es para depurar. Nos permite ver en la consola
    // cada vez que un nuevo bucle de juego es creado.
    console.log("MONTANDO OverworldComponent: Iniciando nuevo game loop.");

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    const { map, player } = game;
    const collisionZone = map.getObject("Pasto-Detectar");

    const gameLoop = (timestamp) => {
      // Este chequeo previene un salto enorme en 'deltaTime' la primera vez
      // que el bucle se ejecuta después de volver del modo combate.
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      player.update(deltaTime, collisionZone);

      context.clearRect(0, 0, canvas.width, canvas.height);
      map.draw(context);
      player.draw(context);

      // El bucle se sigue llamando a sí mismo, guardando los IDs subsecuentes
      // en el ref para que la función de limpieza siempre tenga el más reciente.
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    // 2. Arreglo para la "Race Condition".
    // Capturamos el ID de la PRIMERA petición de frame inmediatamente.
    // Esto asegura que si el componente se desmonta muy rápido,
    // siempre tendremos un ID válido que cancelar.
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    // 3. La función de limpieza se ejecuta cuando el componente se desmonta.
    return () => {
      // Este log nos ayuda a confirmar que el bucle se está deteniendo.
      console.log(`DESMONTANDO OverworldComponent: Deteniendo game loop ID: ${animationFrameIdRef.current}`);
      
      // Detiene el bucle de animación para que no se acumulen.
      cancelAnimationFrame(animationFrameIdRef.current);
      
      // 4. Arreglo "Anti-Saltos".
      // Reseteamos el tiempo para que la próxima vez que se monte el componente,
      // el cálculo de deltaTime empiece de cero y no cause un salto en el personaje.
      lastTimeRef.current = 0; 
    };
  // 5. El array de dependencias vacío.
  // Es la clave principal. Asegura que este useEffect se ejecute una vez al
  // "montarse" y su función de limpieza se ejecute una vez al "desmontarse",
  // creando un ciclo de vida limpio y predecible.
  }, []); 

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      style={{ backgroundColor: "#222" }}
    />
  );
};

export default OverworldComponent;
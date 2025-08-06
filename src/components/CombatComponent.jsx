import React, { useState, useEffect } from "react";

const zoneTypes = {
  bosque: ["agua", "eléctrico", "planta", "volador"],
  volcán: ["fuego", "siniestro", "roca", "lucha"],
};

// --- Datos de ataques por tipo de enemigo ---
const enemyTypes = {
  fuego: [
    { name: "Ascuas", damage: 40, accuracy: 100 },
    { name: "Lanzallamas", damage: 60, accuracy: 90 },
    { name: "Pantalla de Humo", damage: 0, accuracy: 100 },
    { name: "Giro Fuego", damage: 35, accuracy: 85 },
  ],
  agua: [
    { name: "Pistola Agua", damage: 40, accuracy: 100 },
    { name: "Hidrobomba", damage: 65, accuracy: 80 },
    { name: "Rizo Defensa", damage: 0, accuracy: 100 },
    { name: "Burbuja", damage: 30, accuracy: 95 },
  ],
  siniestro: [
    { name: "Mordisco", damage: 40, accuracy: 100 },
    { name: "Golpe Bajo", damage: 60, accuracy: 80 },
    { name: "Maquinación", damage: 0, accuracy: 100 },
    { name: "Juego Sucio", damage: 50, accuracy: 90 },
  ],
  eléctrico: [
    { name: "Impactrueno", damage: 40, accuracy: 100 },
    { name: "Trueno", damage: 70, accuracy: 75 },
    { name: "Carga", damage: 0, accuracy: 100 },
    { name: "Chispa", damage: 45, accuracy: 90 },
  ],
  planta: [
    { name: "Hoja Afilada", damage: 40, accuracy: 100 },
    { name: "Latigazo", damage: 55, accuracy: 95 },
    { name: "Drenadoras", damage: 0, accuracy: 100 },
    { name: "Rayo Solar", damage: 65, accuracy: 90 },
  ],
  roca: [
    { name: "Piedra Afilada", damage: 40, accuracy: 100 },
    { name: "Avalancha", damage: 60, accuracy: 90 },
    { name: "Refuerzo", damage: 0, accuracy: 100 },
    { name: "Golpe Roca", damage: 35, accuracy: 85 },
  ],
  volador: [
    { name: "Ataque Ala", damage: 40, accuracy: 100 },
    { name: "Tornado", damage: 60, accuracy: 85 },
    { name: "Viento Cortante", damage: 50, accuracy: 90 },
    { name: "Picotazo", damage: 35, accuracy: 95 },
  ],
  lucha: [
    { name: "Puño Dinámico", damage: 40, accuracy: 100 },
    { name: "Doble Patada", damage: 60, accuracy: 90 },
    { name: "Agarre", damage: 0, accuracy: 100 },
    { name: "Golpe Karate", damage: 50, accuracy: 85 },
  ],
};

const pokemonsByZone = {
  bosque: [
    { name: "Squirtle", type: "agua", moves: enemyTypes.agua },
    { name: "Pikachu", type: "eléctrico", moves: enemyTypes.eléctrico },
    { name: "Bulbasaur", type: "planta", moves: enemyTypes.planta },
    { name: "Pidgey", type: "volador", moves: enemyTypes.volador },
  ],
  volcan: [
    { name: "Charmander", type: "fuego", moves: enemyTypes.fuego },
    { name: "Murkrow", type: "siniestro", moves: enemyTypes.siniestro },
    { name: "Onix", type: "roca", moves: enemyTypes.roca },
    { name: "Machop", type: "lucha", moves: enemyTypes.lucha },
  ],
};

const CombatComponent = ({ zone, onExitCombat }) => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(120);
  const [combatMessage, setCombatMessage] = useState("¡Un enemigo apareció!");
  const [enemyType, setEnemyType] = useState("");
  const [enemyMoves, setEnemyMoves] = useState([]);
  const [showMoves, setShowMoves] = useState(false);
  const [showPotionMenu, setShowPotionMenu] = useState(false);

  // Aquí definí movimientos simples para el jugador
  const playerMoves = [
    { name: "Golpe Básico", damage: 40, accuracy: 95 },
    { name: "Patada", damage: 50, accuracy: 90 },
    { name: "Ataque Rápido", damage: 60, accuracy: 100 },
    { name: "Defensa", damage: 1, accuracy: 100 },
  ];

  // Inventario de pociones
  const [potions, setPotions] = useState({
    pocion: 2,
    super: 1,
    hiper: 1,
  });

  useEffect(() => {
    const types = zoneTypes[zone] || ["agua"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setEnemyType(randomType);
    setEnemyMoves(enemyTypes[randomType]);
    setCombatMessage(`¡Un Pokémon de tipo ${randomType.toUpperCase()} apareció en la zona ${zone.toUpperCase()}!`);
  }, [zone]);

  useEffect(() => {
    if (playerHealth <= 0) {
      setCombatMessage("¡Has perdido la batalla!");
      setTimeout(onExitCombat, 2000); // salir del combate después de 2s
    }
  }, [playerHealth, onExitCombat]);

  const getPlayerHealthColor = () => {
    const p = (playerHealth / 100) * 100;
    if (p <= 15) return "red";
    if (p <= 50) return "yellow";
    return "green";
  };

  const getEnemyHealthColor = () => {
    const p = (enemyHealth / 120) * 100;
    if (p <= 15) return "red";
    if (p <= 50) return "yellow";
    return "green";
  };

  const enemyAttack = () => {
    if (enemyHealth <= 0) return;

    const move = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
    const hit = Math.random() * 100 < move.accuracy;

    if (!hit) {
      setCombatMessage((prev) => prev + `\n¡El enemigo falló ${move.name}!`);
      return;
    }

    if (move.damage === 0) {
      setCombatMessage((prev) => prev + `\n¡El enemigo usó ${move.name}!`);
      return;
    }

    setPlayerHealth((prev) => Math.max(0, prev - move.damage));
    setCombatMessage((prev) => prev + `\n¡El enemigo usó ${move.name} e hizo ${move.damage} de daño!`);
  };

  const handleMove = (move) => {
    const hit = Math.random() * 100 < move.accuracy;
    setShowMoves(false);
    setShowPotionMenu(false);

    if (!hit) {
      setCombatMessage(`¡${move.name} falló!`);
      setTimeout(enemyAttack, 1000);
      return;
    }

    const newEnemyHealth = Math.max(0, enemyHealth - move.damage);
    setEnemyHealth(newEnemyHealth);

    const recoil = 5;
    setPlayerHealth((prev) => Math.max(0, prev - recoil));

    if (move.damage === 0) {
      setCombatMessage(`¡Usaste ${move.name}! No causó daño.`);
    } else {
      setCombatMessage(`¡Usaste ${move.name} e hiciste ${move.damage} de daño! Recibes ${recoil} de retroceso.`);
    }

    if (newEnemyHealth > 0) {
      setTimeout(enemyAttack, 1000);
    }
  };

  const usePotion = (type) => {
    const healingValues = {
      pocion: 15,
      super: 50,
      hiper: 120,
    };

    const amount = healingValues[type];
    const current = potions[type];

    if (current <= 0 || playerHealth >= 100 || enemyHealth <= 0) return;

    const healed = Math.min(100 - playerHealth, amount);
    setPlayerHealth((prev) => prev + healed);
    setPotions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    setCombatMessage(`¡Usaste una ${type.toUpperCase()} y recuperaste ${healed} HP!`);
    setShowPotionMenu(false);

    setTimeout(enemyAttack, 1000);
  };

  return (
    <div
      style={{
        width: "640px",
        height: "480px",
        backgroundColor: "#F8F8F8",
        border: "4px solid black",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Pantalla de batalla */}
      <div style={{ flex: 1, position: "relative", padding: "20px" }}>
        {/* Enemigo */}
        <div style={{ textAlign: "right" }}>
          <span>{enemyType.toUpperCase()}</span>
          <div style={{ border: "1px solid black", width: "200px", marginLeft: "auto" }}>
            <div
              style={{
                height: "10px",
                backgroundColor: getEnemyHealthColor(),
                width: `${(enemyHealth / 120) * 100}%`,
                transition: "width 0.3s ease, backgroundColor 0.3s ease",
              }}
            ></div>
          </div>
          <span>HP: {Math.max(0, enemyHealth)} / 120</span>
        </div>

        {/* Jugador */}
        <div style={{ textAlign: "left", position: "absolute", bottom: "120px", left: "20px" }}>
          <span>JUGADOR</span>
          <div style={{ border: "1px solid black", width: "200px" }}>
            <div
              style={{
                height: "10px",
                backgroundColor: getPlayerHealthColor(),
                width: `${(playerHealth / 100) * 100}%`,
                transition: "width 0.3s ease, backgroundColor 0.3s ease",
              }}
            ></div>
          </div>
          <span>HP: {playerHealth} / 100</span>
        </div>
      </div>

      {/* Caja inferior */}
      <div style={{ height: "100px", borderTop: "4px solid black", display: "flex" }}>
        <div style={{ flex: 2, padding: "10px", borderRight: "4px solid black", whiteSpace: "pre-line" }}>
          {combatMessage}
          <br />
          <span>
            🧪 Pociones: {potions.pocion} | Super: {potions.super} | Híper: {potions.hiper}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {showMoves ? (
            playerMoves.map((move, index) => (
              <button key={index} onClick={() => handleMove(move)}>
                {move.name} (⚔ {move.damage} / 🎯 {move.accuracy}%)
              </button>
            ))
          ) : showPotionMenu ? (
            <>
              <button onClick={() => usePotion("pocion")} disabled={potions.pocion <= 0 || playerHealth === 100}>
                Usar POCIÓN (+15)
              </button>
              <button onClick={() => usePotion("super")} disabled={potions.super <= 0 || playerHealth === 100}>
                Usar SÚPER POCIÓN (+50)
              </button>
              <button onClick={() => usePotion("hiper")} disabled={potions.hiper <= 0 || playerHealth === 100}>
                Usar HÍPERPOCIÓN (+120)
              </button>
              <button onClick={() => setShowPotionMenu(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowMoves(true)} disabled={enemyHealth <= 0}>
                Combatir
              </button>
              <button onClick={() => setShowPotionMenu(true)} disabled={enemyHealth <= 0}>
                Usar Poción
              </button>
              <button onClick={onExitCombat} disabled={enemyHealth > 0}>
                Huir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombatComponent;

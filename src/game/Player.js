import { IdleState } from "./states/IdleState.js";

export class Player {
  constructor(image, input, onEnterCombat) {
    this.x = 100;
    this.y = 100;
    this.image = image;
    this.input = input;
    this.width = 30;
    this.height = 35;
    this.spriteWidth = 30;
    this.spriteHeight = 35;
    this.columna = 0;
    this.fila = 0;
    this.currentState = new IdleState();

    this.speed = 200;

    this.maxFrame = 3;
    this.frameTimer = 0;
    this.frameInterval = 100;

    this.currentState.enter(this);

    this.isInsideZone = false;
    this.onEnterCombat = onEnterCombat;
  }

  setState(newState) {
    this.currentState = newState;
    this.currentState.enter(this);
  }

  update(deltaTime, collisionZone) {
    const newState = this.currentState.handleInput(this.input);
    if (newState) {
      this.setState(newState);
    }

    if (this.currentState.update) {
      this.currentState.update(this, deltaTime);
    }

    // Etapa 9: LÓGICA DE ENCUENTRO CORREGIDA
    // Solo se activa si el jugador está en la zona Y en estado de movimiento.
    if (this.isInsideZone && this.currentState.name === "MOVE") {
      const encounterChance = 0.01; // Reducimos la probabilidad
      if (Math.random() < encounterChance) {
        this.onEnterCombat();
      }
    }

    this.isInsideZone = this.checkCollision(collisionZone);
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.columna * this.spriteWidth,
      this.fila * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  
  checkCollision(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}

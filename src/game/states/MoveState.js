import { IdleState } from "./IdleState.js";

export class MoveState {
  constructor() {
    this.name = "MOVE";
  }

  enter() {
    console.log("Entrando en estado MOVE");
  }

  update(player, deltaTime) {
    const moveDistance = player.speed * (deltaTime / 1000);
    
    if (player.input.keys.ArrowUp) {
      player.y -= moveDistance;
      player.fila = 2;
    } else if (player.input.keys.ArrowDown) {
      player.y += moveDistance;
      player.fila = 0;
    } else if (player.input.keys.ArrowLeft) {
      player.x -= moveDistance;
      player.fila = 3;
    } else if (player.input.keys.ArrowRight) {
      player.x += moveDistance;
      player.fila = 1;
    }

    // Etapa 9: La lógica de encuentro ya NO va aquí.    
    
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > 640) player.x = 640 - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > 480) player.y = 480 - player.height;
    
    player.frameTimer += deltaTime;
    if (player.frameTimer > player.frameInterval) {
      player.frameTimer = 0;
      if (player.columna < player.maxFrame) {
        player.columna++;
      } else {
        player.columna = 0;
      }
    }
  }

  handleInput(input) {
    if (!input.isMoving()) {
      return new IdleState();
    }
    return null;
  }
}

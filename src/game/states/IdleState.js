import { MoveState } from './MoveState.js';

export class IdleState {
    constructor() {
        this.name = 'IDLE';
    }

    enter(player) {
        console.log("Entrando en estado IDLE");
        player.columna = 0; // Resetea la columna del sprite a 0 para el estado idle
    }    

    handleInput(input) {
        // Si se detecta movimiento, cambia al estado MOVE
        if (input.isMoving()) { // Necesitarás una clase InputHandler que tenga este método
            return new MoveState();
        }
        return null; // Si no hay cambio, devuelve null
    }
}
export class InputHandler {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,            
        };

        // Etapa 8: 1. Guarda las funciones de los listeners como propiedades de la clase.
        // Usamos funciones de flecha para que 'this' se refiera correctamente a la instancia de InputHandler.
        this.handleKeyDown = (event) => {
            if (Object.prototype.hasOwnProperty.call(this.keys, event.key)) {
                this.keys[event.key] = true;
            }
        };

        this.handleKeyUp = (event) => {
            if (Object.prototype.hasOwnProperty.call(this.keys, event.key)) {
                this.keys[event.key] = false;
            }
        };

        // 2. Añade los listeners usando esas referencias.
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    isMoving() {
        return this.keys.ArrowUp || this.keys.ArrowDown || 
               this.keys.ArrowLeft || this.keys.ArrowRight;
    }

    // 3. Creamos el método 'destroy' para eliminar los listeners.
    destroy() {
        console.log("Eliminando listeners de InputHandler...");
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }
}
import React from 'react';

// Este componente recibe una prop: la función `onClose` que le pasa su padre.
const ModalComponent = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Hola de nuevo</h2>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalComponent;
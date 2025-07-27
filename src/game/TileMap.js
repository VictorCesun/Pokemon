export class TileMap {
    constructor(mapData, tilesetImage) {
        this.mapData = mapData;
        this.tileset = tilesetImage;
        
        // Propiedades del mapa para fácil acceso
        this.tileWidth = mapData.tilewidth;
        this.tileHeight = mapData.tileheight;
        this.mapWidth = mapData.width;
        this.mapHeight = mapData.height;
        
        // Propiedades del tileset
        this.tilesetCols = Math.floor(this.tileset.width / this.tileWidth);
    }

    // Etapa 6: Método para obtener un objeto por su nombre desde una capa de objetos
    getObject(layerName, objectName) {
        const layer = this.mapData.layers.find(l => l.name === layerName && l.type === 'objectgroup');
        if (!layer) return null;
        // Si no se especifica un nombre, devuelve el primer objeto de la capa
        if (!objectName) return layer.objects[0];
        return layer.objects.find(obj => obj.name === objectName);
    }

    draw(context) {
        // Itera sobre cada capa del mapa
        this.mapData.layers.forEach(layer => {
            // Solo dibuja capas de tiles que sean visibles
            if (layer.type !== 'tilelayer' || !layer.visible) {
                return;
            }

            // Dibuja cada tile de la capa
            for (let y = 0; y < this.mapHeight; y++) {
                for (let x = 0; x < this.mapWidth; x++) {
                    const tileIndexInMap = y * this.mapWidth + x;
                    const tileGid = layer.data[tileIndexInMap];

                    // Si el GID es 0, es un tile vacío, no dibujamos nada
                    if (tileGid === 0) {
                        continue;
                    }

                    // Calculamos la posición del tile en el tileset
                    const sourceX = ((tileGid - 1) % this.tilesetCols) * this.tileWidth;
                    const sourceY = Math.floor((tileGid - 1) / this.tilesetCols) * this.tileHeight;

                    // Calculamos la posición donde dibujar en el canvas
                    const destX = x * this.tileWidth;
                    const destY = y * this.tileHeight;

                    context.drawImage(
                        this.tileset,  // La imagen del tileset
                        sourceX,       // X del recorte en el tileset
                        sourceY,       // Y del recorte en el tileset
                        this.tileWidth, // Ancho del recorte
                        this.tileHeight,// Alto del recorte
                        destX,         // X donde se dibuja en el canvas
                        destY,         // Y donde se dibuja en el canvas
                        this.tileWidth, // Ancho del dibujado
                        this.tileHeight // Alto del dibujado
                    );
                }
            }
        });
    }
}
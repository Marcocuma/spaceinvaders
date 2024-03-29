import {
    Objeto
} from './classObjeto.js';
export class Jugador extends Objeto {
    constructor(x, y, pox, posy, velox, veloy, ancho, alto, color) {
        super(x, y, pox, posy, velox, veloy, ancho, alto);
        this.juga = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.juga.setAttribute('width', this.x);
        this.juga.setAttribute('height', this.y);
        this.juga.setAttribute('href', './img/nave.png');
        this.juga.setAttribute('x', this.posx);
        this.juga.setAttribute('y', this.posy);
        this.veloBala = 3;
    }
    dibujar() {
        //asigna la posicion en x e y al jugador
        this.juga.setAttribute('x', this.posx);
        this.juga.setAttribute('y', this.posy);
    }
    getJugador() {
        //retorna todos los valores del jugador
        return this.juga;
    }
}
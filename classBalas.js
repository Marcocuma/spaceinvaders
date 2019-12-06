import {
    Objeto
} from './classObjeto.js';
export class Bala extends Objeto {
    constructor(x, y, posx, posy, veloy, ancho, alto, color) {
        super(x, y, posx, posy, 0, veloy, ancho, alto);
        this.bala = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.bala.setAttribute('width', x);
        this.bala.setAttribute('height', y);
        this.bala.setAttribute('fill', color);
        this.bala.setAttribute('x', this.posx);
        this.bala.setAttribute('y', this.posy);
    }
    dibujar() {
        //asigna la posicion en x e y a la bala
        this.bala.setAttribute('x', this.posx);
        this.bala.setAttribute('y', this.posy);
    }
    getBala() {
        //retorna todos los valores de la bala
        return this.bala;
    }

}
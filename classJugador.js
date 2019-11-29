import {Objeto} from './classObjeto.js';
export class Jugador extends Objeto{
    constructor(x,y,pox,posy,velox,veloy,ancho,alto,color){
        super(x,y,pox,posy,velox,veloy,ancho,alto);
        this.juga=document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.juga.setAttribute('width',this.x);
        this.juga.setAttribute('height',this.y);
        this.juga.setAttribute('fill',color);
        this.juga.setAttribute('x',this.posx);
        this.juga.setAttribute('y',this.posy);
        this.veloBala=3;
    }
    dibujar(){
        this.juga.setAttribute('x',this.posx);
        this.juga.setAttribute('y',this.posy); 
    }
    disparar(){
        arr= new Array()
    }
    getJugador(){
        return this.juga;
    }
}
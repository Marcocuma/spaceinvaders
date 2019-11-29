import {Objeto} from './classObjeto.js';
export class Bala extends Objeto{
    constructor(x,y,posx,posy,veloy,ancho,alto,color){
        super(x,y,posx,posy,0,veloy,ancho,alto);
        this.bala=document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.bala.setAttribute('width',x);
        this.bala.setAttribute('height',y);
        this.bala.setAttribute('fill',color);
        this.bala.setAttribute('x',this.posx);
        this.bala.setAttribute('y',this.posy);
    }
    dibujar(){
        this.bala.setAttribute('x',this.posx);
        this.bala.setAttribute('y',this.posy); 
    }
    getBala(){
        return this.bala;
    }

}
import {Objeto} from './classObjeto.js';
class Bala extends Objeto{
    constructor(x,y,veloy,alto,color){
        super(x,y,0,veloy,0,alto);
        this.bala=document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.bala.setAttribute('width',x);
        this.bala.setAttribute('height',y);
        this.bala.setAttribute('fill',color);
    }
    dibujar(){
        this.bala.setAttribute('width',this.x);
        this.bala.setAttribute('height',this.y); 
    }

}
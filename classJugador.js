import {Objeto} from './classObjeto.js';
class Jugador extends Objeto{
    constructor(x,y,velox,veloy,ancho,alto,color){
        super(x,y,velox,veloy,ancho,alto);
        this.juga=document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.juga.setAttribute('width',x);
        this.juga.setAttribute('height',y);
        this.juga.setAttribute('fill',color);
        this.veloBala=3;
    }
    dibujar(){
        this.juga.setAttribute('width',this.x);
        this.juga.setAttribute('height',this.y); 
    }
    disparar(){
        arr= new Array()
    }


}
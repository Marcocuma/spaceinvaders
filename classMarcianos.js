import {Objeto} from './classObjeto.js';
class Marcianos extends Objeto{
    constructor(x,y,velox,veloy,ancho,alto,color){
        super(x,y,velox,veloy,ancho,alto);
        this.marciano=document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.marciano.setAttribute('width',x);
        this.marciano.setAttribute('height',y);
        this.marciano.setAttribute('fill',color);
    }
    dibujar(){
        this.marciano.setAttribute('width',this.x);
        this.marciano.setAttribute('height',this.y); 
    }
    dispararAleatorio(){
    //cuando el numero aleatorio
        let num=Math.random()*(50 - 1);
        if(num==25){
            return true;
        }else{
            return false;
        }
    }

}
import {Objeto} from './classObjeto.js';
export class Marciano extends Objeto{
    constructor(x,y,pox,posy,velox,veloy,ancho,alto){
        super(x,y,pox,posy,velox,veloy,ancho,alto);
        this.marciano=document.createElementNS('http://www.w3.org/2000/svg','image');
        this.marciano.setAttribute('width',this.x);
        this.marciano.setAttribute('height',this.y);
        this.marciano.setAttribute('x',this.posx);
        this.marciano.setAttribute('y',this.posy);
        this.marciano.setAttribute('href','./img/marciano.png');
    }
    getMarciano(){
        return this.marciano;
    }
    dibujar(){
        this.marciano.setAttribute('x',this.posx);
        this.marciano.setAttribute('y',this.posy); 
    }
    dispararAleatorio(){
    //cuando el numero aleatorio es igual a 25 retorna true
        let num=Math.trunc(Math.random()*(200 - 1));
        if(num==25){
            return true;
        }else{
            return false;
        }
    }
    setDirX(valor){
        this.izqder=valor;
    }
    setDirY(valor){
        this.arrbaj=valor;
    }
}
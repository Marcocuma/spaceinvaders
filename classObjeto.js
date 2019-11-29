export class Objeto{
    //Nota del mono: he añadido ancho y alto del objeto que no lo tenia antes.
    constructor(x,y,posx,posy,velox,veloy,ancho,alto){
        this.x=x;
        this.y=y;
        this.velox=velox;
        this.veloy=veloy;
        this.ancho=ancho;
        this.posx=posx;
        this.posy=posy;
        this.alto=alto;
    }
    comprobarMovimientoX(direccion){
        //direccion= true - derecha  false izquierda
        if(direccion){
            if(this.posx+this.x+this.velox<this.ancho-this.x/2){
                return true;
            }else{
                return false;
            }
        }else{
            if(this.posx-this.velox>0+this.x/2){
                return true;
            }else{
                return false;
            }
        }
    }
    moverx(direccion){
        //direccion= true - derecha  false izquierda
        if(direccion){           
            if(this.comprobarMovimientoX(direccion)){
                this.posx+=this.velox;
            }
        }else{
            if(this.comprobarMovimientoX(direccion)){
                this.posx-=this.velox;
            }
        }
        return this.izqder;
    }
    movery(direccion){
        //direccion= true - abajo  false arriba
        if(direccion){           
            if(this.posy<this.alto){
                this.posy+=this.veloy;
                return false;
            }else{
                this.arrbaj=false;
            }
        }else{
            if(this.posy>this.alto){
                this.posy-=this.veloy;
            }else{
                this.arrbaj=true;
            }
        }
        return this.arrbaj;  
    }
    cambiarDireccionDerecha(derecha){
        this.izqder=derecha;
    }
    cambiarDireccionAbajo(abajo){
        this.arrbaj=abajo;
    }
    getposicionX(){
        return this.x;
    }
    getposicionY(){
        return this.y;
    }
}

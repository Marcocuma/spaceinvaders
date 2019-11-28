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
        this.izqder=true;
        this.arrbaj=true;
    }
    moverx(){
        if(this.izqder){           
            if(this.x<this.ancho){
                this.x+=this.velox;
            }else{
                this.izqder=false;
            }
        }else{
            if(this.x>this.ancho){
                this.x-=this.velox;
            }else{
                this.izqder=true;
            }
        }
        return this.izqder;
    }
    movery(){
        if(this.arrbaj){           
            if(this.y<this.alto){
                this.y+=this.veloy;
            }else{
                this.arrbaj=false;
            }
        }else{
            if(this.y>this.alto){
                this.y-=this.veloy;
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

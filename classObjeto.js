export class Objeto{
    constructor(x,y,velox,veloy,ancho,alto){
        this.x=x;
        this.y=y;
        this.velox=velox;
        this.veloy=veloy;
        this.ancho=ancho;
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
    }
    get posicionX(){
        return this.x;
    }
    get posicionY(){
        return this.y;
    }
}

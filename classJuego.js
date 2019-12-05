import {Jugador} from './classJugador.js';
import {Marciano} from './classMarcianos.js';
import {Bala} from './classBalas.js';
export class Juego{
    constructor(alto, ancho, iddiv){
        
        this.alto=alto;
        this.ancho=ancho;
        this.div=document.getElementById(iddiv);
        this.reset();
        this.iniciar();
    }
    reiniciar(){
        this.borrarTablero();
        this.reset();
        this.iniciar();
    }
    borrarTablero(){
        this.fondo.removeChild(this.tablero);
        this.fondo.removeChild(this.boton);
    }
    reset(){
        //reinicia los objetos y variables del juego.
        this.fondo=document.createElement("div")
        this.fondo.setAttribute("height",this.alto);
        this.fondo.setAttribute("width",this.ancho);
        this.fondo.style.background="url('./img/fondo.gif')no-repeat fixed";
        this.fondo.style.backgroundSize="cover"
        this.tablero=document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.tablero.setAttribute("height",this.alto);
        this.tablero.setAttribute("width",this.ancho);
        this.tablero.id="tablero";
        this.boton=document.createElement("p");
        this.boton.id="boton";
        this.boton.innerText="Reiniciar";
        this.contadorDisparo;
        this.partida;
        this.jugador;
        this.marcianitos;
        // dir-> false - izquierda, true - derecha
        this.dirMarcianos=true;
        this.espacioEntreMarcianos;
        this.balas;
        this.balasMarcianos;
        this.margen;
        this.boton.addEventListener("click",()=>this.reiniciar());
        this.div.addEventListener("keydown",(e)=>this.pulsacionTecla(e.keyCode));
        this.div.appendChild(this.fondo);
        this.fondo.appendChild(this.tablero);
        this.div.setAttribute("tabIndex",0);
        this.fondo.appendChild(this.boton);
        this.jugador=new Jugador(60,60,this.ancho/2,this.alto-100,5+1,0,this.ancho,this.alto,"blue");
        this.anadirElemento(this.jugador.getJugador());
        this.contadorDisparo=0;
        this.marcianitos=new Array();
        this.balas=new Array();
        this.balasMarcianos=new Array();
        this.dir=1;
        this.colocarMarcianitos(60,40);
    }
    iniciar(){
        //Comienza el bucle del juego
        this.partida=setInterval(()=>{
            if(this.contadorDisparo>0){
                this.contadorDisparo--;
            }
            this.dispararBalaMarciano();
            this.moverMarcianosYBalas();
            this.compruebaColision();
            this.dibujar();
        },50);
    }
    parar(){
        clearInterval(this.partida);
    }
    dispararBalaMarciano(){
        this.marcianitos.forEach((e)=>{ 
            if(e.dispararAleatorio()){
                this.crearBalaMarcianos(e.getposicionX()+(e.getAncho()/2),e.getposicionY()+(e.getAlto()*2),this.ancho*0.005,"white");
            }
        })
    }
    pulsacionTecla(codigo){
        if(codigo==37){
            this.jugador.moverx(false);
        } else if(codigo==39){
            this.jugador.moverx(true);
        } else if(codigo==38&&this.contadorDisparo==0){
            this.crearBala(this.jugador.getposicionX()+(this.jugador.getAncho()/2),this.jugador.getposicionY(),this.ancho*0.01,"#5AFFF3 ");
            this.contadorDisparo=5;
        }
    }
    compruebaColision(){
        this.balas.forEach(bala => {
            this.marcianitos.forEach(marciano => {
                if(this.comprobarPosicion(bala,marciano)){
                    this.destruir(bala.getBala());
                    this.destruir(marciano.getMarciano());
                    let indiceBala=this.balas.indexOf(bala);
                    let indiceMarciano=this.marcianitos.indexOf(marciano);
                    if(indiceBala!=-1&&indiceMarciano!=-1){
                        this.balas.splice(indiceBala,1);
                        this.marcianitos.splice(indiceMarciano,1);
                    }
                } else if(bala.getposicionY()<=0){
                    let indiceBala=this.balas.indexOf(bala);
                    this.destruir(bala.getBala());
                    this.balas.splice(indiceBala,1);
                }
            });
        });
        this.balasMarcianos.forEach(bala =>{
            if(this.comprobarPosicion(bala,this.jugador)){
                this.parar();
            }else if(bala.getposicionY()>=this.alto){
                let indiceBala=this.balasMarcianos.indexOf(bala);
                this.destruir(bala.getBala());
                this.balasMarcianos.splice(indiceBala,1);
            }
        })
    }
    comprobarPosicion(bala,marciano){
        if(bala.getposicionY()>=marciano.getposicionY()&&bala.getposicionY()<=marciano.getposicionY()+marciano.getAlto()){
            if(bala.getposicionX()>=marciano.getposicionX()&&bala.getposicionX()<=marciano.getposicionX()+marciano.getAncho()){
                return true;
            }
        }
        return false;
    }   
    moverMarcianosYBalas(){
        // dir-> true - izquierda, false - derecha
        let cambioDireccion=false;
        let acabaDeCambiar=false;
        this.marcianitos.forEach(element =>{
            if(element.comprobarMovimientoX(this.dirMarcianos)==false){
                cambioDireccion=true;
                acabaDeCambiar=true;
                this.marcianitos.forEach(element =>{
                    element.movery(true);
                });
            }
        });
        if(cambioDireccion){
            if(this.dirMarcianos==true){
                this.dirMarcianos=false;
            } else {
                this.dirMarcianos=true;
            }
        }
        if(acabaDeCambiar==false){
            this.marcianitos.forEach(element => {
                cambioDireccion=element.moverx(this.dirMarcianos);
            });
        }
        if(this.balas.length>0){
            this.balas.forEach(element => {
                element.movery(false);
            });
        }
        if(this.balasMarcianos.length>0){
            this.balasMarcianos.forEach(element => {
                element.movery(true);
            });
        }
    }
    dibujar(){
        this.marcianitos.forEach(element => {
            element.dibujar();
        });
        this.balas.forEach(element => {
            element.dibujar();
        });
        this.jugador.dibujar();
        this.balasMarcianos.forEach(element => {
            element.dibujar();
        });
    }
    parar(){
        //Para el bucle del juego
        clearInterval(this.partida);
    }
    colocarMarcianitos(tamaño,num){
        //le pasas el tamaño del marciano (lo hace cuadrado) y el numero de marcianos que vas a crear
        let posicionx=0;
        let posiciony=0
        this.margen=tamaño+(this.ancho*0.1);
        this.espacioEntreMarcianos=this.ancho*0.005;
        for (let i=0; i<num;i++){
            if(posicionx+tamaño<=this.ancho-this.margen){
                this.marcianitos.push(new Marciano(tamaño,tamaño,posicionx,posiciony,(this.ancho*0.001),(this.alto*0.005),this.ancho,this.alto,"red"));
                posicionx+=tamaño+this.espacioEntreMarcianos;
            } else {
                posicionx=0;
                posiciony+=tamaño+this.espacioEntreMarcianos/2;
            }
        }
        this.marcianitos.forEach(marciano=>{
            this.anadirElemento(marciano.getMarciano());
        })

    }
    anadirElemento(elemento){
        //Añade un elemento al svg
        this.tablero.appendChild(elemento);
    }
    destruir(elemento){
        this.tablero.removeChild(elemento);
    }
    crearBala(posx,posy,vel,color){
        var bala=new Bala(this.ancho*0.002,(this.alto*0.02),posx,posy-this.alto*0.05,vel,this.ancho,this.alto,color);
        this.balas.unshift(bala);
        this.anadirElemento(bala.getBala());
    }
    crearBalaMarcianos(posx,posy,vel,color){
        var bala=new Bala(this.ancho*0.002,(this.alto*0.02),posx,posy-this.alto*0.05,vel,this.ancho,this.alto,color);
        this.balasMarcianos.unshift(bala);
        this.anadirElemento(bala.getBala());
    }
}
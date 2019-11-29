import {Jugador} from './classJugador.js';
import {Marciano} from './classMarcianos.js';
import {Bala} from './classBalas.js';
export class Juego{
    constructor(alto, ancho, iddiv){
        this.tablero=document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.tablero.setAttribute("height",alto);
        this.tablero.setAttribute("width",ancho);
        this.contadorDisparo;
        this.alto=alto;
        this.ancho=ancho;
        this.partida;
        this.jugador;
        this.marcianitos;
        // dir-> false - izquierda, true - derecha
        this.dirMarcianos=true;
        this.espacioEntreMarcianos;
        this.balas;
        this.margen;
        document.getElementById(iddiv).addEventListener("keydown",(e)=>this.pulsacionTecla(e.keyCode));
        document.getElementById(iddiv).appendChild(this.tablero);
        document.getElementById(iddiv).setAttribute("tabIndex",0);
        this.reset();
        this.iniciar();
    }
    reset(){
        //reinicia los objetos y variables del juego.
        this.jugador=new Jugador(40,10,this.ancho/2,this.alto-12,40+1,0,this.ancho,this.alto,"blue");
        this.anadirElemento(this.jugador.getJugador());
        this.contadorDisparo=0;
        this.marcianitos=new Array();
        this.balas=new Array();
        this.dir=1;
        this.colocarMarcianitos(20,40);
    }
    iniciar(){
        //Comienza el bucle del juego
        this.partida=setInterval(()=>{
            if(this.contadorDisparo>0){
                this.contadorDisparo--;
            }
            this.moverMarcianosYBalas();
            this.dibujar();
        },100);
    }
    pulsacionTecla(codigo){
        if(codigo==37){
            this.jugador.moverx(false);
        } else if(codigo==39){
            this.jugador.moverx(true);
        } else if(codigo==38&&this.contadorDisparo==0){
            this.crearBala(this.jugador.getposicionX()+(this.jugador.getAncho()/2),this.jugador.getposicionY(),this.ancho*0.01,"purple");
            this.contadorDisparo=10;
        }
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
            if(this.balas.length>0){
                this.balas.forEach(element => {
                    element.movery(false);
                });
            }
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
    }
    parar(){
        //Para el bucle del juego
        clearInterval(this.partida);
    }
    colocarMarcianitos(tamaño,num){
        //le pasas el tamaño del marciano (lo hace cuadrado) y el numero de marcianos que vas a crear
        let contador=0;
        let posicionx=0;
        let posiciony=0
        this.margen=tamaño+(this.ancho*0.1);
        this.espacioEntreMarcianos=this.ancho*0.05;
        for (let i=0; i<num;i++){
            if(posicionx+tamaño<=this.ancho-this.margen){
                this.marcianitos.push(new Marciano(tamaño,tamaño,posicionx,posiciony,(this.ancho*0.005),(this.alto*0.005),this.ancho,this.alto,"red"));
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
        var bala=new Bala(this.ancho*0.002,(this.alto*0.05),posx,posy-this.alto*0.05,vel,this.ancho,this.alto,color);
        this.balas.unshift(bala);
        this.anadirElemento(bala.getBala());
    }
}
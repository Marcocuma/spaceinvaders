import {Jugador} from './classJugador.js';
import {Marciano} from './classMarcianos.js';
import {Bala} from './classBalas.js';
export class Juego{
    constructor(alto, ancho, iddiv){
        this.tablero=document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.tablero.setAttribute("height",alto);
        this.tablero.setAttribute("width",ancho);
        document.getElementById
        this.alto=alto;
        this.ancho=ancho;
        this.partida;
        this.jugador;
        this.marcianitos;
        this.espacioEntreMarcianos;
        this.balas;
        this.margen;
        document.getElementById(iddiv).appendChild(this.tablero);
        this.reset();
    }
    reset(){
        //reinicia los objetos y variables del juego.
        //this.jugador=new Jugador();
        this.marcianitos=new Array();
        this.balas=new Array();
        this.dir=1;
        this.colocarMarcianitos(50,40);
    }
    iniciar(){
        //Comienza el bucle del juego
        this.partida=setInterval(()=>{

        },1000);
    }
    moverMarcianos(){
        // dir-> 0 - izquierda, 1 - derecha
        this.marcianitos.forEach(element => {
            var dir;
            dir=element.moverx();
            if(dir==true)
                element.moverx();
        });
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
        this.margen=tamaño+2
        this.espacioEntreMarcianos=this.ancho*0.05;
        for (let i=0; i<num;i++){
            if(posicionx+tamaño<=this.ancho-this.margen){
                this.marcianitos.push(new Marciano(tamaño,tamaño,posicionx,posiciony,(tamaño+1),(tamaño+1),this.ancho,this.alto,"red"));
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
        this.balas.unshift(new Bala(posx,posy,vel,this.alto,color));
    }
}
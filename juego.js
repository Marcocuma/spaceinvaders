class Juego{
    constructor(alto, ancho){
        this.tablero=document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.tablero.setAttribute("height",alto);
        this.tablero.setAttribute("width",ancho);
        this.alto
        this.ancho
        this.jugador
        this.marcianitos=new Array();
        this.balas=new Array();
    }
    iniciar(){

    }
    parar(){

    }
    terminar(){

    }
    anadirElemento(elemento){
        this.tablero.appendChild(elemento);
    }
    destruir(elemento){
        this.tablero.removeChild(elemento);
    }
    crearBalas(){

    }
}
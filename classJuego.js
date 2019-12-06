import {Jugador} from './classJugador.js';
import {Marciano} from './classMarcianos.js';
import {Bala} from './classBalas.js';
export class Juego{
    constructor(alto, ancho, iddiv){
        //Se guardan las dimensiones y el div que se ha pasado por parametro y se llama al metodo que inicializa el juego
        this.alto=alto;
        this.ancho=ancho;
        this.div=document.getElementById(iddiv);
        this.reset();
        this.iniciar();
    }
    reiniciar(){
        //Borra el trablero, restablece todas las variables y vuelve a iniciar el intervalo del juego
        this.borrarTablero();
        this.reset();
        this.iniciar();
    }
    borrarTablero(){
        //Elimina el div donde se encuentra el svg del div principal
        this.div.removeChild(this.fondo);
    }
    reset(){
        //reinicia los objetos y variables del juego.
        this.fondo=document.createElement("div");
        this.fondo.style.height=this.alto+"px";
        this.fondo.style.width=this.ancho+"px";
        this.fondo.style.background="url('./img/fondo.gif')no-repeat fixed";
        this.fondo.style.backgroundSize="cover"
        this.tablero=document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.tablero.setAttribute("height",this.alto);
        this.tablero.setAttribute("width",this.ancho);
        this.tablero.id="tablero";
        this.boton=document.createElement("p");
        this.boton.id="boton";
        this.boton.innerText="Reiniciar";
        this.boton.style.border="2px black solid";
        this.boton.style.backgroundColor="purple";
        this.boton.style.color="white";
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
        this.cartelPerdedor=document.createElementNS("http://www.w3.org/2000/svg","text")
        this.cartelPerdedor.innerHTML="Has perdido"
        this.cartelPerdedor.setAttribute("fill","Red");
        this.cartelPerdedor.style.fontSize="2em"
        this.cartelPerdedor.setAttribute("x",(this.ancho*0.25));
        this.cartelPerdedor.setAttribute("y",(this.alto*0.60));
        this.cartelGanador=document.createElementNS("http://www.w3.org/2000/svg","text")
        this.cartelGanador.innerHTML="Has ganado!!"
        this.cartelGanador.setAttribute("fill","Green");
        this.cartelGanador.style.fontSize="2em"
        this.cartelGanador.setAttribute("x",(this.ancho*0.25));
        this.cartelGanador.setAttribute("y",(this.alto*0.60));
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
    ganar(){
        //Si no quedan marcianitos en la pantalla, para el intervalo y te muestra un mensaje de que has ganado
        if(this.marcianitos.length==0){
            clearInterval(this.partida);
            this.anadirElemento(this.cartelGanador);
        }
    }

    iniciar(){
        //Limpia el intervalo por si estuviese creado ya
        clearInterval(this.partida);
        //Comienza el bucle del juego
        this.partida=setInterval(()=>{
            if(this.contadorDisparo>0){
                this.contadorDisparo--;
            }
            this.ganar();
            this.comprobarAlturaMarciano();
            this.dispararBalaMarciano();
            this.moverMarcianosYBalas();
            this.compruebaColision();
            this.dibujar();
        },50);
    }
    perder(){
        //Para el intervalo y muestra un mensaje de que has perdido
        clearInterval(this.partida);
        this.anadirElemento(this.cartelPerdedor);
    }
    dispararBalaMarciano(){
        //Llama al metodo de disparar bala de los marcianitos y si devuelve verdadero crea una bala en la posicion actual
        //del marcianito y la añade al array de balas del marcianito
        this.marcianitos.forEach((e)=>{ 
            if(e.dispararAleatorio()){
                this.crearBalaMarcianos(e.getposicionX()+(e.getAncho()/2),e.getposicionY()+(e.getAlto()*2),this.ancho*0.005,"white");
            }
        })
    }
    pulsacionTecla(codigo){
        //si se pulsa la flechita izquierda mueve a la izquierda
        if(codigo==37){
            this.jugador.moverx(false);
        //si se pulsa la flecha derecha mueve a la derecha
        } else if(codigo==39){
            this.jugador.moverx(true);
        //si pulsa la flecha hacia arriba comprueba que el contador de disparo este a 0 y dispara
        //(El contador es para que no pueda disparar seguido)
        } else if(codigo==38&&this.contadorDisparo==0){
            this.crearBala(this.jugador.getposicionX()+(this.jugador.getAncho()/2),this.jugador.getposicionY(),this.ancho*0.01,"#5AFFF3 ");
            this.contadorDisparo=8;
        }
    }
    comprobarAlturaMarciano(){
        //Comprueba si los marcianos estan casi a la misma altura del jugador, si es asi llama al metodo Perder()
        this.marcianitos.forEach(marciano =>{
            if(this.jugador.getposicionY()>=marciano.getposicionY()&&this.jugador.getposicionY()<=marciano.getposicionY()+marciano.getAlto()){
                this.perder();
            }
        })
    }
    compruebaColision(){
        //Comprueba la colision de las balas del jugador con los marcianos y viceversa.
        this.balas.forEach(bala => {
            this.marcianitos.forEach(marciano => {
                if(this.comprobarPosicion(bala,marciano)){
                    //Si colisionan borra al marcianito y a la bala de la vista y de sus respectivos arrays
                    this.destruir(bala.getBala());
                    this.destruir(marciano.getMarciano());
                    let indiceBala=this.balas.indexOf(bala);
                    let indiceMarciano=this.marcianitos.indexOf(marciano);
                    if(indiceBala!=-1&&indiceMarciano!=-1){
                        this.balas.splice(indiceBala,1);
                        this.marcianitos.splice(indiceMarciano,1);
                    }
                } else if(bala.getposicionY()<=0){
                    //si la bala se va fuera de la pantalla la borra de la vista y del array
                    let indiceBala=this.balas.indexOf(bala);
                    this.destruir(bala.getBala());
                    this.balas.splice(indiceBala,1);
                }
            });
        });
        this.balasMarcianos.forEach(bala =>{
            //Si la bala del marciano golpea al jugador, llama al metodo perder
            if(this.comprobarPosicion(bala,this.jugador)){
                this.perder();
            }else if(bala.getposicionY()>=this.alto){
                //si se sale de la pantalla la borra de la vista y del array
                let indiceBala=this.balasMarcianos.indexOf(bala);
                this.destruir(bala.getBala());
                this.balasMarcianos.splice(indiceBala,1);
            }
        })
    }
    comprobarPosicion(bala,marciano){
        //Comprueba si la posicion de los dos elementos pasados como parametro contienen alguna coordenada igual, si es asi retorna verdadero
        // si no retorna falso
        if(bala.getposicionY()>=marciano.getposicionY()&&bala.getposicionY()<=marciano.getposicionY()+marciano.getAlto()){
            if(bala.getposicionX()>=marciano.getposicionX()&&bala.getposicionX()<=marciano.getposicionX()+marciano.getAncho()){
                return true;
            }
        }
        return false;
    }   
    moverMarcianosYBalas(){
        // dir-> true - izquierda, false - derecha
        //Mueve a los marcianos en la direccion que marque la variable global dirMarcianos
        let cambioDireccion=false;
        let acabaDeCambiar=false;
        this.marcianitos.forEach(element =>{
            //Comprueba que el marciano se puede mover en esa direccion, y si retorna falso, cambia la variable de direccion y marca
            //las variables cambioDeDireccion y acabaDeCambiar en verdadero
            if(element.comprobarMovimientoX(this.dirMarcianos)==false){
                cambioDireccion=true;
                acabaDeCambiar=true;
                this.marcianitos.forEach(element =>{
                    //mueve a los marcianos hacia abajo una vez
                    element.movery(true);
                });
            }
        });
        if(cambioDireccion){
            //Si la variable esta a verdadero cambia la direccion de los marcianos
            if(this.dirMarcianos==true){
                this.dirMarcianos=false;
            } else {
                this.dirMarcianos=true;
            }
        }
        if(acabaDeCambiar==false){
            //Si no acaba de cambiar mueve a los marcianos en horizontal(Esto es para que le cueste un frame moverse de altura)
            this.marcianitos.forEach(element => {
                element.moverx(this.dirMarcianos);
            });
        }
        if(this.balas.length>0){
            //Si hay balas en ela array las mueve hacia arriba
            this.balas.forEach(element => {
                element.movery(false);
            });
        }
        if(this.balasMarcianos.length>0){
            //Si hay balas en ela array de balas del marciano las mueve hacia abajo
            this.balasMarcianos.forEach(element => {
                element.movery(true);
            });
        }
    }
    dibujar(){
        //Llama a los metodos de dibujar de cada elemento, que añade los atributos al elemento svg
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
        //Crea los marcianos con parametros relativos al tamaño de la vista
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
            //Añade los marcianitos a la vista del juego
            this.anadirElemento(marciano.getMarciano());
        })

    }
    anadirElemento(elemento){
        //Añade un elemento al svg
        this.tablero.appendChild(elemento);
    }
    destruir(elemento){
        //Destruye un elemento de la vista
        this.tablero.removeChild(elemento);
    }
    crearBala(posx,posy,vel,color){
        //Crea una bala pasandole como parametro la posicion donde va a ser creada, la velocidad y su color.
        //El tamaño de la bala es relativo a la vista.
        //Añade la bala al array de las balas del jugador
        var bala=new Bala(this.ancho*0.002,(this.alto*0.02),posx,posy-this.alto*0.05,vel,this.ancho,this.alto,color);
        this.balas.unshift(bala);
        this.anadirElemento(bala.getBala());
    }
    crearBalaMarcianos(posx,posy,vel,color){
        //Crea una bala pasandole como parametro la posicion donde va a ser creada, la velocidad y su color.
        //El tamaño de la bala es relativo a la vista.
        //Añade la bala al array de las balas del marciano
        var bala=new Bala(this.ancho*0.002,(this.alto*0.02),posx,posy-this.alto*0.05,vel,this.ancho,this.alto,color);
        this.balasMarcianos.unshift(bala);
        this.anadirElemento(bala.getBala());
    }
}
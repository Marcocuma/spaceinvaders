export class Objeto {
    //Nota del mono: he añadido ancho y alto del objeto que no lo tenia antes.
    constructor(x, y, posx, posy, velox, veloy, ancho, alto) {
        this.x = x;
        this.y = y;
        this.velox = velox;
        this.veloy = veloy;
        this.ancho = ancho;
        this.posx = posx;
        this.posy = posy;
        this.alto = alto;
    }
    comprobarMovimientoX(direccion) {
        //direccion= true - derecha  false izquierda
        //comprueba el valor de la direccion y dependiendo del valor y las posiciones retorna verdadero o falso
        if (direccion) {
            if (this.posx + this.x + this.velox < this.ancho - this.x / 2) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.posx - this.velox > 0 + this.x / 2) {
                return true;
            } else {
                return false;
            }
        }
    }
    moverx(direccion) {
        //direccion= true - derecha  false izquierda
        // comprueba el valor de direccion y retorna verdadero o falso
        if (direccion) {
            if (this.comprobarMovimientoX(direccion)) {
                this.posx += this.velox;
            }
        } else {
            if (this.comprobarMovimientoX(direccion)) {
                this.posx -= this.velox;
            }
        }
        return this.izqder;
    }
    movery(direccion) {
        //direccion= true - abajo  false arriba
        // comprueba el valor de direccion y retorna verdadero o falso
        if (direccion) {
            if (this.posy < this.alto) {
                this.posy += this.veloy;
                return false;
            }
        } else {
            if (this.posy > 0) {
                this.posy -= this.veloy;
            }
        }
        return this.arrbaj;
    }
    cambiarDireccionDerecha(derecha) {
        //cambia la direccion de x del objeto 
        this.izqder = derecha;
    }
    cambiarDireccionAbajo(abajo) {
        //cambia la direccion del y del objeto
        this.arrbaj = abajo;
    }
    getposicionX() {
        //retorna la posicion en x del objeto
        return this.posx;
    }
    getposicionY() {
        //retorna la posicion en y del objeto
        return this.posy;
    }
    getAncho() {
        //retorna el ancho del objeto
        return this.x;
    }
    getAlto() {
        //retorna el alto del objeto
        return this.y;
    }
}
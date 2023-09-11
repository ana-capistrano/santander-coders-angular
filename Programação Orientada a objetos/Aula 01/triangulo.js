class Triangulo {
    constructor(base, altura) {
        this.base = base
        this.altura = altura
    }

    imprimir() {
        return `<div style='width:0;height:0;border-left: ${(this.base)/2}px solid transparent;border-right: ${(this.base)/2}px solid transparent;border-bottom: ${this.altura}px solid ${this.cor || "blue"};'></div>`
    }
    
}

const t1 = new Triangulo(50, 100)
const t2 = new Triangulo(200,100)
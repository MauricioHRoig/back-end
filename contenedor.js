const fs = require("fs");

module.exports = class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;
    }

    getAll() {
        const response = fs.readFileSync(this.nameFile, "utf-8");
        if (response === "") {
            return this.assign(true);
        } else {
            return JSON.parse(response);
        }
    }

    get(id) {
        const data = this.getAll();
        if (id <= 0 || id > data.length) {
            return {
                error: "El producto con el id especificado no ha sido encontrado.",
            };
        }
        return data.find(element => element.id === id);
    }

    save(product) {
        const data = this.getAll();
        product.id = data.length + 1;
        data.push(product);
        fs.writeFileSync(this.nameFile, JSON.stringify(data));
        return {
            product: product,
        };
    }

    update(id, product) {
        const data = this.getAll();
        if (id <= 0 || id > data.length) {
            return {
                error: "El producto con el id especificado no ha sido encontrado.",
            };
        }
        product.id = id;
        const previousProduct = data.splice(id - 1, 1, product);
        fs.writeFileSync(this.nameFile, JSON.stringify(data));
        return {
            previous: previousProduct,
            new: product,
        };
    }

    delete(id) {
        const data = this.getAll();
        if (id <= 0 || id > data.length) {
            return {
                error: "El producto con el id especificado no ha sido encontrado.",
            };
        } else {
            const previousProduct = data.splice(id - 1, 1);
            fs.writeFileSync(this.nameFile, JSON.stringify(data));
            this.assign();
            return {
                deleted: previousProduct,
            }
        }
    }

    assign(empty = false) {
        if (empty) {
            let id = 1;
            productos.forEach(element => {
                element.id = id++;
            });
            fs.writeFileSync(this.nameFile, JSON.stringify(productos));
            return productos;
        } else {
            const data = this.getAll();
            let id = 1;
            data.forEach(element => {
                element.id = id++;
            });
            fs.writeFileSync(this.nameFile, JSON.stringify(data));
        }
    }
}


const productos = [{
    nombre: "lapiz",
    precio: "$30",
    imagen: "https://www.faber-castell.com.ar/-/media/Products/Product-Repository/CASTELL-9000/24-24-01-Pencil/119003-Graphite-pencil=A5D81B6D6D4"
}, {
    nombre: "borratinta",
    precio: "$80",
    imagen: "https://www.borratinta.com"
}, {
    nombre: "plasticola",
    precio: "$110",
    imagen: "https://www.plasticola.net"
}]



let process = require('process') 
let moduleProduct = require('./logica/logicProduct');
let comando = process.argv[2];

switch (comando) {

    case 'listar':
        let products = moduleProduct.readJSON();

        if (products.length === 0) {
            console.log("no hay productos")
        } else {
            
            console.log("----------------------------")
            console.log("listado de productos")
            console.log("----------------------------")

            for(p in products ){

                console.log("id: " + products[p].id + 
                            " name: " +  products[p].name + 
                            " price " + products[p].price )           
            }
        }
        break;
    case 'agregar':

        let id =    parseInt (process.argv[3]);
        let name =  process.argv[4];
        let price = parseInt(process.argv[5]);
  
        moduleProduct.addToJson(id,name,price)
        break

    case 'filtrar':
        let min =  (process.argv[3]);
        let max =  (process.argv[4]);
    
        let productFil = moduleProduct.filterProduct(min,max);

        if (productFil.length === 0) {
            console.log("no hay productos")
        } else {
            
            console.log("----------------------------")
            console.log("listado de productos")
            console.log("----------------------------")

            for(p in productFil ){

                console.log("id: " + productFil[p].id + 
                            "name: " +  productFil[p].name + 
                            "price " + productFil[p].price )           
            }
        }
        
        break
    case 'modificar':

        let idP =  parseInt(process.argv[3]);
        let priceP = parseInt (process.argv[4]);
        moduleProduct.modifyProduct(idP, priceP); 

        break
    case 'eliminar': 

        let idProductElim =  parseInt(process.argv[3]);
        let { statusP } = moduleProduct.deleteProduct(idProductElim);
        
        
        if(!statusP){
            console.log("----------------------------")
            console.log(`No se encontro el producto con id ${idProductElim}`);
            console.log("----------------------------")
        }
       

        break
    case 'buscar':
        
        let idPSearch =  parseInt(process.argv[3]);
        let {statusS, producto } = moduleProduct.searchProduct(idPSearch);

        if(statusS){
            console.log("----------------------------")
            console.log(`id = ${producto.id} `);
            console.log(`name = ${producto.name} `);
            console.log(`price = ${producto.price} `);
            console.log("----------------------------")
        }else{
            console.log("----------------------------")
            console.log(`No se encontro el producto con id ${idPSearch}`);
            console.log("----------------------------")
        }

        break
    default:
        break;
}
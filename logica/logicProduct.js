let fs = require('fs');

module.exports = modulProduct = {

archivo : './product.json',
    readJSON : function () {
        let listProducts = fs.readFileSync(this.archivo,'utf-8');
        return JSON.parse(listProducts)
    },
    addToJson : function (id,name,price) {

        let product = {
            id : id,
            name : name,
            price : price 
        }

        let previousProducts = this.readJSON();
        previousProducts.push(product);  
        this.saveJson(previousProducts)
    },

    saveJson :function ( json) {
        let newJSON = JSON.stringify(json);
        fs.writeFileSync(this.archivo,newJSON,'utf-8')
    },

    filterProduct :function(min, max) {

        let arrayProduct = this.readJSON();    
        let result = arrayProduct.filter( product  => product.price >= min && product.price <= max )
               
            return result
    },
    modifyProduct :function  (id, price) {

        let arrayProduct = this.readJSON();  

        let idProduct = arrayProduct.findIndex( product  => product.id == id )
        let product = arrayProduct[idProduct]
        product.price = price
     
        arrayProduct.splice(idProduct, 1, product);    
        this.saveJson(arrayProduct)
        
    },
    deleteProduct : function (id)  {
          
            let arrayProduct = this.readJSON();       
            let newArrayProduc = arrayProduct.filter(product => product.id !== id);
         
            if (arrayProduct.length === newArrayProduc.length) {
                return {
                    statusP: false
                };
            } 
            else {

                this.saveJson(newArrayProduc);
                return {
                    statusP : true
                };
            }
        
    },
    searchProduct : function (id){
        let arrayProduct = this.readJSON();       
        let idProduct = arrayProduct.findIndex( product  => product.id == id )

        let productSearch = arrayProduct[idProduct];
    
        if (idProduct >= 0){
            return {
                statusS : true,
                producto : productSearch
            };
        }
        else{
            return {
                statusS : false,
                producto : null
            };
        }
        
    }
  
}
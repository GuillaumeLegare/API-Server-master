const path = require('path');
const fs = require('fs');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.operators = [' ', '-', '*', '/','%','!', 'p', 'np'];
        }
        
        factorial(n){
            if(n===0||n===1){
              return 1;
            }
            return n*this.factorial(n-1);
        }  
    
        isPrime(value) {
            for(var i = 2; i < value; i++) {
                if(value % i === 0) {
                    return false;
                }
            }
            return value > 1;
        }
    
        findPrime(n){
            let primeNumer = 0;
            for ( let i=0; i < n; i++){
                primeNumer++;
                while (!this.isPrime(primeNumer)){
                    primeNumer++;
                }
            }
            return primeNumer;
        }
        get(){
            if(this.HttpContext.path.queryString == '?'){
                let helpPagePath = path.join(process.cwd(),"wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }else{
                let params = this.HttpContext.path.params;
                if(this.operators.includes(params.op)){
                    switch(params.op){
                        case " ":
                            params.op = "+";
                            if(Object.keys(params).length == 3)
                                params.value = parseInt(params.x) + parseInt(params.y);
                            else if(Object.keys(params).length > 3)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters";
                        break;
                        case "-":
                            params.op ="-";
                            if(Object.keys(params).length == 3)
                                params.value = parseInt(params.x) - parseInt(params.y);
                            else if(Object.keys(params).length > 3)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters";
                        break;
                        case "*": 
                            params.op="*";
                            if(Object.keys(params).length == 3)
                                params.value = parseInt(params.x) * parseInt(params.y);
                            else if(Object.keys(params.x) == 0 || Object.keys(params.y) == 0)
                                params.error = "0 cant be a parameters";
                            else if(Object.keys(params).length > 3)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters";
                        break;
                        case "/":
                            params.op="/";
                            if(Object.keys(params).length ==3)
                                params.value = parseInt(params.x) / parseInt(params.y);
                            else if(params.x == 0) 
                                params.value = "NaN";
                            else if(params.y == 0) 
                                params.value = "NaN";
                            else if(Object.keys(params).length > 3)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters";
                        break;
                        case "%":
                            params.op="%";
                            if(Object.keys(params).length ==3)
                                params.value = parseInt(params.x) % parseInt(params.y);
                            else if(params.x == 0) 
                                params.value = "NaN";
                            else if(params.y == 0) 
                                params.value = "NaN";
                            else if(Object.keys(params).length > 3)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters";
                        break;
                        case "!":
                            params.op="!";
                            if(Object.keys(params).length == 2)
                                this.factorial(params.n);
                            else if(Object.keys(params).length > 2)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters"; 
                        break;
                        case "p":
                            params.op="p";
                            if(Object.keys(params).length == 2)
                                this.isPrime(params.n);
                            else if(Object.keys(params).length > 2)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters"; 
                        break;
                        case "np":
                            params.op="np";
                            if(Object.keys(params).length == 2)
                                this.findPrime(params.n);
                            else if(Object.keys(params).length > 2)
                                params.error = "Too many parameters";
                            else
                                params.error = "Not enough parameters"; 
                        break;
                    }
                    return this.HttpContext.response.JSON(params);
                } else{
                    params.error = "Invalid operator";
                    return this.HttpContext.response.JSON(params);
                }
            }
        }
    }
    
    
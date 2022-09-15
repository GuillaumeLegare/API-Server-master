//Guillaume Légaré
const Model = require('./model');
module.exports =
    class Mathematics extends Model {
        constructor(n, x, y, op) {
            super();
            this.N = n !== undefined ? n : "";
            this.X = x !== undefined ? x : "";
            this.Y = y !== undefined ? y : "";
            this.Op = op !== undefined ? op : "";

            this.setKey("Op");
            this.addValidator('N', 'integer');
            this.addValidator('X', 'integer');
            this.addValidator('Y', 'integer');
            this.addValidator('Op', 'string');
        }
    }
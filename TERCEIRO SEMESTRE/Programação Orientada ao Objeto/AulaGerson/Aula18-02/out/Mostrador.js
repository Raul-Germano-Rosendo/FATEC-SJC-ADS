"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mostrador = /** @class */ (function () {
    function Mostrador() {
    }
    Mostrador.prototype.mostrar = function (pessoa) {
        console.log(pessoa.dados());
    };
    return Mostrador;
}());
exports.default = Mostrador;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aluno_1 = __importDefault(require("./aluno"));
var Mostrador_1 = __importDefault(require("./Mostrador"));
var Professor_1 = __importDefault(require("./Professor"));
//let ps = new Pessoa(`João`)
var al = new aluno_1.default('Cleitinho', true);
var pr = new Professor_1.default('Arakaki', true);
var msd = new Mostrador_1.default();
msd.mostrar(al);
msd.mostrar(pr);

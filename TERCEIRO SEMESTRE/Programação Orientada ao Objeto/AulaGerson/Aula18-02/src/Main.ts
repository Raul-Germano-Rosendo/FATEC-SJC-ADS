import Aluno from "./aluno"
import Pessoa from "./Pessoa";
import Mostrador from "./Mostrador"
import Professor from "./Professor";

//let ps = new Pessoa(`João`)

let al = new Aluno('Cleitinho', true)
let pr = new Professor('Arakaki', true)

let msd = new Mostrador()

msd.mostrar(al)
msd.mostrar(pr)
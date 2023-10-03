import express from 'express'

const server = express();

const porta = 3000;

server.use(express.json())

server.get('/', (req,res)=>{
    res.send('Cadastro de cliente: ')
});

server.listen(porta,() =>{
    console.log(`servidor rodando no endereço http://localhost:${porta}`);
})
const CadastroCliente = [{idCliente: 1, nome: 'teste', CPF: 111100001111, Telefone: 77775555, produto: 'jarros médios'}]
server.get('/cliente', (req,res)=>{
    res.send(CadastroCliente);
})

server.post('/cliente', (req,res)=>{
    try {
        CadastroCliente.push(req.body)
        res.status(201).send('Cadastro realizado com sucesso!');
    } catch(error){
        console.log(error);
    }
})

function buscarClientePorId(id:number){
    return CadastroCliente.filter( livro => livro.idCliente == id);
}

function buscarIndiceCliente(id:number){
    return CadastroCliente.findIndex( cliente => cliente.idCliente == id);
}

server.delete('/cliente/:id', (req,res)=>{
    let indice = buscarIndiceCliente( Number(req.params.id))
    console.log(indice);
    CadastroCliente.splice(indice,1)
    res.send(CadastroCliente)
})

server.put('/cliente/:id', (req,res)=>{
    console.log(req.params.id);
    let indice = buscarIndiceCliente( Number(req.params.id))
    console.log(indice);
    CadastroCliente[indice].nome = req.body.nome;
    CadastroCliente[indice].CPF = req.body.CPF;
    CadastroCliente[indice].Telefone = req.body.Telefone;
    CadastroCliente[indice].produto = req.body.produto;
    res.json(CadastroCliente)

})
const inputCep = document.querySelector('#cep')
inputCep.addEventListener('change', (evt)=>{

    const numCep = evt.target.replace(/\D/g, "")

    if (numCep.length !== 8){
        alert("cep invalido")

        return
    }
    consultaCEP(numCep)
})
const consultaCEP = async (cep) => {
   try{
   
    const reposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if(!reposta.ok){
        throw new Error("erro na requeição")
    }

    const dadosEndereco =await reposta.json()
    if(dadosEndereco.erro){
        alert('cep nao localizado')

        return
    }
    carregaInput(dadosEndereco)

}catch(erro){
    console.log('erro', erro.message)
}

const campos = {
    logradouro: document.querySelector('#logradouro')
    bairro: document.querySelector("#bairro")
}
const carregaInput = (objEndereco)=>{

}

}
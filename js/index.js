async function buscaCep(cep){
    const mensagemErro = document.querySelector(".erro");

    try{
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const cepConvertido = await consultaCep.json();
        
        const rua = document.querySelector("#endereco");
        const bairro = document.querySelector("#bairro");
        const cidade = document.querySelector("#cidade");
        const estado = document.querySelector("#uf");

        rua.value = cepConvertido.logradouro;
        bairro.value = cepConvertido.bairro;
        cidade.value = cepConvertido.localidade;
        estado.value = cepConvertido.uf;

        mensagemErro.innerHTML = '';

        if(cepConvertido.erro){
            mensagemErro.innerHTML = "<p>Ops parece que esse CEP não existe.</p>";
            rua.value = '';
            bairro.value = '';
            cidade.value = '';
            estado.value = '';
        }
        return cepConvertido;
    }catch(erro){
        mensagemErro.innerHTML = "<p>CEP inválido.</p>";
    }
}

const cep = document.querySelector("#cep");
cep.addEventListener("focusout", () => buscaCep(cep.value));


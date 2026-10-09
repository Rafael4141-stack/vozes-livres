// Máscaras simples para CPF, telefone e CEP e validação básica do formulário.
function aplicarMascara(campo, tipo) {
  campo.addEventListener('input', function () {
    let valor = campo.value.replace(/\D/g, '');
    if (tipo === 'cpf') {
      valor = valor.slice(0, 11);
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (tipo === 'telefone') {
      valor = valor.slice(0, 11);
      if (valor.length > 10) valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      else if (valor.length > 6) valor = valor.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
      else if (valor.length > 2) valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
    } else if (tipo === 'cep') {
      valor = valor.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
    }
    campo.value = valor;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-mascara="cpf"]').forEach(campo => aplicarMascara(campo, 'cpf'));
  document.querySelectorAll('[data-mascara="telefone"]').forEach(campo => aplicarMascara(campo, 'telefone'));
  document.querySelectorAll('[data-mascara="cep"]').forEach(campo => aplicarMascara(campo, 'cep'));

  const formulario = document.querySelector('#formCadastro');
  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      const cpf = formulario.querySelector('#cpf').value.replace(/\D/g, '');
      const mensagem = document.querySelector('#mensagemCadastro');
      if (cpf.length !== 11) {
        mensagem.textContent = 'Confira o CPF: ele deve ter 11 números.';
        mensagem.style.color = '#a12626';
        formulario.querySelector('#cpf').focus();
        return;
      }
      if (!formulario.querySelector('#termos').checked) {
        mensagem.textContent = 'Marque a autorização de uso dos dados para continuar.';
        mensagem.style.color = '#a12626';
        formulario.querySelector('#termos').focus();
        return;
      }
      mensagem.textContent = 'Cadastro demonstrativo validado! Este projeto não envia nem armazena seus dados.';
      mensagem.style.color = '#276749';
      formulario.reset();
    });
  }
});

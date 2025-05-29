 const senhaCorreta = "1234";
    let tentativas = 0;
    let bloqueado = false;
    let tempoRestante = 0;
    let temporizador;

    function inserirCartao() {
      if (bloqueado) return;
      document.getElementById("insercao-cartao").style.display = "none";
      document.getElementById("form-senha").style.display = "block";
      document.getElementById("mensagem").innerText = "";
    }

    function cancelar() {
      resetar();
      document.getElementById("mensagem").innerText = "Operação cancelada.";
    }

    function validarSenha() {
      if (bloqueado) return;

      const senha = document.getElementById("senha").value;
      if (senha === senhaCorreta) {
        document.getElementById("mensagem").innerText = "Senha válida. Acesso concedido.";
        document.getElementById("mensagem").className = "message success";
        resetar();
      } else {
        tentativas++;
        document.getElementById("mensagem").innerText = "Senha inválida.";
        document.getElementById("mensagem").className = "message error";
        if (tentativas >= 3) {
          Bloqueio();
        }
      }

      document.getElementById("senha").value = "";
    }

    function Bloqueio() {
      bloqueado = true;
      tempoRestante = 120;
      document.getElementById("form-senha").style.display = "none";
      atualizarMensagemBloqueio();
      temporizador = setInterval(() => {
        tempoRestante--;
        atualizarMensagemBloqueio();

        if (tempoRestante <= 0) {
          clearInterval(temporizador);
          bloqueado = false;
          tentativas = 0;
          document.getElementById("insercao-cartao").style.display = "block";
          document.getElementById("mensagem").innerText = "";
        }
      }, 1000);
    }

    function atualizarMensagemBloqueio() {
      document.getElementById("mensagem").innerText = `Cartão bloqueado. Aguarde ${tempoRestante} segundos.`;
      document.getElementById("mensagem").className = "message error";
    }

    function resetar() {
      document.getElementById("form-senha").style.display = "none";
      document.getElementById("insercao-cartao").style.display = "block";
      document.getElementById("senha").value = "";
      tentativas = 0;
    }
// Selecionando todos os elementos necessários
const wrapper = document.querySelector(".wrapper"),
  toast = wrapper.querySelector(".toast"),
  title = toast.querySelector("span"),
  subTitle = toast.querySelector("p"),
  wifiIcon = toast.querySelector(".icon"),
  closeIcon = toast.querySelector(".close-icon");

window.onload = () => {
  function ajax() {
    let xhr = new XMLHttpRequest(); //criando novo objeto XML
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //enviando solicitação de obtenção nesta URL
    xhr.onload = () => {
      // uma vez carregado o ajax
      //se o status do ajax for igual a 200 ou menor que 300, significa que o usuário está obtendo dados do URL fornecido
      //ou seu status de resposta é 200, o que significa que ele está online
      if (xhr.status == 200 && xhr.status < 300) {
        toast.classList.remove("offline");
        title.innerText = "Conexão restaurada";
        subTitle.innerText = "Seus dados estão salvos offline.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';

        const myTimeout = setTimeout(() => {
          //oculta a notificação do sistema automaticamente após 7 segundos
          //   wrapper.classList.add("hide");
        }, 7000);

        // limpar o timeout pra evitar "memory leak"
        return () => clearTimeout(myTimeout);
      } else {
        offline(); //chamando a função offline se o status do ajax não for igual a 200 ou não menor que 300
      }
    };
    xhr.onerror = () => {
      offline(); ////chamando a função offline se a url passada não estiver correta ou retornando 404 ou outro erro
    };
    xhr.send(); //enviando solicitação solicita para a url passada
  }

  function offline() {
    //function for offline
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "Conexão perdida";
    subTitle.innerText = "Seus dados estão salvos offline";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
  }

  const callInterval = setInterval(() => {
    //esta função setInterval chama ajax frequentemente após 500ms
    ajax();
  }, 500);

  // limpeza para evitar memory leak
  return () => clearInterval(callInterval);
};

function closeToast() {
  //ocultar a notificação do sistema ao clicar no ícone de fechar
//   alert("click");
  wrapper.classList.add("hide");
};

const botaoMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

function fecharMenu() {
    menu.classList.remove("ativo");
    botaoMenu.textContent = "☰";
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("ativo");

    botaoMenu.textContent = aberto ? "✕" : "☰";
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
});

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

/* Galeria interativa */

const fotos = document.querySelectorAll(".galeria-fotos img");
const visualizador = document.getElementById("visualizador");
const fotoAmpliada = document.getElementById("foto-ampliada");
const fecharFoto = document.getElementById("fechar-foto");

fotos.forEach(function (foto) {

    foto.tabIndex = 0;
    foto.setAttribute("role", "button");

    function abrirFoto() {
        fotoAmpliada.src = foto.src;
        fotoAmpliada.alt = foto.alt;
        visualizador.showModal();
    }

    foto.addEventListener("click", abrirFoto);

    foto.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirFoto();
        }
    });

});

fecharFoto.addEventListener("click", function () {
    visualizador.close();
});

visualizador.addEventListener("click", function (evento) {
    if (evento.target === visualizador) {
        visualizador.close();
    }
});

/* Animações durante a navegação */

const elementosAnimados = document.querySelectorAll(
    "#sobre, section:not(#inicio) h2, .card, .galeria-fotos img, .galeria img"
);

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    elementosAnimados.forEach(function (elemento) {

        elemento.classList.add("animar");

        observador.observe(elemento);

    });

}
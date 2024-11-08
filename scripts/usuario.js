
document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem('username');

    if (username === 'usuario') {
        var linksRestritos = document.querySelectorAll('.link-restrito');
        for (var i = 0; i < linksRestritos.length; i++) {
            linksRestritos[i].classList.add('ocultar');
        }
    }
});


const bodyContent = document.querySelector('body');

let mybuttonScroll;

if (!bodyContent.classList.contains('movieSelected')) {
  mybuttonScroll = document.getElementById('scrollbtn');

  //scroll to top button
  window.onscroll = function () {
    scrollFunction();
  };

  // cuando el usuario da click, lo lleva hacia el top del documento
  document.getElementById('scrollbtn').onclick = function () {
    topFunction();
  };
}

// cuando el usuario baja 50px del top del documento, se muestra el boton
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybuttonScroll.style.display = 'block';
  } else {
    mybuttonScroll.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

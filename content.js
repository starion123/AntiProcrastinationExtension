// content.js
window.addEventListener('load', function() {
    fetch(chrome.runtime.getURL('block.html'))
      .then(response => response.text())
      .then(data => {
        // Crear un nuevo div y agregar el HTML de block.html
        let div = document.createElement('div');
        div.innerHTML = data;
  
        // Agregar el div al principio del body
        document.body.insertAdjacentElement('afterbegin', div);
      })
      .catch(err => {
        console.error(err);
      });
  });
  
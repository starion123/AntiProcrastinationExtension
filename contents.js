window.addEventListener('load', function() {
    setTimeout(function() {
      fetch(chrome.extension.getURL("block.html"))
        .then(response => response.text())
        .then(html => {
          const blockDiv = document.createElement('div');
          blockDiv.innerHTML = html.trim();
  
          // Eliminar todo el contenido del <body>
          document.body.innerHTML = '';
  
          // Agregar el div de block.html al <body>
          document.body.appendChild(blockDiv);
  
          // Cambiar el color de la letra a blanco
          document.body.style.color = 'white';
        });
    }, 1000); // Retraso de 1 segundo (1000 milisegundos)
  });
  
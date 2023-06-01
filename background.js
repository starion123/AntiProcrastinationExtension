document.addEventListener('DOMContentLoaded', function () {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      let url = new URL(details.url);
      if (url.hostname.includes('instagram.com') || url.hostname.includes('reddit.com') || url.hostname.includes('facebook.com') || url.hostname.includes('tiktok.com')) {
        return {redirectUrl: chrome.extension.getURL("block.html")};
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
});

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



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.url) {
    let url = new URL(tab.url);
    if (url.hostname.includes('youtube.com')) {
      chrome.tabs.executeScript(tabId, {
        code: `
          let observer = new MutationObserver(function(mutations) {
            let shortsIcon = document.querySelector('a[title="Shorts"]');
            let shortsSection = Array.from(document.querySelectorAll('ytd-rich-section-renderer')).find(el => el.innerText.includes('Shorts'));

            if (shortsIcon) {
              shortsIcon.style.display = 'none';
            }
            if (shortsSection) {
              shortsSection.style.display = 'none';
            }
          });

          observer.observe(document, { childList: true, subtree: true });
        `
      });
    }
  }
});

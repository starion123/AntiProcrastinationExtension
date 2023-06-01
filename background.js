chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.url) {
    if (tab.url.includes('youtube.com')) {
      chrome.tabs.executeScript(tabId, {
        code: `
          let shortsIcon = document.querySelector('a[title="Shorts"]');
          let shortsSection = Array.from(document.querySelectorAll('ytd-rich-section-renderer')).find(el => el.innerText.includes('Shorts'));

          if (shortsIcon) {
            shortsIcon.style.display = 'none';
          }
          if (shortsSection) {
            shortsSection.style.display = 'none';
          }
        `
      });
    } else if (tab.url.includes('twitter.com') || tab.url.includes('instagram.com') || tab.url.includes('reddit.com') || tab.url.includes('facebook.com') || tab.url.includes('tiktok.com')) {
      chrome.tabs.executeScript(tabId, {
        code: `
          document.body.innerHTML = '<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-size: 2em; text-align: center;
          ">Hey, shouldn\'t you be doing something productive right now?<br>
          <button style="background-color: green; color: white; font-size: 1.5em; margin: 10px;" onclick="window.location.reload();">Yes</button>
          <button style="background-color: red; color: white; font-size: 1.5em; margin: 10px;" onclick="window.location.reload();">No</button></div>';
        `
      });
    }
  }
});

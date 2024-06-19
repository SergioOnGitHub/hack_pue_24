// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const switchElement = document.getElementById('flexSwitchCheckDefault');

  // Retrieve the switch state when the popup is loaded
  chrome.storage.local.get(['switchState'], function(result) {
      const switchState = result.switchState !== undefined ? result.switchState : false;
      switchElement.checked = switchState;

      // Execute script in the current tab to set the sidebar state
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: injectSidebar,
              args: [switchState] // Pass the saved switch state as an argument
          });
      });
  });

  // Add an event listener to save the switch state when it changes
  switchElement.addEventListener('change', function(e) {
      const switchState = e.target.checked;
      console.log(switchState);

      // Save the switch state
      chrome.storage.local.set({ switchState: switchState });

      // Execute script in the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: injectSidebar,
              args: [switchState] // Pass the checked value as an argument
          });
      });
  });
});

function injectSidebar(checked) {
  console.log(checked);
  const sidebar = document.createElement('div');
  if (checked) {
    sidebar.innerHTML = `
  <div id="root" style="display: flex" data-controller="notifications" data-notifications-service-worker-url-value="/OneSignalSDKWorker.js">

  <div style="margin-left: 45px;" id="newRoot"></div>

  <div style="position: fixed; top: 0; right: 0; height: 100%; width: 250px; padding-left: 10px; padding-right: 10px; background-color: white; border-left: 1px solid #ccc; z-index: 999999;">
  <div style="margin-top: 30px; display: flex; align-items: center; width: 100%; justify-content: center;">
  <svg width="70%" style="margin: auto; height="208" viewBox="0 0 211 208" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_56_241)">
  <ellipse cx="105.242" cy="100" rx="101.242" ry="100" fill="#28A745"/>
  </g>
  <circle cx="105" cy="100" r="80" fill="#F5F4F8"/>
  <path d="M55.12 109.12C55.52 111.12 56.38 112.64 57.7 113.68C59.02 114.72 60.8 115.24 63.04 115.24C65.88 115.24 67.96 114.12 69.28 111.88C70.6 109.64 71.26 105.82 71.26 100.42C70.3 101.78 68.94 102.84 67.18 103.6C65.46 104.32 63.58 104.68 61.54 104.68C58.94 104.68 56.58 104.16 54.46 103.12C52.34 102.04 50.66 100.46 49.42 98.38C48.22 96.26 47.62 93.7 47.62 90.7C47.62 86.3 48.9 82.8 51.46 80.2C54.06 77.56 57.62 76.24 62.14 76.24C67.58 76.24 71.44 78.06 73.72 81.7C76.04 85.3 77.2 90.84 77.2 98.32C77.2 103.48 76.76 107.7 75.88 110.98C75.04 114.26 73.56 116.74 71.44 118.42C69.32 120.1 66.38 120.94 62.62 120.94C58.34 120.94 55.04 119.82 52.72 117.58C50.4 115.34 49.1 112.52 48.82 109.12H55.12ZM62.74 98.92C65.14 98.92 67.02 98.18 68.38 96.7C69.78 95.18 70.48 93.18 70.48 90.7C70.48 87.94 69.74 85.8 68.26 84.28C66.82 82.72 64.84 81.94 62.32 81.94C59.8 81.94 57.8 82.74 56.32 84.34C54.88 85.9 54.16 87.96 54.16 90.52C54.16 92.96 54.86 94.98 56.26 96.58C57.7 98.14 59.86 98.92 62.74 98.92ZM84.6859 98.56C84.6859 91.64 85.8459 86.24 88.1659 82.36C90.5259 78.44 94.5659 76.48 100.286 76.48C106.006 76.48 110.026 78.44 112.346 82.36C114.706 86.24 115.886 91.64 115.886 98.56C115.886 105.56 114.706 111.04 112.346 115C110.026 118.92 106.006 120.88 100.286 120.88C94.5659 120.88 90.5259 118.92 88.1659 115C85.8459 111.04 84.6859 105.56 84.6859 98.56ZM109.166 98.56C109.166 95.32 108.946 92.58 108.506 90.34C108.106 88.1 107.266 86.28 105.986 84.88C104.706 83.44 102.806 82.72 100.286 82.72C97.7659 82.72 95.8659 83.44 94.5859 84.88C93.3059 86.28 92.4459 88.1 92.0059 90.34C91.6059 92.58 91.4059 95.32 91.4059 98.56C91.4059 101.92 91.6059 104.74 92.0059 107.02C92.4059 109.3 93.2459 111.14 94.5259 112.54C95.8459 113.94 97.7659 114.64 100.286 114.64C102.806 114.64 104.706 113.94 105.986 112.54C107.306 111.14 108.166 109.3 108.566 107.02C108.966 104.74 109.166 101.92 109.166 98.56ZM122.043 87.82C122.043 84.9 122.883 82.62 124.563 80.98C126.283 79.3 128.483 78.46 131.163 78.46C133.843 78.46 136.023 79.3 137.703 80.98C139.423 82.62 140.283 84.9 140.283 87.82C140.283 90.74 139.423 93.04 137.703 94.72C136.023 96.4 133.843 97.24 131.163 97.24C128.483 97.24 126.283 96.4 124.563 94.72C122.883 93.04 122.043 90.74 122.043 87.82ZM158.643 79.24L134.703 121H127.983L151.923 79.24H158.643ZM131.163 82.6C128.643 82.6 127.383 84.34 127.383 87.82C127.383 91.34 128.643 93.1 131.163 93.1C132.363 93.1 133.283 92.68 133.923 91.84C134.603 90.96 134.943 89.62 134.943 87.82C134.943 84.34 133.683 82.6 131.163 82.6ZM146.463 112.36C146.463 109.44 147.303 107.16 148.983 105.52C150.703 103.84 152.903 103 155.583 103C158.223 103 160.383 103.84 162.063 105.52C163.783 107.16 164.643 109.44 164.643 112.36C164.643 115.28 163.783 117.58 162.063 119.26C160.383 120.94 158.223 121.78 155.583 121.78C152.903 121.78 150.703 120.94 148.983 119.26C147.303 117.58 146.463 115.28 146.463 112.36ZM155.523 107.14C153.003 107.14 151.743 108.88 151.743 112.36C151.743 115.84 153.003 117.58 155.523 117.58C158.043 117.58 159.303 115.84 159.303 112.36C159.303 108.88 158.043 107.14 155.523 107.14Z" fill="#28A745"/>
  <defs>
  <filter id="filter0_d_56_241" x="0" y="0" width="210.484" height="208" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_56_241"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_56_241" result="shape"/>
  </filter>
  </defs>
  </svg>
  
  </div>
  <div style="width: calc(100% - 30px); margin-left: 15px; margin-bottom: 15px;">
  <h5 style="font-weight:600; font-size: 1rem; margin-bottom: 0;">Información sobre la fuente</h5>
  <p style="font-size: 0.8rem; margin-bottom: 0;">Autor: John Doe</p>
  <p style="font-size: 0.8rem;">Fecha de publicación: 2024</p>
  <h5 style="font-weight:600; font-size: 1rem; margin-bottom: 0;">Otras fuentes relacionadas</h5>
  <ul style="list-style-type: none; padding: 0;
  margin: 0;">
      <li style="font-size: 0.8rem;">Capacidades de los bebes</li>
      <li style="font-size: 0.8rem;">Especies voladoras</li>
      <li style="font-size: 0.8rem;">Cómo funciona el vuelo</li>
  </ul>
  </div>
  <div style="background-color: #DDF7FF; display: flex; border-radius: 15px; flex-direction: column; justify-content: center; align-items: center;">
      <div style="overflow-y: scroll; width: calc(100% - 20px); height: 170px;border-radius: 5px;  background-color: white; margin: 10px" class="chat-container" id="chat-container">
      </div>
      <div style="width: calc(100% - 20px);">
        <input id="inputtext" placeholder="Hazme preguntas sobre la fuente" style="margin-bottom: 10px; width: calc(100% - 65px);
        padding: 5px 5px;
        border-radius: 5px;
        margin: 8px 0;
        border: 1px solid #ccc;
        box-sizing: border-box;">
        <button type="button" id="sendreq">Envíar</button>
      </div>
  </div>
</div>
</div>
  `;
  // Adding CSS styles dynamically
  const styles = `
  <style>
    #chatContainer {
      padding: 10px;
      overflow-y: auto;
      height: calc(100% - 270px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .chat-bubble {
      max-width: 80%;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;
      position: relative;
      font-family: Arial, sans-serif;
      font-size: .7rem;
    }
    .chat-bubble.user {
      background-color: #f1f1f1;
      align-self: flex-end;
    }
    .chat-bubble.bot {
      background-color: #e1ffc7;
      align-self: flex-start;
    }
  </style>
`;

// Append styles to the sidebar
sidebar.insertAdjacentHTML('beforeend', styles);

  var mhh = document.getElementById("root").innerHTML;
  document.getElementById("root").remove();
  document.body.appendChild(sidebar);
  document.getElementById("newRoot").innerHTML = mhh;
  document.getElementById("sendreq").addEventListener('click', async function(e) {
    const inputText = document.getElementById('inputtext').value;
            if (inputText.trim() !== "") {
                const chatContainer = document.getElementById('chat-container');

                // Create chat bubble
                const chatBubble = document.createElement('div');
                chatBubble.className = 'chat-bubble';
                chatBubble.classList.add('user')
                chatBubble.textContent = inputText;

                // Append chat bubble to chat container
                chatContainer.appendChild(chatBubble);

                // Clear the input
                document.getElementById('inputtext').value = "";

                // Scroll to the bottom of the chat container
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
    const inputData = { data: inputText };
    await fetch('http://localhost:3000/python-function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Node.js server:', data);
        const chatContainer = document.getElementById('chat-container');

                // Create chat bubble
                const chatBubble = document.createElement('div');
                chatBubble.className = 'chat-bubble';
                chatBubble.classList.add('bot')
                chatBubble.textContent = data.message;

                // Append chat bubble to chat container
                chatContainer.appendChild(chatBubble);

                // Scroll to the bottom of the chat container
                chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => {
        console.error('Error calling Node.js server:', error);
    });
  });
  }
  else {
    var mhh = document.getElementById("newRoot").innerHTML;
    document.getElementById("root").innerHTML = mhh;
    document.getElementById("root").style.display = "block"
  }
  
}
  

  
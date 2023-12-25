chrome.runtime.onMessage.addListener(function(request, _, _) {
  if (request.summonerName && request.region) {
    let native_host = 'com.lol_teleport.open_lol_lp';
    chrome.runtime.sendNativeMessage(native_host,
      { summoner_name: request.summonerName, region: request.region },
      function(response) {
        if (response && response.status === 'error') {
          console.error(response);
        } else if (response) {
          console.log(response);
        } else {
          console.error('No response from the native host ' + native_host);
        }
      }
    );
  }
});

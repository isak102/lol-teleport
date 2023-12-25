chrome.runtime.onMessage.addListener(function(request, _, _) {
  if (request.summonerName && request.region) {
    chrome.runtime.sendNativeMessage('com.lol_teleport.open_lol_lp',
      { summoner_name: request.summonerName, region: request.region },
      function(response) {
        if (response && response.status === 'success') {
          console.log('Command executed successfully');
        } else if (response) {
          console.error('Error:', response.message);
        } else {
          console.error('No response from the native host');
        }
      }
    );
  }
});

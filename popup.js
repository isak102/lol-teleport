import { open_website, open_lollp } from './main.js';
import { get_url, get_domain } from './utils.js';
import { SupportedWebsites } from './SupportedWebsites.js';

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('opgg_btn').addEventListener('click', function() {
    open_website("op.gg");
  });

  document.getElementById('ugg_btn').addEventListener('click', function() {
    open_website("u.gg");
  });

  document.getElementById('xdx_btn').addEventListener('click', function() {
    open_website("xdx.gg");
  });

  document.getElementById('leagueofgraphs_btn').addEventListener('click', function() {
    open_website("leagueofgraphs.com");
  });

  document.getElementById('mobalytics_btn').addEventListener('click', function() {
    open_website("app.mobalytics.gg");
  });

  document.getElementById('deeplol_btn').addEventListener('click', function() {
    open_website("deeplol.gg");
  });

  document.getElementById('lollp_btn').addEventListener('click', function() {
    get_url().then(url => {
      let current_domain = get_domain(url);
      let supported_websites = new SupportedWebsites();

      let current_website = supported_websites.get_website(current_domain);
      if (current_website) {
        let { server, summoner_name } = current_website.parse(url);
        chrome.runtime.sendMessage({ summonerName: summoner_name, region: server });
      }
    });

  });
});

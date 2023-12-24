import { SupportedWebsites } from './SupportedWebsites.js';
import { Website } from './Website.js';

function get_url() {
  return new Promise((resolve, _) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      resolve(url);
    });
  });
}

function get_domain(url) {
  let domain = url.split('/')[2].replace('www.', '');
  return domain;
}

export function open_website(website) {
  get_url().then(url => {
    let current_domain = get_domain(url);
    let supported_websites = new SupportedWebsites();

    let current_website = supported_websites.get_website(current_domain);
    if (current_website) {
      let { server, summoner_name } = current_website.parse(url);
      let target_website = supported_websites.get_website(website)
      target_website.open(server, summoner_name);
    }
  });
}

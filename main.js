import { SupportedWebsites } from './SupportedWebsites.js';
import { Website } from './Website.js';
import { get_url, get_domain } from './utils.js';

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

export function open_lollp() { // TODO: implement this
  get_url().then(url => {
    let current_domain = get_domain(url);
    let supported_websites = new SupportedWebsites();

    let current_website = supported_websites.get_website(current_domain);
    if (current_website) {
      let { server, summoner_name } = current_website.parse(url);
      chrome.runtime.sendNativeMessage('com.open_lollp',
        { summoner_name: summoner_name, region: server },
        response => {
          if (response && response.status === 'success') {
            console.log('Command executed successfully');
          } else if (response) {
            console.error('Error:', response.message);
          } else {
            console.error('No response from the native host');
          }
        });
    }
  });
}

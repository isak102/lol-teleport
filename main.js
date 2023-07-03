import { parse_opgg } from './opgg.js';
import { parse_ugg } from './ugg.js';
import { parse_xdx } from './xdx.js';
import { parse_leagueofgraphs } from './leagueofgraphs.js';

function get_url() {
  return new Promise((resolve, reject) => {
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

export function handle_website(opener) {
  get_url().then(url => {
    let domain = get_domain(url);

    switch (domain) {
      case "op.gg":
        let opgg_result = parse_opgg(url);
        opener(opgg_result.server, opgg_result.summoner_name);
        break;
      case "u.gg":
        let ugg_result = parse_ugg(url);
        opener(ugg_result.server, ugg_result.summoner_name);
        break;
      case "xdx.gg":
        let xdx_result = parse_xdx(url);
        opener(xdx_result.server, xdx_result.summoner_name);
        break;
      case "leagueofgraphs.com":
        let log_result = parse_leagueofgraphs(url);
        opener(log_result.server, log_result.summoner_name);
        break;
      default:
        console.log("Website not supported");
        break;
    }
  });
}


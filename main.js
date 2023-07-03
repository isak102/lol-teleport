class Website {
  constructor(server_index, name_index, url, domain, bare_server) {
    this.server_index = server_index; // at what index in the URL the server is located (split on /)
    this.name_index = name_index; // at what index in the URL the summoner name is located
    this.url = url; // the URL with SERVER and SUMMONER_NAME placeholders
    this.domain = domain; // the start of the url (for example, op.gg or u.gg)
    this.bare_server = bare_server; // if the server is bare (doesn't have a 1, for example euw instead of euw1)
  }

  parse(url) {
    let parts = url.split("/");
    let server = parts[this.server_index].replace(/\d/g, "");
    let summoner_name = parts[this.name_index];

    console.log("Name: " + summoner_name);
    console.log("Server: " + server);

    return { server: server, summoner_name: summoner_name };
  }

  open(server, summoner_name) {
    if (!this.bare_server) {
      switch (server) {
        case "euw":
          server = "euw1";
          break;
        case "na":
          server = "na1";
          break;
        case "jp":
          server = "jp1";
          break;
        case "kr":
          server = "kr";
          break;
        case "la":
          server = "la1";
          break;
        case "la2":
          server = "la2";
          break;
        case "oc":
          server = "oc1";
          break;
        case "br":
          server = "br1";
          break;
        case "eun":
          server = "eun1";
          break;
        case "ph":
          server = "ph2";
          break;
        case "ru":
          server = "ru";
          break;
        case "sg":
          server = "sg2";
          break;
        case "th":
          server = "th2";
          break;
        case "tr":
          server = "tr1";
          break;
        case "tw":
          server = "tw2";
          break;
        case "vn":
          server = "vn2";
          break;
        case "pbe":
          server = "pbe1";
          break;
        default:
          break;
      }
    }

    let url = this.url.replace("SERVER", server).replace("SUMMONER_NAME", summoner_name);
    window.open(url, "_blank");
  }
}

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

    let opgg = new Website(4, 5, "https://www.op.gg/summoners/SERVER/SUMMONER_NAME", "op.gg", true);
    let ugg = new Website(5, 6, "https://u.gg/lol/profile/SERVER/SUMMONER_NAME/overview", "u.gg", false);
    let xdx = new Website(3, 4, "https://xdx.gg/SERVER/SUMMONER_NAME", "xdx.gg", true);
    let leagueofgraphs = new Website(4, 5, "https://www.leagueofgraphs.com/summoner/SERVER/SUMMONER_NAME", "leagueofgraphs.com", true);
    let mobalytics = new Website(5, 6, "https://app.mobalytics.gg/lol/profile/SERVER/SUMMONER_NAME/overview", "app.mobalytics.gg", true)
    let deeplol = new Website(4, 5, "https://www.deeplol.gg/summoner/SERVER/SUMMONER_NAME", "deeplol.gg", true)

    let supported_websites = new Map();

    supported_websites.set(opgg.domain, opgg);
    supported_websites.set(ugg.domain, ugg);
    supported_websites.set(xdx.domain, xdx);
    supported_websites.set(leagueofgraphs.domain, leagueofgraphs);
    supported_websites.set(mobalytics.domain, mobalytics);
    supported_websites.set(deeplol.domain, deeplol);

    let current_website = supported_websites.get(current_domain);
    if (current_website) {
      let { server, summoner_name } = current_website.parse(url);
      supported_websites.get(website).open(server, summoner_name);
    }
  });
}


import { Website } from "./Website.js";

export class SupportedWebsites {
  static instance;

  constructor() {
    if (SupportedWebsites.instance) {
      return SupportedWebsites.instance;
    }

    this.websites = new Map();
    this.initialize_websites();
    SupportedWebsites.instance = this;
  }

  initialize_websites() {
    let opgg = new Website(4, 5, "https://www.op.gg/summoners/SERVER/SUMMONER_NAME", "op.gg", true);
    let ugg = new Website(5, 6, "https://u.gg/lol/profile/SERVER/SUMMONER_NAME/overview", "u.gg", false);
    let xdx = new Website(3, 4, "https://xdx.gg/SERVER/SUMMONER_NAME", "xdx.gg", true);
    let leagueofgraphs = new Website(4, 5, "https://www.leagueofgraphs.com/summoner/SERVER/SUMMONER_NAME", "leagueofgraphs.com", true);
    let mobalytics = new Website(5, 6, "https://app.mobalytics.gg/lol/profile/SERVER/SUMMONER_NAME/overview", "app.mobalytics.gg", true)
    let deeplol = new Website(4, 5, "https://www.deeplol.gg/summoner/SERVER/SUMMONER_NAME", "deeplol.gg", true)

    this.websites.set(opgg.domain, opgg);
    this.websites.set(ugg.domain, ugg);
    this.websites.set(xdx.domain, xdx);
    this.websites.set(leagueofgraphs.domain, leagueofgraphs);
    this.websites.set(mobalytics.domain, mobalytics);
    this.websites.set(deeplol.domain, deeplol);
  }

  get_website(domain) {
    return this.websites.get(domain);
  }
}

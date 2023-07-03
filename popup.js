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

function handle_website(opener) {
  get_url().then(url => {
    let domain = get_domain(url);
    console.log(domain);

    switch (domain) {
      case "op.gg":
        let opgg_result = parse_opgg(url);
        opener(opgg_result.server, opgg_result.summoner_name);
        break;
      case "u.gg":
        console.log("url");
        let ugg_result = parse_ugg(url);
        opener(ugg_result.server, ugg_result.summoner_name);
        break;
      default:
        console.log("Website not supported");
        break;
    }
  });
}

function parse_opgg(url) {
  let parts = url.split("/");
  let server = parts[4];
  let summoner_name = parts[5];

  return { server: server, summoner_name: summoner_name };
}

function open_opgg(server, summoner_name) {
  let url = "https://www.op.gg/summoners/" + server + "/" + summoner_name;
  window.open(url, "_blank");
}

function parse_ugg(url) {
  let parts = url.split("/");
  let server = parts[5].replace(/\d/g, "");
  let summoner_name = parts[6];

  return { server: server, summoner_name: summoner_name };
}

function open_ugg(server, summoner_name) {
  let new_server;
  switch (server) {
    case "euw":
      new_server = "euw1";
      break;
    case "na":
      new_server = "na1";
      break;
    default:
      new_server = server;
      break;
  }

  let url = "https://u.gg/lol/profile/" + new_server + "/" + summoner_name;
  window.open(url, "_blank");
}

document.addEventListener('DOMContentLoaded', function() {
  var opgg_btn = document.getElementById('opggBtn');
  var ugg_btn = document.getElementById('uggBtn');

  opgg_btn.addEventListener('click', function() {
    handle_website(open_opgg);
  });

  ugg_btn.addEventListener('click', function() {
    handle_website(open_ugg);
  });
});

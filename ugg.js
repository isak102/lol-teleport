export function parse_ugg(url) {
  let parts = url.split("/");
  let server = parts[5].replace(/\d/g, "");
  let summoner_name = parts[6];

  return { server: server, summoner_name: summoner_name };
}

export function open_ugg(server, summoner_name) {
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


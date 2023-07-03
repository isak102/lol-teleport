export function parse_xdx(url) {
  let parts = url.split("/");
  let server = parts[3];
  let summoner_name = parts[4];

  return { server: server, summoner_name: summoner_name };
}

export function open_xdx(server, summoner_name) {
  let url = "https://xdx.gg/" + server + "/" + summoner_name;
  window.open(url, "_blank");
}


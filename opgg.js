export function parse_opgg(url) {
  let parts = url.split("/");
  let server = parts[4];
  let summoner_name = parts[5];

  return { server: server, summoner_name: summoner_name };
}

export function open_opgg(server, summoner_name) {
  let url = "https://www.op.gg/summoners/" + server + "/" + summoner_name;
  window.open(url, "_blank");
}

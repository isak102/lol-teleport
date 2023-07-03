export function parse_leagueofgraphs(url) {
  let parts = url.split("/");
  let server = parts[4];
  let summoner_name = parts[5];
  console.log("Server: " + summoner_name);

  return { server: server, summoner_name: summoner_name };
}

export function open_leagueofgraphs(server, summoner_name) {
  let url = "https://www.leagueofgraphs.com/summoner/" + server + "/" + summoner_name;
  window.open(url, "_blank");
}

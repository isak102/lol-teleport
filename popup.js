import { open_website } from './main.js';

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('opgg_btn').addEventListener('click', function() {
    open_website("op.gg");
  });

  document.getElementById('ugg_btn').addEventListener('click', function() {
    open_website("u.gg");
  });

  document.getElementById('xdx_btn').addEventListener('click', function() {
    open_website("xdx.gg");
  });

  document.getElementById('leagueofgraphs_btn').addEventListener('click', function() {
    open_website("leagueofgraphs.com");
  });
  
  document.getElementById('mobalytics_btn').addEventListener('click', function() {
    open_website("app.mobalytics.gg");
  });
  
  document.getElementById('deeplol_btn').addEventListener('click', function() {
    open_website("deeplol.gg");
  });
});

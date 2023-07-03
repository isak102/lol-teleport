import { handle_website } from './main.js';
import { open_opgg } from './opgg.js';
import { open_ugg } from './ugg.js';
import { open_xdx } from './xdx.js';
import { open_leagueofgraphs } from './leagueofgraphs.js';

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('opgg_btn').addEventListener('click', function() {
    handle_website(open_opgg);
  });

  document.getElementById('ugg_btn').addEventListener('click', function() {
    handle_website(open_ugg);
  });

  document.getElementById('xdx_btn').addEventListener('click', function() {
    handle_website(open_xdx);
  });

  document.getElementById('leagueofgraphs_btn').addEventListener('click', function() {
    handle_website(open_leagueofgraphs);
  });
});

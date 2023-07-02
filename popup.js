document.addEventListener('DOMContentLoaded', function() {
  var opggBtn = document.getElementById('opggBtn');
  var uggBtn = document.getElementById('uggBtn');

  opggBtn.addEventListener('click', function() {
    // Handle hamburger selection
    window.open('https://op.gg', '_blank');
  });

  uggBtn.addEventListener('click', function() {
    // TODO: implement
  });
});

export function get_url() {
  return new Promise((resolve, _) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      resolve(url);
    });
  });
}

export function get_domain(url) {
  let domain = url.split('/')[2].replace('www.', '');
  return domain;
}


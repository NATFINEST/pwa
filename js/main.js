// @ts-check

// https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function updateTipAmounts() {
  // grab the meal cost from the page
  let mealCost = document.getElementById('mealCost').value;
  // populate the table with tip amounts
  document.getElementById('tip10').innerHTML = formatter.format(mealCost * 0.1);
  document.getElementById('tip15').innerHTML = formatter.format(
    mealCost * 0.15
  );
  document.getElementById('tip18').innerHTML = formatter.format(
    mealCost * 0.18
  );
  document.getElementById('tip20').innerHTML = formatter.format(mealCost * 0.2);
  document.getElementById('tip22').innerHTML = formatter.format(
    mealCost * 0.22
  );
}

// register the event listener for the input field
document.getElementById('mealCost').oninput = updateTipAmounts;

// Get a handle on the install button
let installButton = document.getElementById('installButton');
// Setthe click handler for the install button
installButton.onclick = doInstall;

// Create an object we'll use to hold the reference to the PWA install event
let deferredPrompt;

function doInstall() {
  installButton.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((res) => {
    if (res.outcome === 'accepted') {
      console.log('doInstall: accepted');
    } else {
      console.log('doInstall: declined');
    }
    deferredPrompt = null;
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'block';
});

window.addEventListener('appinstalled', (event) => {
  console.log('App Installed');
});

// did we launch as a PWA?
var urlParams = new URLSearchParams(window.location.search);
// look for the source parameter, if it's `pwa` then it's installed
if (urlParams.get('source') === 'pwa') {
  console.log('Launched as PWA');
  // add the PWA moniker to the title
  let theTitle = document.getElementById('title');
  theTitle.innerHTML = theTitle.innerHTML + ' (PWA)';
}

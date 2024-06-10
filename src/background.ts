let loading = false;
let currentlyStoredUser = null;
let utcOffset = 0 - new Date().getTimezoneOffset() / 30;

// On Browser Open
chrome.windows.onCreated.addListener(() => clearTwitchStorage());

// On Tab Switch
chrome.tabs.onActivated.addListener(() => {
  setTimeout(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => checkIfTwitch(tab[0].url));
  }, 250);
});

// On URL Change
chrome.tabs.onUpdated.addListener((id: number, change: any, tab: any) => {
  checkIfTwitch(tab.url);
});

// Check if URL is Twitch
const checkIfTwitch = (url: string) => {
  if (url.includes('https://www.twitch.tv') && !url.includes('https://www.twitch.tv/directory')) {
    const twitchAccount = url.split('https://www.twitch.tv/')[1];
    if (twitchAccount.trim() === '' || twitchAccount === currentlyStoredUser) { return; }
    getUserByTwitch(twitchAccount);
  } else {
    clearTwitchStorage();
    notification(false);
  }
};

// Get Stream Viewer Information by Twitch Account
const getUserByTwitch = async (twitchAccount: string) => {
  if (loading) { return; }

  loading = true;
  console.log(`Checking Stream Viewer for Twitch user: ${twitchAccount}`);

  const response = await window.fetch(`http://localhost:5000/api/chrome/getUserByTwitch/${twitchAccount}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      offset: utcOffset.toString()
     }
  });

  const data = await response.json();
  loading = false;

  if (response.status === 200) {
    if (data.auth0Id !== null) {
      setTwitchStorage(data);
      notification(true);
    } else {
      clearTwitchStorage();
      notification(false);
    }
  }
};

// Set Badge Text & Color
const notification = (show: boolean) => {
  if (show) {
    chrome.browserAction.setBadgeText ( { text: '1' } );
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  } else {
    chrome.browserAction.setBadgeText ( { text: '' } );
  }
};

// Set Twitch Storage
const setTwitchStorage = (data: any) => {
  currentlyStoredUser = data.twitchAccount;
  chrome.storage.sync.set({ 'twitchId': data.auth0Id }, () => console.log(`Value is set to ${data.auth0Id}`));
  chrome.storage.sync.set({ 'twitchTag': data.riftTag }, () => console.log(`Value is set to ${data.riftTag}`));
  chrome.storage.sync.set({ 'twitchAccount': data.twitchAccount }, () => console.log(`Value is set to ${data.twitchAccount}`));
};

// Clear Twitch Storage
const clearTwitchStorage = () => {
  currentlyStoredUser = null;
  chrome.storage.sync.clear(() => console.log('Chrome storage cleared'));
};

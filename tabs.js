/*
This extension tracks how many times you've opened a tab of facebook.

Steps:
1) Get an event listener that can track opening a tab of facebook
a) This means when a tab goes from empty tab to facebook
2) Store instances of this. That means save a timestamp.
3) Display how many times facebook has been opened in the last day.
*/

chrome.tabs.onCreated.addListener(function(tab){
  console.log("hello!");
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log("Change info: " + changeInfo.url);
    let targetUrl = "https://www.facebook.com/";
    if (changeInfo.url!==undefined && changeInfo.url===targetUrl){
      console.log("Working!");
      //Handle storage updates.
      //Display notification.
    }
  });
});

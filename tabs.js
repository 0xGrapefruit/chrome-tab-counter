/*
This extension tracks how many times you've opened a tab of facebook.

Steps:
1) Get an event listener that can track opening a tab of facebook
a) This means when a tab goes from empty tab to facebook
2) Store instances of this. That means save a timestamp.
3) Display how many times facebook has been opened in the last day.
*/

function updater(tab){
  chrome.webNavigation.onCompleted.addListener(function(tabId, changeInfo, tab){
    let targetUrl = "*://www.facebook.com/"; //Used for query
    let target = 'facebook'; //Assumed user input.
    chrome.tabs.query({active: true, url: targetUrl}, function(tabs){
      if (tabs.length>0){ //If query is true
        console.log("Working!");
        chrome.storage.sync.get(target, function(obj){
          console.log(obj);
          if (obj.hasOwnProperty(target)){
            console.log("in property");
            let newVal = obj[target] + 1;
            let updateObject = {};
            updateObject[target] = newVal; //This notation is for variables within objects.
            chrome.storage.sync.set(updateObject, function(){
              console.log("In set");
              console.log("Updated value:" + newVal);
              chrome.webNavigation.onCompleted.removeListener(updater);
            });
          } else {
            updateObject = {};
            updateObject[target] = 1;
            chrome.storage.sync.set(updateObject, function(){
              console.log("Value not found, created new one");
              chrome.webNavigation.onCompleted.removeListener(updater);
            });
          }
        });
      }
    });
  });
}

chrome.tabs.onCreated.addListener(updater);

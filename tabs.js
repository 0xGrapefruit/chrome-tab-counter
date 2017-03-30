//Main logic of program
chrome.tabs.onCreated.addListener(
  function (tab){
    chrome.webNavigation.onCompleted.addListener(
      function updater(tabId, changeInfo, tab){
        let targetUrl = "*://www.facebook.com/"; //Used for query
        let target = 'facebook'; //Assumed user input.
        let currentTime = Date.now();
        chrome.tabs.query({active: true, url: targetUrl}, function(tabs){
          if (tabs.length>0){ //If current tab is facebook.
            chrome.storage.sync.get([target,"lastUpdated"], function(obj){
              if (obj.hasOwnProperty(target)){
                let updateObject = {};
                let newVal = -1;
                console.log(obj);
                if (obj.lastUpdated===undefined || currentTime>obj.lastUpdated+86400000){
                  console.log("In undef");
                  newVal = 1;
                  updateObject[target] = newVal; //This notation is for variables within objects.
                  let midnightTime = getMidnightTime(currentTime);
                  updateObject.lastUpdated = midnightTime;
                } else {
                  console.log("in else");
                  newVal = obj[target] + 1;
                  updateObject = {};
                  updateObject[target] = newVal; //This notation is for variables within objects.
                }
                console.log(updateObject);
                chrome.storage.sync.set(updateObject, function(){
                  console.log("Updated value:" + newVal);
                  chrome.webNavigation.onCompleted.removeListener(updater);
                  let options = {
                    type: "basic",
                    title: "Facebook Shamer",
                    iconUrl: "/icon.png",
                    message: "You've opened a facebook tab " + newVal + " times today"
                  }
                  chrome.notifications.create("", options, function(){});
                });
              } else {
                updateObject = {};
                updateObject[target] = 1;
                chrome.storage.sync.set(updateObject, function(){
                  console.log("Value not found, created new one");
                  chrome.webNavigation.onCompleted.removeListener(updater);
                  chrome.webNavigation.onCompleted.removeListener(updater);
                  let options = {
                    type: "basic",
                    title: "Facebook Shamer",
                    iconUrl: "/icon.png",
                    message: "You've opened a facebook tab 1 time today"
                  }
                });
              }
            });
          }
      });
    });
  }
);

function getMidnightTime(currentTime){
  let midnightTime = currentTime - (currentTime % 86400000);
  return midnightTime;
}

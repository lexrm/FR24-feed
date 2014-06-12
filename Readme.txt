# The DataBase is:

Flight details of all current flights all over the europe, about 2500 flights
(there is an option to change the resource to different regions. Depends of what want to be covered. 
For example it is passable also to get details of all flights all over the world, about 10000 flights).
It is maintained as a key-value pair and key being the flight id and value an array of details 
(including the speed, the altitude etc.).


# Main tasks of FR24-feed angular webapp (for this stage of development) are:

1. Connection to the RESTful server of flightradar24.com
     (this connection provides constant online access to FR24 database).

2. Displaying that data on the web browser (HTML5)
     (this done by fetching this data from recieved JSON file).

3. Error and messages handle (deferred and promise implementation).

4. Repetition of steps 1-3
     (the above processes executed under the hood - providing the property of smooth data changing:
     no need to reload or refresh the page to see the changes in flight details).


# Properties of the main purpose of FR24_feed app are:

- Every step in a model: setup-connection/failure-updatingExistingDB-displaying is documented,
    and appropriate messages/error popup in the browser.

- The process repeat himself every given interval (about 10 sec.).

- "DB updated. You will see the current flights in a moment." message allows to check the box to 
    "prevent this page from creating additional dialogs". That makes all the messages not to popup more
    (to come back to the previous state, the browser cashed data have to be cleard). By doing this changeable
    details of the flights will be smootly representing in the browser.

- If the connection to the server will be failed from some reason (like bad internet connection),
    then a suitable error will show-up (that in case that "prevent this page from creating additional dialogs" wasn't 
    checked up before). But when the connection will returns the main process will be renewed automatically,
    and no operations from the user are needed.

- If there will be some changes in the path that given in the code to the resource, and the changes are not valid,
    then by the reloading the page the user will be announced with a matching error.

      
Installation steps:

in gitBash type:

git clone https://github.com/lexrm/FR24-feed.git

cd FR24-feed

npm start
(will do npm install + bower install + starting up the http-server)

then in Chrome type:

http://localhost:8000/app/index.html#/planes

Wait 10 sec. for the app being activated for the first time 
(first upload need to be changed to one sec. of upload).

--
Enjoy.




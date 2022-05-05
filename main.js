//We created this file based on the classes and on this youtube video: https://www.youtube.com/watch?v=kN1Czs0m1SU

//electron variable will require electron
const electron = require('electron');
//require the path module
const path = require('path');
//require url, which is a core js module
const url = require('url');

//Pulling these objects out of electron
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//Listen for app to be ready
app.on('ready', function () {
  //Create new window once the app is ready. 
  mainWindow = new BrowserWindow({});
  //Load the html file "index.html" into the mainWindow.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on('closed', function () {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle createSearch window
function createSearchWindow() {
  searchWindow = new BrowserWindow({
    //Setting widt, height and a title for this window.
    width: 500,
    height: 500,
    title: 'Insert Movie Title'
  });
  //Load the html file "movies.html" into the searchWindow.
  searchWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'movies.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Garbage collection handle
  searchWindow.on('close', function () {
    searchWindow = null;
  });
}

// Handle createAbout window
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    //Setting widt, height and a title for this window.
    width: 500,
    height: 500,
    title: 'About movieHunters'
  });
  aboutWindow.loadURL(url.format({
    //Load the html file "about.html" into the searchWindow.
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Handle garbage collection
  aboutWindow.on('close', function () {
    aboutWindow = null;
  });
}

// Create menu template
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: 'File',
    submenu: [
      {
        //Search movies label
        label: 'Search movies',
        click() {
          createSearchWindow();
        }
      },
      {
        //About MovieHunters label
        label: 'About MovieHunters',
        click() {
          createAboutWindow();
        }
      },
      {
        //Quit label
        label: 'Quit',
        //shortcut to quit by clicking on ctrl + Q in the keyboard.
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If mac, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add developer tools option 
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

function foo(){
 alert('Your are now a subscriber! Be ready for movieHunters!');
}
const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle add item window
function createSearchWindow(){
  searchWindow = new BrowserWindow({
    width: 300,
    height:200,
    title:'Insert Movie Title'
  });
  searchWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'movies.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  searchWindow.on('close', function(){
    searchWindow = null;
  });
}

// Handle about item window
function createAboutWindow(){
  aboutWindow = new BrowserWindow({
    width: 300,
    height:200,
    title:'About movieHunters'
  });
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  aboutWindow.on('close', function(){
    aboutWindow = null;
  });
}

// Catch item:search
ipcMain.on('item:search', function(e, item){
  mainWindow.webContents.send('item:search', item);
  searchWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

// Catch item:about
ipcMain.on('item:about', function(e, item){
  mainWindow.webContents.send('item:about', item);
  aboutWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});
// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Search movies',
        click(){
          createSearchWindow();
        }
      },
      {
        label:'About MovieHunters',
        click(){
         createAboutWindow();
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
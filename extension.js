'use strict';

const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Shell = imports.gi.Shell;
const GLib = imports.gi.GLib;

/**
 * @param {function} func 
 * @param {number} millis 
 */
const setTimeout = (callback, millis) => {
  // stolen from https://github.com/satya164/gjs-helpers/blob/master/src/timing.js
  return GLib.timeout_add(GLib.PRIORITY_DEFAULT, millis, () => {
    callback();
    return false; // Don't repeat
  }, null);
};

class Extension {
  constructor() {
    log(`***** constructing ${Me.metadata.name} version ${Me.metadata.version}`);


    setTimeout(() => {

      // ************ APPROACH 1, USING WORKSPACE MANAGER
      // const nbWorkspaces = global.workspace_manager.n_workspaces;
      // log('***** nbWorkspaces', nbWorkspaces);
      // const metaWorkspace = global.workspace_manager.get_workspace_by_index(0);
      // log('***** metaWorkspace', metaWorkspace);
      // const windows = metaWorkspace.list_windows();
      // log('***** windows', windows);
      // log('***** typeof windows', typeof windows);
      // log('***** windows.length', windows.length);
      // log('***** Object.keys(windows)', Object.keys(windows));
      // for (const window of windows) {
      //   log('***** window', window);
      // }
  
      // ************ APPROACH 2, USING SHELL.APPSYSTEM
      const apps = Shell.AppSystem.get_default().get_running().sort();
      log('***** apps.length', apps.length);
      for (const app of apps) {
        log('***** app.get_name()', app.get_name());
        log('***** app.app_info.get_executable()', app.app_info.get_executable());
        log('***** app.app_info.get_commandline()', app.app_info.get_commandline());
        log('***** app.app_info.get_display_name()', app.app_info.get_display_name());
        log('***** app.app_info.get_name()', app.app_info.get_name());
        // const windows = app.get_windows();
        // log('***** windows.length', windows.length);
      }
      // https://github.com/lyonel/all-windows/blob/master/extension.js#L119-L124
      apps[2].get_windows()[0].activate(global.get_current_time());

      // log('***** imports', Object.keys(imports));
      // log('***** imports.ui', Object.keys(imports.ui));
      // log('***** imports.gi', Object.keys(imports.gi));
      // log('***** imports.misc', Object.keys(imports.misc));
      log('***** registering shortcut');
      // global.display.add_keybinding(
      //   'test-keybinding',

      // )
    }, 4000);

    // TODO keybindings; see https://github.com/ivoarch/gnome-shell-TilixDropdown/blob/master/extension.js
    // https://gjs-docs.gnome.org/glib20~2.62.0/glib.spawn_async
    // https://gjs-docs.gnome.org/glib20~2.62.0/glib.spawn_command_line_async
  }

  enable() {
    log(`***** enabling ${Me.metadata.name} version ${Me.metadata.version}`);
  }

  disable() {
    log(`***** disabling ${Me.metadata.name} version ${Me.metadata.version}`);
  }
}

function init() {
  log(`***** initializing ${Me.metadata.name} version ${Me.metadata.version}`);
  return new Extension();
}

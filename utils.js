const Gio = imports.gi.Gio;
const GioSSS = Gio.SettingsSchemaSource;
const Config = imports.misc.config;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

 /**
  * Builds and returns a GSettings schema, using files in extensionsdir/schemas.
  * If @schema is not provided, it is taken from metadata['settings-schema'] .
  * @param {string} schemaId
  */
 function getSettings(schemaId) {
  // Stolen from https://github.com/ivoarch/gnome-shell-TilixDropdown/blob/master/utils.js
  schemaId = schemaId || Me.metadata['settings-schema'];
  log('***** schema', schemaId);

  // Support schemas both in ext. folder (for dev), and in std unix folder tree.
  const schemaDir = Me.dir.get_child('schemas');
  log('***** schemaDir.get_path()', schemaDir.get_path());
  log('***** schemaDir.query_exists(null)', schemaDir.query_exists(null));
  const schemaSource = schemaDir.query_exists(null)
   ? GioSSS.new_from_directory(schemaDir.get_path(), GioSSS.get_default(), false)
   : GioSSS.get_default();

  const schema = schemaSource.lookup(schemaId, true);
  log('***** schemaObj.list_keys()', schema.list_keys());
  log('***** schemaObj.list_children()', schema.list_children());
  if (!schema) {
    throw new Error(`Schema ${schemaId} could not be found for extension ` +
      `"${Me.metadata.uuid}". Please check your installation.`);
  }

  return new Gio.Settings({ settings_schema: schema });
}

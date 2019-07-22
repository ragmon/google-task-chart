class DBManager {

  /**
   * Database pointer
   */
  _db;

  /**
   * Database tables who must be exists.
   *
   * @type {string[]}
   */
  tables = ['task_lists', 'tasks'];

  /**
   * Connects to database and return connection pointer.
   *
   * @returns {*}
   */
  openConnection() {
    return this._db = window.sqlitePlugin.openDatabase({
      name : 'gtask.db',
      location : 'default'
    });
  }

  isOpen() {
    return !!this._db;
  }

  /**
   * Is database was been initialized.
   *
   * @returns {boolean}
   */
  isInit() {
    let result = false;

    this.db.executeSql(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name IN (${ 
      this.tables.join(',') 
    })';`, [], (rs) => {
      result = rs > 0;
    }, (error) => {
      console.error('SELECT SQL statement ERROR: ' + error.message);
      result = false;
    });

    return result;
  }
}
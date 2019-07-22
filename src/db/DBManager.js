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
   * Migration filename regex mask.
   *
   * @type {RegExp}
   * @private
   */
  _migrationRegex = /_v(\d+)\.sql$/;

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

    // Check is all of required tables exists in database
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

  /**
   * Get current database version.
   *
   * @returns {string | number}
   */
  getCurrentVersion() {
    return window.localStorage.getItem('db_version') || 0;
  }

  /**
   * Set current database version.
   *
   * @param version
   */
  setCurrentVersion(version) {
    window.localStorage.setItem('db_version', version);
  }

  /**
   * Migrate database migrations.
   */
  migrate() {
    window.resolveLocalFileSystemURL('src/db/sql', (fileSystem) => {
      const reader = fileSystem.createReader();
      reader.readEntries((entries) => {
        // Each all entry in "src/db/sql" directory
        entries.forEach((entry) => {
          if (entry.isFile && this._migrationRegex.test(entry.name)) {
            this._migrateFile(entry)
          }
          // Set current migration version
          this.setCurrentVersion(this.getCurrentVersion() + 1);
        })
      }, (error) => {
        console.error(error);
      })
    }, (error) => {
      console.error(error);
    });
  }

  /**
   * Migrate migration file.
   *
   * @param fileEntry
   * @private
   */
  _migrateFile(fileEntry) {
    fileEntry.file((file) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        const sql = this.result;
        this._db.transaction((tx) => {
          tx.executeSql(sql);
        }, (error) => {
          console.error('Transaction ERROR: ' + error.message);
          throw error;
        });
      };
      reader.onerror = function (error) {
        console.error(error);
        throw error;
      };

      reader.readAsText(file);
    })
  }
}
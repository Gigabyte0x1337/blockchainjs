const sqlite = require('sqlite');

module.exports = class Sqlite {

    /**
     * 
     * @param {Database} dataBaseInstance 
     */
    constructor(dataBase) {
        this.dataBase = dataBase;
    }
    static async open(name) {
        const databaseInstance = await sqlite.open(name);
        return new Sqlite(databaseInstance);
    }


    async close() {
        await this.dataBase.close();
    }
}
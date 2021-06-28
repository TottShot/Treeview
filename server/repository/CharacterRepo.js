import sql from "mssql/msnodesqlv8.js";
import { convertCharacterToGraphQLType } from "../mappings/CharacterToGraphQL.js";

export function getCharacter() {
    return new Promise((resolve, reject) => {
        // config for your database
        var config = {
            server: 'localhost\\SQLEXPRESS',
            database: 'Palantir',
            driver: "msnodesqlv8",
            options: {
                trustedConnection: true
            }
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err)
                console.log(err);
                reject(new Error("Something went wrong!"));

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query('select * from Character', function (err, recordset) {
                if (err)
                    reject(err);
                console.log(convertCharacterToGraphQLType(recordset.recordset[0]));
                resolve(convertCharacterToGraphQLType(recordset.recordset[0]));
            });
        });
    });
}
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections:{vendedores?: mongoDB.Collection} = {}

//Connection

export async function connectToDatabase(){
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const vendedoresCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);
    collections.vendedores = vendedoresCollection;
    console.log(`Successfully connected to database: ${db.databaseName}`);
}
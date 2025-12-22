import conf from "../conf/conf"
import { Client, Query, ID, TablesDB, } from "appwrite";
import {  Permission, Role } from "appwrite";



export class Service {
  client = new Client();
  tables;



  constructor() {

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tables = new TablesDB(this.client)

  }

  async createCities({ city, userId }) {
    try {
      return await this.tables.createRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: ID.unique(),
        data: {
          city,
          userId
        },
        permissions:[ 
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId)),

        ],
      });
    } catch (error) {
      console.error("Error creating city:", error);
       throw error;
    }
  }


  async deleteCity(rowId) {
    try {
      await this.tables.deleteRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        rowId: rowId
      });
      return true;
    } catch (error) {
      console.error("Error deleting city:", error);
      
      return false
    }

  }





  async getCities(queries = []) {
    try {
      return await this.tables.listRows({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteTableId,
        queries,


      })
    } catch (error) {
      console.log("Error fetching cities:", error)
       throw error;
     
    }

  }

}


const service = new Service();
export default service


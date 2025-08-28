"use strict";

let mongoDB = undefined;
const { map, mapTo, catchError, toArray } = require("rxjs/operators");
const { Observable, defer, from } = require("rxjs");
const { mergeMap } = require("rxjs/operators");

const CollectionName = 'SharkAttack';

class SharkAttackDA {
  static start$(mongoDbInstance) {
    return Observable.create(observer => {
      if (mongoDbInstance) {
        mongoDB = mongoDbInstance;
        observer.next(`${this.name} using given mongo instance`);
      } else {
        mongoDB = require("../../../tools/mongo-db/MongoDB").singleton();
        observer.next(`${this.name} using singleton system-wide mongo instance`);
      }
      observer.next(`${this.name} started`);
      observer.complete();
    });
  }

  /**
   * Gets an user by its username
   */
  static getSharkAttack$(id, organizationId) {
    const collection = mongoDB.db.collection(CollectionName);

    const query = {
      _id: id, organizationId
    };
    return defer(() => collection.findOne(query)).pipe(
      map((res) => {
        return res !== null
          ? { ...res, id: res._id }
          : {}
      })
    );
  }

  static generateListingQuery(filter) {
    const query = {};
    if (filter.name) {
      query["name"] = { $regex: filter.name, $options: "i" };
    }
    if (filter.organizationId) {
      query["organizationId"] = filter.organizationId;
    }
    if (filter.active !== undefined) {
      query["active"] = filter.active;
    }
    if (filter.country) {
      query["country"] = { $regex: filter.country, $options: "i" };
    }
    if (filter.type) {
      query["type"] = { $regex: filter.type, $options: "i" };
    }
    if (filter.species) {
      query["species"] = { $regex: filter.species, $options: "i" };
    }
    
    console.log('DA: Final query:', JSON.stringify(query));
    return query;
  }

  static getSharkAttackList$(filter = {}, pagination = {}, sortInput) {
    const collection = mongoDB.db.collection(CollectionName);
    const { page = 0, count = 10 } = pagination;

    const query = this.generateListingQuery(filter);    
    const projection = { 
      date: 1, 
      year: 1, 
      type: 1, 
      country: 1, 
      area: 1, 
      location: 1, 
      activity: 1, 
      name: 1, 
      sex: 1, 
      age: 1, 
      injury: 1, 
      fatal_y_n: 1, 
      time: 1, 
      species: 1, 
      investigator_or_source: 1, 
      pdf: 1, 
      href_formula: 1, 
      href: 1, 
      case_number: 1, 
      case_number0: 1, 
      active: 1, 
      organizationId: 1 
    };

    let cursor = collection
      .find(query, { projection })
      .skip(count * page)
      .limit(count);

    const sort = {};
    if (sortInput) {
      sort[sortInput.field] = sortInput.asc ? 1 : -1;
    } else {
      sort["metadata.createdAt"] = -1;
    }
    cursor = cursor.sort(sort);


    return mongoDB.extractAllFromMongoCursor$(cursor).pipe(
      map(res => ({ ...res, id: res._id }))
    );
  }

  static getSharkAttackSize$(filter = {}) {
    const collection = mongoDB.db.collection(CollectionName);
    const query = this.generateListingQuery(filter);    
    return defer(() => collection.countDocuments(query));
  }

  /**
  * creates a new SharkAttack 
  * @param {*} id SharkAttack ID
  * @param {*} SharkAttack properties
  */
  static createSharkAttack$(_id, properties, createdBy) {

    const metadata = { createdBy, createdAt: Date.now(), updatedBy: createdBy, updatedAt: Date.now() };
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() => collection.insertOne({
      _id,
      ...properties,
      metadata,
    })).pipe(
      map(({ insertedId }) => ({ id: insertedId, ...properties, metadata }))
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static updateSharkAttack$(_id, properties, updatedBy) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.findOneAndUpdate(
        { _id },
        {
          $set: {
            ...properties,
            "metadata.updatedBy": updatedBy, "metadata.updatedAt": Date.now()
          }
        },
        {
          returnOriginal: false,
        }
      )
    ).pipe(
      map(result => result && result.value ? { ...result.value, id: result.value._id } : undefined)
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static updateSharkAttackFromRecovery$(_id, properties, av) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.updateOne(
        {
          _id,
        },
        { $set: { ...properties } },
        {
          returnOriginal: false,
          upsert: true
        }
      )
    ).pipe(
      map(result => result && result.value ? { ...result.value, id: result.value._id } : undefined)
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static replaceSharkAttack$(_id, properties) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.replaceOne(
        { _id },
        properties,
      )
    ).pipe(
      mapTo({ id: _id, ...properties })
    );
  }

  /**
    * deletes an SharkAttack 
    * @param {*} _id  SharkAttack ID
  */
  static deleteSharkAttack$(_id) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.deleteOne({ _id })
    );
  }

  /**
    * deletes multiple SharkAttack at once
    * @param {*} _ids  SharkAttack IDs array
  */
  static deleteSharkAttacks$(_ids) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.deleteMany({ _id: { $in: _ids } })
    ).pipe(
      map(({ deletedCount }) => deletedCount > 0)
    );
  }

  /**
   * Import shark attacks from external API
   * @param {string} createdBy 
   * @param {string} organizationId 
   */
  static importSharkAttacksFromAPI$(createdBy, organizationId) {
    console.log('Method importSharkAttacksFromAPI called with organizationId:', organizationId);
    const collection = mongoDB.db.collection(CollectionName);
    const axios = require('axios');
    const uuidv4 = require("uuid/v4");

    console.log('Starting import from API...');
    
    return defer(() => 
      axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?limit=100')
    ).pipe(
      mergeMap(response => {
        console.log('API Response status:', response.status);
        console.log('API Response data length:', response.data.results ? response.data.results.length : 0);
        const records = response.data.results;
        
        const importPromises = records.map(record => {
          // Asegurar que el _id sea válido
          let documentId = record.original_order;
          if (!documentId || documentId === null || documentId === undefined) {
            documentId = uuidv4();
          }
          
          const sharkAttackData = {
            _id: documentId,
            date: record.date,
            year: record.year,
            type: record.type,
            country: record.country,
            area: record.area,
            location: record.location,
            activity: record.activity,
            name: record.name,
            sex: record.sex,
            age: record.age,
            injury: record.injury,
            fatal_y_n: record.fatal_y_n,
            time: record.time,
            species: record.species,
            investigator_or_source: record.investigator_or_source,
            pdf: record.pdf,
            href_formula: record.href_formula,
            href: record.href,
            case_number: record.case_number,
            case_number0: record.case_number0,
            active: true,
            organizationId: organizationId,
            metadata: { 
              createdBy, 
              createdAt: Date.now(), 
              updatedBy: createdBy, 
              updatedAt: Date.now() 
            }
          };
          
          return collection.updateOne(
            { _id: documentId },
            { $set: sharkAttackData },
            { upsert: true }
          ).then(result => {
            // Return the imported data for event generation in CRUD layer
            return sharkAttackData;
          });
        });
        
        console.log('Processing', importPromises.length, 'records...');
        return Promise.all(importPromises);
      }),
      mergeMap(results => 
        from(results).pipe(
          toArray()
        )
      ),
      map(importedRecords => {
        console.log('Import completed. Imported count:', importedRecords.length);
        return importedRecords; // Return the actual imported records
      }),
      catchError(error => {
        console.error('Import error:', error.message);
        throw error; // Let the CRUD layer handle the error
      })
    );
  }


}
/**
 * @returns {SharkAttackDA}
 */
module.exports = SharkAttackDA;

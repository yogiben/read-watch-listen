import Meteor, { Accounts, ReactiveDict } from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import Datastore from 'react-native-local-mongodb';
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

/*import * as Collections from 'lib/collections';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
*/
export default function () {

    db.find({}, function (err, docs) {
      if (docs.length === 0) {
        db.insert([
          {label: 'The Lobster', done: false, list: 'WATCH', createdAt: new Date()},
          {label: 'Das Kapital', done: false, list: 'READ', createdAt: new Date()},
          {label: 'Schubert', done: false, list: 'LISTEN', createdAt: new Date()},
       ]);
      }
    });

  return {
    Meteor,
    Accounts,
    Actions,
    db,
    //Collections,
    LocalState: new ReactiveDict()
  };
}

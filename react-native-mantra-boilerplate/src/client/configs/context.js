import Meteor, { Accounts, ReactiveDict } from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import Datastore from 'react-native-local-mongodb';
const db = new Datastore({ filename: '2', autoload: true });

/*import * as Collections from 'lib/collections';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
*/
export default function () {



  return {
    Meteor,
    Accounts,
    Actions,
    db,
    //Collections,
    LocalState: new ReactiveDict()
  };
}

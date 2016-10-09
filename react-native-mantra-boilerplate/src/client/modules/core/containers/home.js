import { useDeps, composeAll } from 'mantra-core';
import { composeWithTracker } from 'react-native-meteor';

import L from '../../core/components/loading';
import E from '../../core/components/error';

import Home from '../components/home';

export const composer = ({context}, onData) => {
  const { Meteor, db } = context();
  db.find({}, (err, items) => {
    if (err) {console.error(err)};
    onData(null, { items });
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: actions.core,
  Actions: context.Actions,
  logout: actions.account.logout
});

export default composeAll(
  composeWithTracker(composer, L, E),
  useDeps(depsMapper)
)(Home);

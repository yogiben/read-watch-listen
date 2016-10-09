export default {
  insert({db}, doc) {
    db.insert(doc, (err, res) => {console.log(err, res);});
  },
  update({db}, label, $set) {
    db.update({label}, {$set});
  },
  remove({db}, label) {
    db.remove({label});
  }
};

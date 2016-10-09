export default {
  insert({db}, doc) {
    db.insert({...doc, createdAt: new Date()}, (err, res) => {console.log(err, res);});
  },
  update({db}, _id, $set) {
    db.update({_id}, {$set});
  },
  remove({db}, _id) {
    db.remove({_id});
  }
};

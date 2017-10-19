var hash = require('./app/models');

var hash_list = [
  {
    hash: 'go home'
  },
  {
    hash: 'come back'
  },
  {
    hash: 'i hate u '
  }
  ]
  // remove all records that match {} -- which means remove ALL records
  console.log(hash);
hash.Hash.remove({}, function(err, hashs){
  if(err) {
    console.log('Error occurred in remove', err);
    return;
  } 

    // create new records based on the array hash_list
    hash.Hash.create(hash_list, function(err, hashs){
      if (err) { return console.log('err', err); }
      console.log("created", hashs.length, "hashs");
    });
  
});

   // hash.create(hash_list, function(err, hashs){
   //    if (err) {console.log('err', err); }
   //    console.log("created", hashs.length, "hashs");
   //  });
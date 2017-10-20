var db = require ('../app/models');


function storeHash (req, res){
  let hashUser_id = parseInt();

  db.hashUser.findById(req.params.id, function (error, detectedHashUser){
    res.json (detectedHashUser);
    detectedHashUser.append();
  });
}

function destroy (req,res){
  let hashUser_id = parseInt();

  db.hashUser.findById(req.params.id, function(error,detectedHashUser){
    res.json (detectedHashUser);
      detectedHashUser.remove();
  });
}

module.exports = {
  storeHash: storeHash,
  destroy: destroy
};

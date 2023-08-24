var branchTable = require('../models/branch');

const addBranch = (req, res) => {
    const { latitude, longitude } = req.body;

    const branch_instance = new branchTable({ latitude, longitude });
    
    branch_instance.save().then(() => {
        branchTable.find().then((docs, err) => {
            res.json(docs);
        });   
    }); 
};

const getBranches = (req, res) => {
    branchTable.find().then((docs, err) => {
            res.json(docs);      
    }); 
};
const deleteBranch = ( req, res ) => {
  const { latitude, longitude } = req.body
  branchTable.deleteOne ( { latitude: latitude, longitude: longitude } ).then ( ( ) => {
    branchTable.find ().then ( ( docs ) => {
      res.json ( docs )
    } )   
  } ) 
}

module.exports = {
    addBranch,
    getBranches,
    deleteBranch,
};
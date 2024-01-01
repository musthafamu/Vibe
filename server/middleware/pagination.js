 

export const pagination=(model)=>{
    return async(req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        const totalDocuments = await model.countDocuments().exec();

        if (endIndex < totalDocuments) {
          results.next = {
            page: page + 1,
            limit: limit
          };
        }
        
    
        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            limit: limit
          };
        }
    
        try{

          results.results = await model.find().limit(limit).skip(startIndex).exec()
          res.paginatedResult = results;
          results.total= totalDocuments;


          
    
        
          next();
        }catch(e){
          res.status(500).json({message:e.message})
        }
      };
}

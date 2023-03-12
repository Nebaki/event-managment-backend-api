class APIfeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }

    Search(){
        const keyword=this.queryStr.keyword?{
            eventName:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{}
        console.log(keyword);

        this.query=this.query.find({...keyword})
        return this;
    }


    Filter(){
        const queryCopy={...this.queryStr}


        //Removing fields from query
        const removefilds=['keyword', 'limit','page'];
        removefilds.forEach(field=>{
            delete queryCopy[field]});
            console.log(queryCopy);



            //Filter for price ,ratind and etc..

            let queryStr=JSON.stringify(queryCopy);
            queryStr=queryStr.replace(/\b(gt|gte|eq|lt|lte)\b/g,match=>`$${match}`);
            
            console.log(queryStr);

            this.query=this.query.find(JSON.parse(queryStr));

            return this;
    }

}


module.exports=APIfeatures;
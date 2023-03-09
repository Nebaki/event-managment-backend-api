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

}


module.exports=APIfeatures;
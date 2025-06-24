class ApiFilter{
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search(){
        const keywords = this.querystr.keywords ? {
            name : {
                $regex: this.querystr.keywords,
                $options: "i"
            }
        }:{}

        this.query = this.query.find({...keywords});
        return this;
    }
}


export default ApiFilter;
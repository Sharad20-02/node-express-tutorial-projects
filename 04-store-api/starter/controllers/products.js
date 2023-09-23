const Product = require('../models/product');

const getAllProductsStatic = async (req,res)=>{
    // throw new Error("testing async errors");
    const search = 'ab';
    const products = await Product.find({price:{ $gt:30, $lt:200 }})
    .sort('price')
    .select('name price');
    res.status(200).json({products,nbHits:products.length});
};

const getAllProducts = async (req,res)=>{
    console.log(req.query);

    const {featured, company, name, sort, fields, numericFilters} = req.query;

    const queryObject = {};

    if(featured){
        queryObject.featured = featured==='true' ? true:false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = { $regex:name, $options:'i' };
    }

    if(numericFilters){
        const operatorMap = {
            '>'  : '$gt'  ,
            '<'  : '$lt'  ,
            '<=' : '$lte' ,
            '>=' : '$gte' ,
            '='  : '$eq'  ,

        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){
                if(!queryObject[field]){
                    queryObject[field] = {[operator]:Number(value)};
                }else{
                    queryObject[field][operator] = Number(value);
                }
                
            }
        }) 
    }

    console.log(queryObject);
    let result = Product.find(queryObject);

    // sort
    if(sort){
        const sortList = sort.split(',').join(' ');
        console.log(sortList);
        result = result.sort(sortList);
    }
    else{
        result = result.sort('createdAt')
    }

    // select
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page-1) * limit;

    result = result.skip(skip).limit(limit);
    // 23
    // 4-pages: 7 7 7 2

    const products = await result
    res.status(200).json({ products,nbHits:products.length });
};

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}
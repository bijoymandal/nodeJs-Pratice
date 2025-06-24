import { body, validationResult } from "express-validator";

const validRequest = async (req, res, next) => {
    /*const { name, price, desc,imageUrl } = req.body;
        let errors=[];
        if(!name || name.trim() === ''){
            errors.push("Name is required");
        }
        if(!price || price.trim() === ''){
            errors.push("Price is required");
        }
        if(!desc || desc.trim() === ''){
            errors.push("Description is required");
        }
        if(!imageUrl ===''){
            errors.push("Image URL is required");
        }
        try{
            const validUrl = new URL(imageUrl);

        }
        catch(err){
            console.log(err);
            errors.push("Image URL is not valid");
        }*/
       //1. Set uo for validation
       const rules = [
        body('name').isEmpty().withMessage('Name is required'),
        body('price').isEmpty().isFloat({gt:0}).withMessage('Price should be a positive number'),
        body('desc').isEmpty().withMessage('Description is required'),
        body('imageUrl').isURL().withMessage('Image URL is Invalid'),
       ];

       //2. Run the validation rules
       await Promise.all(rules.map((rule)=>rule.run(req)));

       //3. check if there are any validation errors
       var errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render("pages/new-product", {
                layout: 'layouts/main',
                title: 'Create Product',
                subTitle: 'Add New Product',
                errorMessage: errors.array()[0].msg,
                // productData: req.body
            });
        }
        next();
}

export default validRequest;
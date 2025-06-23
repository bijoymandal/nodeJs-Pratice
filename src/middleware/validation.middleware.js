

const validRequest = (req, res, next) => {
    const { name, price, desc,imageUrl } = req.body;
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
        }
        if(errors.length > 0){
            return res.render("pages/new-product", {
                layout: 'layouts/main',
                title: 'Create Product',
                subTitle: 'Add New Product',
                errorMessage: errors[0],
                // productData: req.body
            });
        }
        next();
}

export default validRequest;
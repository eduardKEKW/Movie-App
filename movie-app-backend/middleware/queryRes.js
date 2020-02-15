const a = (model, populate) => (req,res,next) => {
    let query = null;

    parsQuery = JSON
        .parse(JSON
        .stringify(req.body.query))
        .replace(/[: +](gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    console.log('PQ',parsQuery);
};
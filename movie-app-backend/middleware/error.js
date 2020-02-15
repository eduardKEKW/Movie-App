module.exports = (err, req, res, next) => {
  console.log(`ERROR_: ${err.message} \n ${err}${err.stack}`.red);

  if(err.name == 'ValidationError'){
    return res.status(400).json({ 
      success: false,
      errors: Object
        .values(err.errors)
        .reduce((acc,e) => (acc[e.path] = e.message, acc),{})
    });
  }

  if(err.name == 'Thrown error'){ 
    return res.status(err.status).json({ 
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({ success: false, message: err.message });
}
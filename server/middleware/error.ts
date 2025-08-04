const errorHandler = (err: any, req: any, res: any) => {
  if(err.status){
    res.status(err.status).json({ Message: err.message });
  } else {
    res.status(500).json({ Message: err.message });
  }
};

export default errorHandler;

const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    })
  }
  next();
}

exports.checkId = (req, res, next, val) => {  
  if (val >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}

exports.getAllTours = (req, res) => {
  // route handler
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;  

  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
};

exports.updateTour = (req, res) => {    
  return res.status(200).json({
    status: 'success',
    data: 'Updated Tour!'
  });
};

exports.deleteTour = (req, res) => {  
  return res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body
  };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};
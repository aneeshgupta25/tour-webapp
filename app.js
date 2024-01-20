const fs = require('fs');
const express = require('express');

const app = express();
// middle-ware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  // route handler
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id;
    if(id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    return res.status(200).json({
        status: 'success',
        data: 'Updated Tour!'
    })
})

app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id;
    if(id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    return res.status(204).json({
        status: 'success',
        data: null
    })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

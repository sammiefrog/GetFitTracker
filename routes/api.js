const express = require("express");
const db = require("../models");

const router = express.Router();

//getting the workouts
router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });

});

//posting a new workout
router.post("/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});

//adding exercises to the workout 'updating'
router.put("/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      { useFindAndModify: false }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
});

//getting workout range for stats page
router.get("/workouts/range", (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(7)
    .then(dbWorkouts => {
        res.json(dbWorkouts)
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;
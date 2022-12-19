// import mongoose from 'mongoose';
// // import workoutList from 'client/src/api/models/workoutListModel.js'
// const WorkoutList = mongoose.model('workoutList', workoutListSchema );
// export const addWorkoutList = (req, res) => {
//     let newWorkoutList = new WorkoutList(req.body);
//     newWorkoutList.save((err, workoutlist) => {
//         if (err) {
//             res.send(err)
//         }
//         res.json(workoutlist)
//     })
// };

// export const getWorkoutList = (req, res) => {
//     addWorkoutList.find({}, (err, workoutlist) => {
//       if (err) {
//         res.send(err)
//       }
//       res.json(workoutlist)
//     })
// }
  

// module.exports = addWorkoutList;
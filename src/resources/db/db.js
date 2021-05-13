// const User = require("../users/user.model");
// const Board = require("../boards/board.model");
// const Column = require("../columns/column.model");
// const Task = require("../tasks/task.model");

const dataBase = {
    users : [],
    boards : [], 
    columns : [],
    tasks : []
}

// const seedDb = (db) => {
//     const user1 = new User({name :'Tony', login :'Tony', password :'Tony1'});
//     const user2 = new User({name : 'Andrew', login : 'Andrew', password : 'Andrew1'});
//     const user3 = new User({name : 'Ann', login : 'Ann', password : 'Ann1'});
//     const user4 = new User({name : 'Kate', login : 'Kate', password : 'Kate1'});
//     const column1 = new Column({title : "column1", order : 0});
//     const column2 = new Column({title : "column2", order : 1});
//     const column3 = new Column({title : "column3", order : 0});
//     const column4 = new Column({title : "column4", order : 1});
//     const board1 = new Board({title : 'Board1', columns : [column1, column4]});
//     const board2 = new Board({title : 'Board2', columns : [column2, column3]});
//     const task1 = new Task({title : 'task1', order : 0, description : 'Lorem ipsum', userId : user2.id, boardId : board1.id, columnId : column1.id});
//     const task2 = new Task({title : 'task2', order : 1, description : 'ipsum Lorem ', userId : user1.id, boardId : board2.id, columnId : column2.id});
//     const task3 = new Task({title : 'task3', order : 1, description : 'ipsum Lorem jo ', userId : user3.id, boardId : board1.id, columnId : column4.id});
//     const task4 = new Task({title : 'task4', order : 0, description : 'ty ipsum Lorem jo ', userId : user4.id, boardId : board2.id, columnId : column3.id});

//     db.users.push(user1, user2, user3, user4);
//     db.boards.push(board2, board2); 
//     db.columns.push(column1, column2, column3, column4);
//     db.tasks.push(task1, task2, task3, task4);
// }

// seedDb(dataBase);

module.exports = dataBase;

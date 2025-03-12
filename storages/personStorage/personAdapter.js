'use strict';

module.exports = function adapt(person) {
    return Object.assign(person,{
        id: +person.id,
        salary: +person.salary
    });
}

//another version
// function adapt(person){
//     return {
//         id:+person.id, //also id:Number(person.id)
//         firstname:person.firstname,
//         lastname:person.lastname,
//         department:person.department,
//         salary:+person.salary
//     }
// }



// if no change is to be made, your adapter just passes person through
// function adapt(person){
//     return person;
// }
const fs = require("fs");
const data = require("../data.json");
const { age, date, grade } = require("../utils");
const Intl = require("intl");


exports.index = function(req,res){

    let students = []

    for(item of data.students) {
        const student = {
            ...item,
            schoolyearn: grade(item.schoolyearn)
        }

        students.push(student)
    }

    return res.render("students/index", { students });
}

exports.create = function(req,res){
    return res.render("students/create");
}


exports.post =  function(req,res){
    const keys = Object.keys(req.body);
    for(key of keys){
        if( req.body[key] == ""){
            return res.send(" Please, fill all field !");
        }
    }

    birth = Date.parse(req.body.birth);
   

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];
    if(lastStudent){
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,
       ...req.body,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!");

        return res.redirect("/students");
    });

}

exports.show = function(req,res){
    const { id } = req.params;

    const foundStundet= data.students.find(function(student){
        return student.id == id;
    });

    if (!foundStundet) return res.send(" Student is not found! ");

    const student = {
        ...foundStundet,
        age: age(foundStundet.birth),
        birthday: date(foundStundet.birth).birthDay,
        schoolyearn: grade(foundStundet.schoolyearn),
    };

    return res.render("students/show", { student });
}

exports.edit = function(req,res){

    const { id } = req.params;

    const foundStundet = data.students.find(function(student){
        return student.id == id;
    });

    if (!foundStundet) return res.send(" Student is not found! ");
    
    const student = {
        ...foundStundet,
        birth:date(foundStundet.birth).iso 
    }

    date(foundStundet.birth);

    return res.render("students/edit",  { student });
}

exports.put = function(req,res){
    const { id } = req.body;
    let index = 0;

    const foundStundet = data.students.find(function(student, foundIndex){
        if( id == student.id ){
            index = foundIndex;
            return true;
        }
    });

    if (!foundStundet) return res.send(" Teacher is not found! ");

    const student = {
        ...foundStundet,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write erro!");

        return res.redirect(`/students/${id}`);
    });

}

exports.delete = function(req,res){
    const { id } = req.body;

    const filteredStudents= data.students.filter(function(student){
        return student.id != id
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send(" Write file error!");

        return res.redirect("/students");
    });
}


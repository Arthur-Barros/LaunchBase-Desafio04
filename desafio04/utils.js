module.exports = {
    age: function (timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 ||
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {

            age = age - 1;
        }
        return age;
    },
    date: function (timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);

        
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            iso: `${day}-${month}-${year}`,
            birthDay: `${day}/${month}`
        }
    },
    graduation: function (degree) {

        if (degree === "medio") {
            return degree = "Ensino Médio Completo";
        }else if  (degree === "completo") {
            return degree = "Ensino Superior Completo";
        } else if (degree === "mestrado") {
            return degree = "Mestrado";
        } else if (degree === "doutorado") {
            return degree = "Doutorado";
        }
    },

    grade: function(schoolyearn){

        if (schoolyearn === "5EF") {
            return schoolyearn = "5º ano Ensino Fundamental";
        } else if (schoolyearn === "6EF") {
            return schoolyearn = "6º ano Ensino Fundamental";
        } else if (schoolyearn === "7EF") {
            return schoolyearn = "7º ano Ensino Fundamental";
        } else if (schoolyearn === "8EF") {
            return schoolyearn = "8º ano Ensino Fundamental";
        } else if (schoolyearn === "9EF") {
            return schoolyearn = "9º ano Ensino Fundamental";
        } else if (schoolyearn === "1EM") {
            return schoolyearn = "1º ano Ensino Médio";
        } else if (schoolyearn === "2EM") {
            return schoolyearn = "2º ano Ensino Médio";
        } else if(schoolyearn === "3EM"){
            return schoolyearn = "3º ano Ensino Médio";
        }
    }
}
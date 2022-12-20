const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");
mongoose.set('strictQuery', false);


// connecting to our database
mongoose.connect('mongodb://localhost:27017/kartikfirst')
    .then(() => console.log('.......Connection Successful'))
    .catch((err) => console.log(err))

// creating schema or skeleton
const usersSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,  // can remove  if Name is not neccessary
        // unique : true   // value should be unique   ..// not a validator (IMP)
        // lowercase : true    //  value will be converted in lowercase
        // uppercase : true
        // trim : true   // remove all spaces from begin and end of input
        // minLength : [5,"custom message"]   // only allowed with String , set min length of value ,also you can set custom error msg
        // maxLength : [20,"custom message"]   // only allowed with String , set max length of value 
        // enum : ["value1" , "value2" , "value3"] // only these values will be allowed as input     

        // custom validation
        // validate(value){
        //    if(value != 'user'){
        //     throw new Error("value cannot be 'user'");
        //    }
        // }
    },
    Password: {
        type: String,
        required: true
    },
    Email_id: {
        type: String,
        required: true,

        validate(value){
            if(!isEmail(value)){
                throw new Error('Email format is not valid');
            }
        },
    }
});

// creating model or collection
const user = new mongoose.model("user", usersSchema);


// function to add userser in given array
const createUsers = async (userlist) => {
    try {
        let people = [];
        for (let i = 0; i < userlist.length; i++) {

            people[i] = new user({
                Name: userlist[i].name,
                Password: userlist[i].password,
                Email_id: userlist[i].email,
            })
        }

        const results = await user.insertMany(people);
        console.log(results);
    }
    catch (err) {
        console.log(err);
    }
};

//   documents with fields

// let user1 = {
//     name : 'john snow',
//     password : 'nightwatch',
//     email : 'johnsnow98@gmail.com'
// }


// let user2 = {
//     name : 'tywin lanister',
//     password : 'alwayspay',
//     email : 'lanishter98@gmail.com'
// }


// let user3 = {
//     name : 'king',
//     password : 'peiceofshit',
//     email : 'king98@gmail.com'
// }

// let userlist = [user1,user2,user3];
// createUsers(userlist);


// ***************************{READING DOCUMENTS}*************************

const getDocument = async ()=>{
  let users = await user.find({Name : 'john snow'})
  .select({Name:1});
  console.log(users);
}

// getDocument();


// *******************************{Logical Operator}******************************

const getDocumentADV = async ()=>{
    let users = await user.find({ 
        // $or : [ {Name : 'user1'} , {Email_id : 'email3'} ]  // attach to filter database and get only contrained result
    }  
    // , {_id : false , Name : true} // attach only for filtering result , actual result contain all info , with this we can filter which to show
    ) 
    // .countDocuments();  // attach if we only need count , no details
    //  .sort({Name : 1});   // attach for sorting according to feild , 1 for acsending and -1 for descending
    console.log(users);
}

// getDocumentADV();


// ********************{updating documents}**********************


const updateDocument = async (curname,name)=>{
    const person = await user.find({Name : curname}).limit(1);  // first find the user we want to change

    let personup = await user.updateOne({_id : person[0]._id} ,  //tell update funtion for 
        { $set : {Name : name} }
        );

    console.log(personup);
}



// updateDocument('user2',"Monica Gellar");  // updating user name


// ********************{deleting documents}**********************


const deleteDocument = async (name)=>{
    const person = await user.find({Name : name}).limit(1);  // first find the user we want to change

    let personup = await user.deleteOne({_id : person[0]._id}) // delete with id = person[0]._id

    console.log(personup);
}



// deleteDocument('Monica Gellar');  // deleting user name


// createUsers([
//     {
//         name : 'newUser',
//         password : 'realpassword',
//         email : 'kartikhatwar98@gmail.com',
//     }
// ]);
const firebaseConfig = require("../config/firebase"); // Import firebase configuration

const login = async (req, res) => {
    console.log("logginnnnnnnnnn");
    const { body } = req;
    const email = body.email;
    const password = body.password;
    console.log(body);
    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        // firebase auth using firebase core modules
        const userCredential = await firebaseConfig.firebase.auth().signInWithEmailAndPassword(email, password);
        const name = userCredential.user.displayName;
        const userId = userCredential.user.uid;
        const photoUrl = userCredential.user.photoUrl;
        // Access the access token
        const token = await userCredential.user.getIdToken();
        console.log("log in");
        res.status(200).json({
            message: "success login",
            loginResult: {
                userId,
                name,
                photoUrl,
                token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to login",
            error
        });
    }
};

// CREATE a new user
const register = async (req, res) => {
    const { body } = req;
    const name = body.name;
    const email = body.email;
    const password = body.password;
    
    console.log(body);
    
    if (typeof email !== "string" || email.trim().length === 0) {
        console.log(email);
        throw new Error("Invalid email");
    }

    try {
        if (email) {
            // Create user account in Firebase Authentication using firebase-admin
            const userRecord = await firebaseConfig.admin.auth().createUser({
                email,
                password,
                displayName: name
            });
            const firebase_uid = userRecord.uid; // take firebase_uid to store into mysql
            console.log(firebase_uid);
            // add new user data into mysql
            // await UsersModel.createNewUserWhenRegister(firebase_uid, name, email);
            console.log("success");
            res.status(200).json({
                message: "success regist",
                user: userRecord.toJSON()
            });
        
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create user",
            serverMessage: error
        });
    }
};


module.exports = {
    login,
    register,
};
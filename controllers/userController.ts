import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  
  let user = userModel.findOne(email);
  
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    } else {
      throw new Error("Incorrect password");
    }
  }
  return null;
};

const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: Express.User, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};

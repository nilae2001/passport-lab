import { Profile } from "passport";

const database: Express.User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  }
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  
  findById: (id: number) => {
    const user = database.find((user) => user.id === Number(id));
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findOrCreate: (profile: Profile) => {
    const githubId = parseInt(profile.id);

    const user = database.find((user) => user.id === githubId)

    if (!user) {
      const newUser: Express.User = {
        id: parseInt(profile.id),
        name: profile.displayName,
        role: "user"
    }


    database.push(newUser);
    
    } else {
      return user
    }
  }

  
};

export { database, userModel };

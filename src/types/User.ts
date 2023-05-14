// [
//     {
//       "id": 1,
//       "email": "john@mail.com",
//       "password": "changeme",
//       "name": "Jhon",
//       "role": "customer",
//       "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=867",
//     },
//     // ...
//   ]

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin"
    avatar: string;
    }


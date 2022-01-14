// export default function authHeader() {
//   let user = JSON.parse(localStorage.getItem('user'));
//
//   if (user && user.accessToken) {
//     return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
//     // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
//   } else {
//     return {};
//   }
// }


export default function authHeader() {
  return  {
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }
}


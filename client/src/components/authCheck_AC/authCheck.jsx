// auth.js
export const AuthAdmin = () => {
  const userData = localStorage.getItem("username"); // Assuming you're storing user info in localStorage
  const AuthCheck = localStorage.getItem("AdminCheck"); // Assuming you're storing user info in localStorage

  // if (userData && AuthCheck) {
  //   return true; // User is an admin
  // } else {
  //   return false; // User is not an admin
  // }
  return userData && AuthCheck;
};

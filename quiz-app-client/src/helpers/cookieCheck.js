const cookieCheck = () => {
  const cookies = document.cookie.split(";");
  const fooCookie = cookies.find(function (cookie) {
    return cookie?.split("=")[0] === "jwt";
  });
  const jwt = fooCookie?.split("=")[1];
  console.log(jwt,cookies);
  if (jwt) return true;
  else return false;
};


export default cookieCheck;
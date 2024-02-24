const cookieCheck = () => {
  const cookies = document.cookie.split(";");
  const fooCookie = cookies.find(function (cookie) {
    return cookie?.split("=")[0].trim() === "jwt" ;
  });
  const jwt = fooCookie?.split("=")[1];
  console.log("cookiess:",jwt, cookies);
  if (jwt) {
    console.log("cookie found");
    return true;
  } else {
    console.log("cookie not found");

    return false;
  }
};

export default cookieCheck;

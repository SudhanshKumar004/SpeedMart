import { createContext, useState } from "react";

const MyContext = createContext();

const LoginContext = ({ children }) => {
  const [logedIn, setLogedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [searchproduct, setSearchproduct] = useState([]);
  const [customerImage, setCustomerImage] = useState(false);

  return (
    <>
      <MyContext.Provider
        value={{
          logedIn,
          setLogedIn,
          userName,
          setUserName,
          userEmail,
          setUserEmail,
          searchdata,
          setSearchdata,
          searchproduct,
          setSearchproduct,
          customerImage,
          setCustomerImage,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext };
export default LoginContext;

import { useState, useEffect, createContext } from "react";

const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  // Hooks
  const [auth, setAuth] = useState(null);
  const checkRoleAccess = (role) => {
    if ("Subscriber" === role.toString()) return true;
    return false;
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RoleContext.Provider value={[checkRoleAccess]}>
      {children}
    </RoleContext.Provider>
  );
};
export { RoleContext, RoleProvider };

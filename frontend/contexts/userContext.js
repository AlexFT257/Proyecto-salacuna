import { useContext, createContext, useState } from "react";

//Context
export const UserContext = createContext({});

//Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
};

//Consumer
export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    return { user, setUser };
};

export default { UserContext, UserProvider, useUser};

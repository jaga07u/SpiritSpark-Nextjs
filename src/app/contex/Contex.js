import {createContext,useContext} from "react"


export const AppContext=createContext({});


export default function useApp(){
    return useContext(AppContext);
}
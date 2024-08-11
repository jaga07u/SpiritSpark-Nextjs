import { create } from 'zustand'

const useStore = create((set) => ({
  theme: "dark",
  currUser:{},
  ThemeChange: () => set((state) => ({ theme: state.theme === "dark"?"light":"dark"})),
  updateUser:(user)=>set((state)=>{currUser:user})
}))

export default useStore;
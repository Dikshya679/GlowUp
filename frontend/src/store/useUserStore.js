import { create } from 'zustand';
const useUserStore= create((set)=>({
    email:localStorage.getItem("email"),
    profilePic:localStorage.getItem("profilePic"),
    skinTone:localStorage.getItem("skinTone"),
    skinType:localStorage.getItem("skinType"),
    skinConcerns:localStorage.getItem("skinConcerns"),
    isLoggedIn:localStorage.getItem("isLoggedIn"),
    setUserData: (data)=>{
    Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
    });
    set((state)=>({
        ...state,
        ...data,
    }))
    },
    logout: () => {
    localStorage.clear();
    set({ username: "User", email: "", profilePic: null, isLoggedIn: false });
  },
}));
export default useUserStore;


 
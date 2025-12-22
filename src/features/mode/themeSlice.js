import { createSlice } from "@reduxjs/toolkit";

const getinialTheme =()=>{
  const savedTheme=localStorage.getItem("theme")
  if(savedTheme)return savedTheme;

   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;
   return mediaQuery?"dark":"light"

}


const initialState={
  // mode: localStorage.getItem("theme")||"light"
  mode:getinialTheme()
}

const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers:{
    themeToggler:(state)=>{
    state.mode=state.mode ==="light" ? "dark":"light";
    localStorage.setItem("theme",state.mode)
    },
    setTheme:(state,action)=>{
        state.mode=action.payload;
        localStorage.setItem("theme",state.mode);
    }
  }
  
})

export const  {themeToggler,setTheme}=themeSlice.actions;
export default themeSlice.reducer;
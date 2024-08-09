import {createSlice} from "@reduxjs/toolkit"

export interface ThemeSlice {
    theme : string;
}
const initialState : ThemeSlice = {
    theme : "dark"
}

const themeSlice = createSlice ({
    name : "theme",
    initialState,
    reducers:{
        setTheme(state,action){
state.theme = action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer
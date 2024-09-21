import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



type DataClear = {
    LastPlayed: true | false
    FavList: true | false
    Playlist: true | false

}

const ClearData: DataClear = {
    LastPlayed: true,
    FavList: true,
    Playlist: true

};

export const ClearLastPlayed = createAsyncThunk<
    any,
    any,
    { rejectedMeta?: String }
>("ClearLastPlayed", async (arg, AsyncThunk) => {

    const { rejectWithValue } = AsyncThunk
    try {
        const Data = await axios({
            method: "patch",
            url: `http://localhost:3000/users/${arg}`,
            data: {
                LastPlayed: []
            }
        })
        return Data.data

    }
    catch (e) {
        console.log(rejectWithValue(e));

    }
})
export const ClearFavList = createAsyncThunk<
    any,
    any,
    { rejectedMeta?: String }
>("ClearFavList", async (arg, AsyncThunk) => {
    const { rejectWithValue } = AsyncThunk
    try {
        const Data = await axios({
            method: "patch",
            url: `http://localhost:3000/users/${arg}`,
            data: {
                favList: []
            }
        })
        return Data.data

    }
    catch (e) {
        console.log(rejectWithValue(e));

    }
})

export const ClearPlaylist = createAsyncThunk<
    any,
    any,
    { rejectedMeta?: String }
>("ClearPlaylist", async (arg, AsyncThunk) => {
    const { rejectWithValue } = AsyncThunk
    try {
        const Data = await axios({
            method: "patch",
            url: `http://localhost:3000/users/${arg}`,
            data: {
                PlayList: {}
            }
        })
        return Data.data

    }
    catch (e) {
        console.log(rejectWithValue(e));

    }
})




export const Clear = createSlice({
    name: "Clear",
    initialState: ClearData,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(ClearLastPlayed.pending, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })
        builder.addCase(ClearLastPlayed.fulfilled, (state) => {
            state.LastPlayed = !state.LastPlayed
        })
        builder.addCase(ClearLastPlayed.rejected, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })


        builder.addCase(ClearFavList.pending, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })
        builder.addCase(ClearFavList.fulfilled, (state) => {
            state.FavList = !state.FavList
        })
        builder.addCase(ClearFavList.rejected, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })



        builder.addCase(ClearPlaylist.pending, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })
        builder.addCase(ClearPlaylist.fulfilled, (state) => {
            state.Playlist = !state.Playlist
        })
        builder.addCase(ClearPlaylist.rejected, (_state) => {
            // state.LastPlayed = !!state.LastPlayed
        })
    }

});




export const ClearedData = Clear.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: [
        {
            id: "1",
            url: "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600",
            description: "Image 1",
            likes: 0,
            likedByUser: false,
            comments: [],
        },
        {
            id: "2",
            url: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=600",
            description: "Image 2",
            likes: 0,
            likedByUser: false,
            comments: [],
        },
        {
            id: "3",
            url: "https://wallpapercrafter.com/th800/246152-a-snow-topped-mountain-near-shady-woods-in-yellows.jpg",
            description: "Image 3",
            likes: 0,
            likedByUser: false,
            comments: [],
        },
        {
            id: "4",
            url: "https://wallpapercrafter.com/th800/237065-an-empty-tree-lined-road-near-snow-topped-mountain.jpg",
            description: "Image 4",
            likes: 0,
            likedByUser: false,
            comments: [],
        },
    ],
};

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const image = state.images.find((img) => img.id === action.payload);
            if (image) {
                image.likedByUser = !image.likedByUser;
                image.likes += image.likedByUser ? 1 : -1;
            }
        },
        addComment: (state, action) => {
            const image = state.images.find((img) => img.id === action.payload.id);
            if (image) {
                image.comments.push(action.payload.comment);
            }
        },
    },
});

export const { toggleLike, addComment } = gallerySlice.actions;
export default gallerySlice.reducer;

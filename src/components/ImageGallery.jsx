import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike, addComment } from "../redux/slices/gallerySlice";

const ImageGallery = () => {
    const images = useSelector((state) => state.gallery.images);
    const dispatch = useDispatch();

    const handleLike = (id) => {
        dispatch(toggleLike(id));
    };

    const handleAddComment = (id, comment) => {
        const newComment = { user: "User Name", text: comment };
        dispatch(addComment({ id, comment: newComment }));
    };

    const handleKeyDown = (e, id) => {
        if (e.key === "Enter") {
            handleAddComment(id, e.currentTarget.value);
            e.currentTarget.value = "";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Image Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={image.url} alt={image.description} className="rounded mb-4 w-full h-48 object-cover" />
                        <button
                            onClick={() => handleLike(image.id)}
                            className={`w-full py-2 mb-2 text-white font-semibold rounded ${image.likedByUser ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {image.likedByUser ? "Unlike" : "Like"}
                        </button>
                        <div className="mb-2">Likes: {image.likes}</div>
                        <div className="space-y-2">
                            {image.comments.map((comment, index) => (
                                <p key={index} className="bg-gray-100 p-2 rounded">
                                    <strong>{comment.user}:</strong> {comment.text}
                                </p>
                            ))}
                            <input
                                type="text"
                                placeholder="Add a comment"
                                onKeyDown={(e) => handleKeyDown(e, image.id)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;

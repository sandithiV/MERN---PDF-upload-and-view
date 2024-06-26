import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBook.css";
import axios from 'axios';

export default function CreateBook() {
    const navigate = useNavigate();

    // State variables for form inputs
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [language, setLanguage] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [bookFile, setBookFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to store the form data and files
        const formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('authorName', authorName);
        formData.append('language', language);
        formData.append('category', category);
        formData.append('image', imageFile);
        formData.append('bookFile', bookFile);
    
        try {
            // Send the form data to the backend
            const response = await axios.post('/api/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Book created successfully:', response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error('Error creating book:', error);
            // Handle error
        }
    };
        

    return (
        <div className="create-book-container">
            <h1>Create New Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bookName">Book's Name:</label>
                    <input type="text" id="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="authorName">Author's Name:</label>
                    <input type="text" id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language:</label>
                    <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} required>
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Hindi">Hindi</option>
                        {/* Add more language options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Mysterious">Mysterious</option>
                        <option value="Detective">Detective</option>
                        <option value="Novel">Novel</option>
                        <option value="Short Stories">Short Stories</option>
                        <option value="Educational">Educational</option>
                        {/* Add more category options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
                </div>
                <div className="form-group">
                    <label htmlFor="bookFile">Upload Book (PDF):</label>
                    <input type="file" id="bookFile" accept=".pdf" onChange={(e) => setBookFile(e.target.files[0])} required />
                </div>
                <button type="submit">Upload Book</button>
            </form>
        </div>
    );
}

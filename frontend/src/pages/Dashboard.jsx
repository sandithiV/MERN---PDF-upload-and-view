import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { FaAngleDown, FaAngleUp, FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [])

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <div className="user-info">
                    {user && (
                        <div className="user-greeting">
                            <span>Hi, {user.firstname}!</span>
                        </div>
                    )}
                    <div className="dropdown">
                        <button className="dropdown-toggle" onClick={handleToggleDropdown}>
                            {showDropdown ? <FaAngleUp /> : <FaAngleDown />}
                        </button>
                        {showDropdown && (
                            <div className="dropdown-content">
                                <ul>
                                    <li>Update Profile</li>
                                    <li>Logout</li>
                                    {/* Add additional action items as needed */}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="content-wrapper">
                <div className="profile-container">
                    <img src="../assets/pngtree-girl-reading-a-book-in-hand-image_1138567.jpg" alt="Profile" />
                    <div className="profile-text">
                        <h2>This is your user dashboard!</h2>
                        <p>Reading is a passion</p>
                    </div>
                </div>
                <div className="books-container">
                    <h2 className="section-title">My Books</h2>
                    <div className="book-list">
                        {books.map((book) => (
                            <div key={book._id} className="book-card">
                                <img src={`/uploads/${book.imageFile}`} alt={book.bookName} />
                                <h3>{book.bookName}</h3>
                                <Link to={`/read/${book._id}`}>
                                    <FaFilePdf /> Read PDF
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="upload-link">
                        <Link to="/create">Upload New Book</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
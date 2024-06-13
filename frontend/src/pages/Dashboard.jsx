import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { FaAngleDown, FaAngleUp, FaFilePdf } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            // Remove the JWT token from the browser's cookies
            await axios.get("/api/logout", { withCredentials: true });

            // Remove user data from the context or state
            setUser(null);

            // Navigate to the home page
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
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
                                    <li onClick={handleLogout}>Logout</li>
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
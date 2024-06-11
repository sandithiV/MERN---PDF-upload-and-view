import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Dashboard.css";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
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
            <div className="content-container">
                <div className="profile-info">
                    <img src="profile-image.jpg" alt="Profile" />
                    <div className="profile-text">
                        <h2>{user && `${user.firstname}'s Profile`}</h2>
                        <p>User bio or description goes here.</p>
                    </div>
                </div>
                <h2 className="section-title">My Books</h2>
                {/* Add book cards list here */}
                <div className="book-list">
                    {/* Example book card */}
                    <div className="book-card">
                        <img src="book-image.jpg" alt="Book" />
                        <h3>Book Title</h3>
                        <p>Book description goes here.</p>
                        <a href="#">Read more</a>
                    </div>
                    {/* Add more book cards as needed */}
                </div>
                <div className="upload-link">
                <Link to="/create">Upload New Book</Link> {/* Use Link component */}
                </div>
            </div>
        </div>
    );
}

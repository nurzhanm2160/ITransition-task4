import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white font-bold text-xl">Users App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/registration" className="text-white hover:text-gray-300">
                                Registration
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
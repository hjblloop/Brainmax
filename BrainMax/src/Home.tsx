//import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGong = () => {
        navigate('/gong');
    };

    const handleLearn =() => {
        navigate('/LEARN');
    };

    const handleLessonPlan = () => {
        navigate('/LessonPlan');
    };

    // const handleAccountCreation = () => {
    //     navigate('/AccountCreation');
    // }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="Home">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow z-50 flex items-center px-8 h-16">
                <div className="flex space-x-8">
                    <Link to="/" className="hover:underline font-bold">Home</Link>
                    <Link to="/LessonPlan" className="hover:underline">Lesson Plan</Link>
                    <Link to="/LEARN" className="hover:underline">Learn</Link>
                    <Link to="/gong" className="hover:underline">Gong</Link>
                </div>
            </nav>
            <div className="pt-20">
                <div className="text-7xl text-blue-700 font-bold">
                    THIS PAGE IS BEING REVAMPED
                </div>
                <button 
                    onClick={handleLogout}
                    className="border-2 rounded bg-orange-100 cursor-pointer text-4xl mt-6 px-1 py-1 max-w-md">
                    Logout
                </button>
                <div className="Home-header">
                    <h1>The world is complicated. Let's make it simpler one lesson at a time.</h1>
                    <div className="Home-Content">
                        <button 
                            className="border-2 rounded bg-orange-100 cursor-pointer text-4xl mt-6 px-1 py-1 max-w-md" 
                            onClick={handleGong}>
                            Let's start Learning
                        </button>
                    </div>
                    <div className="Learn-Content">
                        <button 
                            className="border-2 rounded bg-orange-100 cursor-pointer text-4xl mt-6 px-1 py-1 max-w-md" 
                            onClick={handleLearn}>
                            What did you LEARN
                        </button>
                    </div>
                    <div className="Lesson-Content">
                        <button 
                            className="border-2 rounded bg-orange-100 cursor-pointer text-4xl mt-6 px-1 py-1 max-w-md" 
                            onClick={handleLessonPlan}>
                            Lesson Plan
                        </button>
                    </div>
                    {/* <div className="Account-Creation-Content">
                        <button className="AccountCreationButton" onClick={handleAccountCreation}>Create Account</button>
                    </div> */}
                </div>
                {/* Contact Section */}
                <section id="contact" className="py-20 px-8 sm:px-20">
                    <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
                    <form className="max-w-lg mx-auto space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Send Message
                    </button>
                    </form>
                </section>
                {/* Footer */}
                <footer className="py-6 text-center bg-gray-300 dark:bg-gray-700">
                    <p className="text-sm">
                    © {new Date().getFullYear()} Jonathan. All rights reserved.
                    </p>
                </footer>
            </div>
            
        </div>
    )
}

export default Home;
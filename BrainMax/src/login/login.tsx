import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SERVER_URL from '../../config.ts';
import ContactMe from '../ContactMe.tsx';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                console.log("logged in");
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            } 
        } catch (error) {
            setError('Server error');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex flex-col max-h-screen w- full items-center">
            <div className="w-full max-w-xs flex flex-col">
                <input type="text" onChange={handleUsernameChange} placeholder="Username" className="mb-2 p-2 border rounded"/>
                <input type="password" onChange={handlePasswordChange} placeholder="Password" className="mb-2 p-2 border rounded"/>
                <button 
                    onClick={handleLogin} 
                    className="bg-blue-600 text-white px-4 py-2 rounded cursoer-pointer" >
                    Login
                </button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
            <ContactMe />
        </div>
    );
};

export default LoginPage;
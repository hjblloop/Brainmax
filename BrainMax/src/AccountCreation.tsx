import {useState} from 'react';
import SERVER_URL from './config';

const AccountCreation = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SERVER_URL}/api/create_account`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                alert('Error creating account: ' + response.statusText);
            }
            alert('Account Created!');
        } catch (error) {
            console.error('Error creating account: ', error);
            alert('Error creating account');
        }
        console.log('Account Created:', formData);
        alert('Account Created!');
    };

    return (
        <div className="AccountCreation">
            <h1>Create Your Account</h1>
            <form onSubmit={handleSubmit} className="AccountCreation-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passworld">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default AccountCreation;
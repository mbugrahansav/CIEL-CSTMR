import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // CSS dosyasını içe aktar

const ForgotPassword = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put('http://localhost:8080/users/1154', {
                fullname,
                username,
                password: newPassword,
            });
            setMessage('Şifre başarıyla güncellendi!');
        } catch (error) {
            console.error(error);
            setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-box">
                <h2>Forgot Your Password?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={fullname}
                        placeholder="Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        value={newPassword}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit"> Reset Password</button>
                </form>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;

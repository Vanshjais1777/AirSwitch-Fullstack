import React, { useState } from 'react'

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            // Call backend to send OTP
            const response = await fetch("/api/send-opt", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setOtpSent(true);
                setMessage('OTP sent to your email');
            }
            else {
                setMessage('Failed to send OTP');
            }
        } catch (error) {
            setMessage('Error sending OTP');
        }

    };

    const handleResetPassword = async () => {
        try {
            // Call backend to verify OTP and reset password
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            if (response.ok) {
                setMessage('Password reset successfully');
            }
            else {
                setMessage('Invalid OTP or Failed to reset password');
            }
        }
        catch (error) {
            setMessage('Error resetting password');
        }
    };


    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center gap-4">
                {!otpSent ? (
                    <>
                        <h2 className="text-2xl font-bold">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        >
                            Send OTP
                        </button>
                        {message && <p className="text-red-500">{message}</p>}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold">Reset Password</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        >
                            Reset Password
                        </button>
                        {message && <p className="text-red-500">{message}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
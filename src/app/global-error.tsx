'use client';

import React from 'react';
import BotAsset from '../../public/assets/error/image.png';
import Image from 'next/image';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const handleGoHome = () => {
        // Redirect the user to the home page
        window.location.href = '/';
    };

    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0 }}>
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        padding: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Image
                        src={BotAsset}
                        alt="Error Bot"
                        style={{ width: '150px', height: '150px', marginBottom: '20px' }}
                    />
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                        Oops! Something went wrong.
                    </h1>
                    <p
                        style={{
                            fontSize: '1.1rem',
                            color: '#555',
                            marginBottom: '30px',
                            maxWidth: '500px',
                        }}
                    >
                        We’re sorry, but an unexpected error occurred. Please click below to return to the
                        home page.
                    </p>
                    <button
                        onClick={handleGoHome}
                        style={{
                            padding: '12px 24px',
                            fontSize: '1rem',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Go Back Home
                    </button>
                </div>
            </body>
        </html>
    );
}

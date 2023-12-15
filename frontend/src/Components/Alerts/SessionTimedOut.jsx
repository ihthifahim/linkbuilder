import React, { useState, useEffect } from 'react';

export default function SessionTimedOut() {
    const [isAlertVisible, setAlertVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAlertVisible(false);
        }, 3000);

        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {isAlertVisible && (
                <div className="fixed bottom-8 right-8 z-50">
                    <div role="alert" className="rounded-xl border border-red-300 p-4 bg-red-200">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <strong className="block font-medium text-red-700">
                                    Your session timed out. Please login again.
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

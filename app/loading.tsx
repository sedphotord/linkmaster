import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-4">
            <div className="relative flex flex-col items-center animate-pulse">
                <img src="/logoLinkMaster.svg" alt="Loading..." className="w-16 h-16 mb-4" />
                <h1 className="text-2xl font-black tracking-tighter text-gray-900"> LinkMaster </h1>
            </div>
        </div>
    );
}

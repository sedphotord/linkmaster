import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Share2, Palette, Image as ImageIcon } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { createPortal } from 'react-dom';

interface QRModalProps {
    profile: UserProfile;
    isOpen: boolean;
    onClose: () => void;
}

export default function QRModal({ profile, isOpen, onClose }: QRModalProps) {
    const [color, setColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [showLogo, setShowLogo] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        // Update QR URL when colors change
        const c = color.replace('#', '');
        const bg = bgColor.replace('#', '');
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(`https://linkmaster.app/${profile.username}`)}&color=${c}&bgcolor=${bg}&margin=10&ecc=H`); // High Error Correction for Logo
    }, [color, bgColor, profile.username]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const qrImg = new Image();
        qrImg.crossOrigin = "Anonymous";
        qrImg.src = qrUrl;

        qrImg.onload = () => {
            canvas.width = 1000;
            canvas.height = 1000;
            ctx.drawImage(qrImg, 0, 0);

            if (showLogo && profile.avatar) {
                const logoImg = new Image();
                logoImg.crossOrigin = "Anonymous";
                logoImg.src = profile.avatar; // This might fail if CORS is not configured on avatar source

                logoImg.onload = () => {
                    drawLogo(ctx, logoImg);
                    downloadCanvas(canvas);
                };
                logoImg.onerror = () => {
                    // Fallback if logo fails (CORS)
                    console.warn("Could not load logo for canvas (CORS?)");
                    downloadCanvas(canvas);
                }
            } else {
                downloadCanvas(canvas);
            }
        };
    };

    const drawLogo = (ctx: CanvasRenderingContext2D, logo: HTMLImageElement) => {
        const size = 200; // 20% of 1000
        const x = (1000 - size) / 2;
        const y = (1000 - size) / 2;

        // Draw circle background
        ctx.beginPath();
        ctx.arc(500, 500, size / 2 + 10, 0, 2 * Math.PI);
        ctx.fillStyle = bgColor;
        ctx.fill();

        // Draw logo
        ctx.save();
        ctx.beginPath();
        ctx.arc(500, 500, size / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logo, x, y, size, size);
        ctx.restore();
    };

    const downloadCanvas = (canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = `qrcode-${profile.username}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    if (!isOpen) return null;
    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Share2 size={18} className="text-[#502274]" />
                        Compartir Perfil
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Preview Area */}
                    <div className="relative aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 mx-auto w-64 shadow-inner overflow-hidden">
                        <img
                            src={qrUrl}
                            alt="QR Code"
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                        {showLogo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[20%] h-[20%] rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white overflow-hidden">
                                    <img src={profile.avatar} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* customization Control */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                <Palette size={14} /> Color
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-sm"
                                />
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={e => setBgColor(e.target.value)}
                                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                <ImageIcon size={14} /> Incluir Logo
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={showLogo} onChange={e => setShowLogo(e.target.checked)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#502274]"></div>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full bg-[#1e2330] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                    >
                        <Download size={18} /> Descargar QR
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        linkmaster.app/{profile.username}
                    </p>
                </div>
            </div>
            {/* Invisible canvas for generation */}
            <canvas ref={canvasRef} className="hidden" />
        </div>,
        document.body
    );
}

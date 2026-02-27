import { LogOut, X } from "lucide-react";

interface LogOutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogOutModal({ isOpen, onConfirm, onCancel }: LogOutModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={onCancel}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative z-10 w-[90%] max-w-sm bg-[#0C1221] border border-white/10 rounded-2xl p-6 shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-5 mx-auto">
                    <LogOut size={22} className="text-red-400" />
                </div>

                {/* Text */}
                <h2 className="text-lg font-bold text-center text-white mb-1">Are you sure you want to logout?</h2>
                <p className="text-sm text-slate-400 text-center mb-6">
                    You'll need to sign in again to access your dashboard.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 transition-all cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

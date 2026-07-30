import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props;

    return (
        <>
            {flash.success && (
                <div className="mb-6 rounded-lg border border-green-300 bg-green-100 px-4 py-3 text-green-700">
                    ✅ {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="mb-6 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-700">
                    ❌ {flash.error}
                </div>
            )}
        </>
    );
}
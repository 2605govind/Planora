import { useState } from "react";
import { Bell, X } from "lucide-react";
import { useGet } from "../hooks/useGet.js";
import dayjs from "dayjs";

export default function Notification() {
    const [isOpen, setIsOpen] = useState(false);

    const { data: refundReq, error: refundReqError, isLoading, refetch } = useGet('/api/user/refund');
    const refundRequests = refundReq?.data || [];

    return (
        <div className="">

            <div className="cursor-pointer text-white">
                <Bell size={20} onClick={() => setIsOpen(true)} />
            </div>


            {isOpen && (
                <div className="fixed inset-0  bg-opacity-50 flex items-start justify-center z-50">

                    <div className="bg-gray-800/90 w-4/5 max-w-3xl rounded-2xl shadow-2xl relative p-6 border border-gray-700 mt-20">


                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-blue-400 transition"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Notifications</h2>
                       <div className="space-y-4">
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <ClipLoader size={40} color="#3B82F6" />
                                    </div>
                                ) : refundRequests?.length ? (
                                    refundRequests.map((refundReq, index) => (
                                        <div
                                            key={refundReq.id}
                                            className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-md hover:shadow-blue-500/20 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-blue-400">
                                                   Refund {refundReq?.paymentMethod?.toUpperCase()}
                                                </h3>
                                                <span
                                                    className={`px-3 py-1 text-sm rounded-full font-medium 
                    ${refundReq?.status === 'COMPLETED'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : refundReq?.status === 'PENDING'
                                                                ? 'bg-yellow-500/20 text-yellow-400'
                                                                : 'bg-red-500/20 text-red-400'
                                                        }`}
                                                >
                                                    {refundReq?.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                                                <p><strong className="text-gray-400">Plan Name:</strong> {refundReq?.Plan?.name}</p>
                                                <p><strong className="text-gray-400">Price:</strong> {refundReq?.amount}$</p>
                                                <p><strong className="text-gray-400">Date:</strong> {dayjs(refundReq?.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-400 mt-16">
                                        <p>No Refund found</p>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
}

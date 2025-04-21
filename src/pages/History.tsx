import React, { useState } from 'react';
import moment from 'moment';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { API_ENDPOINTS } from '../constants/Api';
import useFetch from '../hooks/useFetch';

// Define types
interface SensorData {
    id: string;
    feedName: string;
    timestamp: string;
    numericValue: number;
}

interface PaginationInfo {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

interface ApiResponse {
    code: number;
    message: string;
    result: {
        content: SensorData[];
        pageable: {
            pageNumber: number;
            pageSize: number;
        };
        totalPages: number;
        totalElements: number;
        size: number;
        number: number;
        first: boolean;
        last: boolean;
    };
}

const History: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(20);
    const [selectedFeedName, setSelectedFeedName] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Build API URL with query params
    let apiUrl = `${API_ENDPOINTS.SENSOR_DATA}?page=${page}&size=${pageSize}`;
    if (selectedFeedName) {
        apiUrl += `&feedName=${selectedFeedName}`;
    }

    const { data, error, loading } = useFetch<ApiResponse>(apiUrl, {
        headers: {
            Authorization: localStorage.getItem('token') 
                ? `Bearer ${localStorage.getItem('token')}` 
                : undefined,
        },
    });

    // Extract sensor data and pagination info
    const sensorData = data?.result?.content || [];
    const pagination: PaginationInfo = {
        pageNumber: data?.result?.pageable?.pageNumber || 0,
        pageSize: data?.result?.pageable?.pageSize || pageSize,
        totalPages: data?.result?.totalPages || 0,
        totalElements: data?.result?.totalElements || 0,
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Handle feed filter change
    const handleFeedChange = (feedName: string | null) => {
        setSelectedFeedName(feedName);
        setIsDropdownOpen(false);
        setPage(0); // Reset to first page when filter changes
    };

    // Get unique feed names from data
    const uniqueFeedNames = Array.from(new Set(sensorData.map(item => item.feedName)));

    // Format timestamp for display
    const formatTimestamp = (timestamp: string) => {
        return moment(timestamp).format('DD/MM/YYYY HH:mm:ss');
    };

    // Get appropriate badge color based on feed name
    const getBadgeVariant = (feedName: string) => {
        if (feedName.includes('temperature')) return 'bg-red-500 text-white';
        if (feedName.includes('humidity')) return 'bg-blue-500 text-white';
        if (feedName.includes('light')) return 'bg-yellow-500 text-white';
        if (feedName.includes('soil')) return 'bg-green-500 text-white';
        if (feedName.includes('water')) return 'bg-blue-600 text-white';
        return 'bg-gray-500 text-white';
    };

    // Get a human-readable label for the feed name
    const getFeedLabel = (feedName: string) => {
        switch (feedName) {
            case 'input-temperature':
                return 'Nhiệt độ';
            case 'input-humidity':
                return 'Độ ẩm';
            case 'input-light':
                return 'Cường độ ánh sáng';
            case 'input-soil-moisture':
                return 'Độ ẩm đất';
            case 'output-water-pumps':
                return 'Máy bơm nước';
            default:
                return feedName;
        }
    };

    // Format value with appropriate unit
    const formatValue = (data: SensorData) => {
        const { feedName, numericValue } = data;
        
        if (feedName === 'output-water-pumps') {
            return numericValue === 1 ? 'BẬT' : 'TẮT';
        }
        
        if (feedName === 'input-temperature') return `${numericValue} °C`;
        if (feedName === 'input-humidity') return `${numericValue} %`;
        if (feedName === 'input-light') return `${numericValue} lux`;
        if (feedName === 'input-soil-moisture') return `${numericValue} %`;
        
        return numericValue.toString();
    };

    return (
        <div className="p-8 bg-white dark:bg-[#172A46] rounded-xl lg:pl-70">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Lịch sử cảm biến</h1>
            
            {error && (
                <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-xl mb-6">
                    <p className="text-red-500 dark:text-red-400">{error.message || 'Không thể tải dữ liệu cảm biến. Vui lòng thử lại.'}</p>
                </div>
            )}
            
            <div className="mb-6">
                <div className="relative w-64">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 bg-green-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                        <span>{selectedFeedName ? getFeedLabel(selectedFeedName) : 'Tất cả cảm biến'}</span>
                        <ChevronDown className="ml-2" size={20} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                            <button
                                onClick={() => handleFeedChange(null)}
                                className="block w-full px-4 py-2 text-left text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                            >
                                Tất cả cảm biến
                            </button>
                            {uniqueFeedNames.map((feedName) => (
                                <button
                                    key={feedName}
                                    onClick={() => handleFeedChange(feedName)}
                                    className="block w-full px-4 py-2 text-left text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                >
                                    {getFeedLabel(feedName)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : (
                <>
                    <div className="bg-green-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-green-100 dark:bg-green-900/30">
                                    <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-semibold">Loại cảm biến</th>
                                    <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-semibold">Giá trị</th>
                                    <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-semibold">Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sensorData.length > 0 ? (
                                    sensorData.map((data) => (
                                        <tr 
                                            key={data.id} 
                                            className="border-b border-gray-200 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-900/30 transform transition-all hover:scale-[1.01] hover:shadow-md"
                                        >
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2 py-1 rounded ${getBadgeVariant(data.feedName)}`}>
                                                    {getFeedLabel(data.feedName)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatValue(data)}</td>
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatTimestamp(data.timestamp)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                            Hiện tại không có dữ liệu cảm biến để hiển thị.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            <button
                                onClick={() => handlePageChange(0)}
                                disabled={pagination.pageNumber === 0}
                                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronsLeft size={20} />
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                                disabled={pagination.pageNumber === 0}
                                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    className={`px-4 py-2 rounded-lg ${
                                        i === pagination.pageNumber
                                            ? 'bg-green-600 text-white dark:bg-green-700'
                                            : 'bg-green-50 text-gray-800 hover:bg-green-100 dark:bg-gray-700 dark:text-white dark:hover:bg-green-900/30'
                                    } transition-colors`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                                disabled={pagination.pageNumber === pagination.totalPages - 1}
                                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.totalPages - 1)}
                                disabled={pagination.pageNumber === pagination.totalPages - 1}
                                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronsRight size={20} />
                            </button>
                        </div>
                    )}
                    
                    {sensorData.length > 0 && (
                        <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                            Hiển thị {sensorData.length} trên {pagination.totalElements} bản ghi
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default History;
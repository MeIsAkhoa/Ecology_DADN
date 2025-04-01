import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/data/news.json');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải tin tức...</div>;
  }

  return (
    <div className="lg:ml-80 max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        <FaLeaf className="inline mr-2" />
        Tin Tức Nông Nghiệp Nổi Bật
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                {item.category}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-2" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import NovelList from '../components/NovelList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../styles/Catalog.css';

function Catalog() {
  const [novels, setNovels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);
  const { loading, error, request } = useApi();

  useEffect(() => {
    fetchGenres();
    fetchNovels();
  }, []);

  const fetchGenres = async () => {
    try {
      const data = await request('get', '/novels/genres');
      setGenres(data);
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    }
  };

  const fetchNovels = async (searchParams = {}) => {
    try {
      const data = await request('get', '/novels/search', { 
        params: { ...searchParams, page: currentPage, limit: 10 } 
      });
      setNovels(data.novels);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch novels:', err);
    }
  };

  const handleSearch = (searchParams) => {
    setCurrentPage(1);
    fetchNovels(searchParams);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNovels({ page });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="catalog">
      <h1>Catalogue des Romans</h1>
      <SearchBar onSearch={handleSearch} genres={genres} />
      <NovelList novels={novels} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default Catalog;
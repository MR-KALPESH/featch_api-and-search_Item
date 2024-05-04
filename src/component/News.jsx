import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [brand, setBrand] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const responseData = response.data;
        console.log('Fetched Data:', responseData); // Check if data is fetched correctly
        if (Array.isArray(responseData.products)) {
          setBrand(responseData.products);
          setFilteredItem(responseData.products);
          // Extract unique authors
          const uniqueBrand = [...new Set(responseData.products.map(item => item.Brandes))];
          console.log('Unique Authors:', uniqueBrand); // Check if authors are extracted correctly
          setAuthors(uniqueBrand);
        } else {
          console.error('Products array not found in response data:', responseData);
        }
      })
      .catch(error => console.error('Not a featch data:', error));
  }, []);
  
  
  const handleAuthorChange = (brands) => {
    setSelectedAuthor(brands);
    if (brands === '') {
      setFilteredItem(brand); // Use the state variable 'brand'
    } else {
      setFilteredItem(brand.filter(item => item.Brandes === brands));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = brand.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredItem(filteredData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //  ========== ========== ==== Page logic ==================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  margin: '0 auto',
  marginBottom: '15px',
  gap :'5px',
}}>
  <select
    value={selectedAuthor}
    onChange={(e) => handleAuthorChange(e.target.value)}
    style={{ width: '40%',borderRadius: '10px' }}
  >
    <option value="">All Product</option>
    {currentItems.map(brand => (
      <option key={brand} value={brand}>{brand.brand}</option>
    ))}
  </select>
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search..."
    style={{ width: '40%',borderRadius: '10px' }}
  />
</div>


      <table className="border ">
        <thead className='border border-dark'>
          <tr >
          <th className='border border-dark'>ID</th>
            <th className='border border-dark'>Title</th>
            <th className='border border-dark'>Description</th>
            <th className='border border-dark'>Price(₹)</th>
            <th className='border border-dark'>stock</th>
            <th className='border border-dark'>Brand</th>
            <th className='border border-dark'>Category</th>
            <th className='border border-dark'>Thumbnail</th>

          </tr>
        </thead>
        <tbody className='border border-dark w-auto h-auto'>
          {currentItems.map(item => (
            <tr key={item.id} className='border border-dark'>
              <td className='border border-dark'>{item.id}</td>
              <td className='border border-dark'>{item.title}</td>
              <td className='border border-dark ' >{item.description}</td>
              <td className='border border-dark'>{item.price}</td>
              <td className='border border-dark'>{item.stock}</td>
              <td className='border border-dark'>{item.brand}</td>

              <td className='border border-dark'>{item.category}</td>
              <td className='border border-dark '><img src={item.thumbnail} alt="" className="img_api" /> </td>  


            </tr>
          ))}
        </tbody>
      </table>
      <div className=' mt-3'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentItems.length< itemsPerPage}>Next</button>
      </div>
    </div>
  );
};

export default News;

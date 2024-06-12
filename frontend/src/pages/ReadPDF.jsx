import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReadPDF = () => {
    const { bookId } = useParams();
    const [pdfData, setPdfData] = useState(null);
  
    useEffect(() => {
      const fetchPDF = async () => {
        try {
          const response = await axios.get(`/api/books/${bookId}/pdf`, {
            responseType: 'blob',
          });
          setPdfData(response.data);
        } catch (error) {
          console.error('Error fetching PDF:', error);
        }
      };
  
      fetchPDF();
    }, [bookId]);
  
    return (
        <div>
          {pdfData ? (
            <iframe
              src={URL.createObjectURL(pdfData)}
              style={{ width: '100%', height: '100vh' }}
              title="PDF Viewer"
            />
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      );
    };
  
  
  export default ReadPDF;
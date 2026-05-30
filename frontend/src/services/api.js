import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const analyzeArticle = async (text, url = '') => {
  const response = await api.post('/analyze', { text, url });
  return response.data;
};

export const exportToPdf = async (data) => {
  const response = await api.post('/export/pdf', data, {
    responseType: 'blob', // Important for downloading files
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'NewsSaar_Analysis.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportToTxt = async (data) => {
  const response = await api.post('/export/txt', data, {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'NewsSaar_Analysis.txt');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default {
  analyzeArticle,
  exportToPdf,
  exportToTxt
};

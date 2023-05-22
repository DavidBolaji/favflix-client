import axios from 'axios';

let url = import.meta.env.VITE_CLOUDINARY_URL;

const Cloudinary = axios.create({
  baseURL: url,
});

export default Cloudinary;

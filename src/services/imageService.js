import { axiosService } from './axiosService';
const token = '32384029-b335b886a5c53d23582a19afa';
const imageService = {
  getQuery: async (q, page = 1, per_page = 40) => {
    const res = await axiosService.get('/', {
      params: {
        key: token,
        q,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
        page,
        per_page,
      },
    });
    return res.data;
  },
};
export { imageService };
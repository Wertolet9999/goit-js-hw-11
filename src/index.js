import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';
import { imageService, renderImages } from './services';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let query = '';
let simpleLightboxInstance = null;

form.onsubmit = async (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMore.style.display = 'none';
  query = e.currentTarget.searchQuery.value.split(' ').join('+');
  try {
    const res = await imageService.getQuery(query, page);
    if (!res.hits.length) {
      throw new Error();
    }
    Notify.success(`Hooray! We found ${res.totalHits} images.`);
    loadMore.style.display = 'block';
    renderImages(res.hits, gallery);
    simpleLightboxInstance = new SimpleLightbox('.gallery a');
  } catch (e) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
};

loadMore.onclick = async (e) => {
  try {
    const res = await imageService.getQuery(query, page+=1);
    if (!res.hits.length) {
      throw new Error();
    }
    renderImages(res.hits, gallery);
    simpleLightboxInstance.refresh();
    const {height: cardHeight} = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    e.target.style.display = 'none';
    Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
  }
  
};

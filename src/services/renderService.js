const renderImages = (images, markupEls) => {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const data = { Likes: likes, Views: views, Comments: comments, Downloads: downloads };
    const imgLink = document.createElement('a');
    imgLink.href = largeImageURL;
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    const img = document.createElement('img');
    img.src = webformatURL;
    img.alt = tags;
    img.loading = 'lazy';
    const info = document.createElement('div');
    info.classList.add('info');
    for (const key in data) {
      const infoItem = document.createElement('p');
      infoItem.classList.add('info-item');
      info.append(infoItem);
      const b = document.createElement('b');
      b.innerText = key;
      const p = document.createElement('p');
      p.innerText = data[key];
      infoItem.append(b, p);
    }
    photoCard.append(img, info);
    imgLink.append(photoCard);
    return imgLink;
  });
  markupEls.append(...markup);
};
export { renderImages };
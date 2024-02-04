import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import axios from "axios";

const API_KEY = '42158298-7ee19009037b01d9fe650f472';
const URL = "https://pixabay.com/api/";
const form = document.querySelector(".form-inline");
const containerEl = document.querySelector(".card-container");
const loadMoreBtn = document.querySelector(".label");
const preloader = document.getElementById("preloader");
const queryParams = {
    q: "",
    page: 1,
    maxPage: 0,
    per_page: 15,
};
let currentSearchQuery = "";
const hiddenClass = "is-hidden";

function hide(element) {
    element.classList.add(hiddenClass);
}

function show(element) {
    element.classList.remove(hiddenClass);
}

function enable(button) {
    button.disabled = false;
}

function disable(button) {
    button.disabled = true;
}

function showLoadingIndicator() {
    preloader.style.display = "block";
}

function hideLoadingIndicator() {
    preloader.style.display = "none";
}

async function handleSearch(event) {
    event.preventDefault();
    containerEl.innerHTML = "";
    const form = event.currentTarget;
    const picture = form.elements.picture.value.trim();
    currentSearchQuery = picture;
    queryParams.page = 1; 
    if (picture === "" || picture == null) {
        iziToast.error({
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position:"topRight"
        });
        hide(loadMoreBtn);
        return;
    }
    showLoadingIndicator();
    try {
        const { hits, totalHits } = await searchPicture(picture); 
        if (hits && hits.length > 0) {
            createPictureMarkup(hits, containerEl);
            const lightbox = new SimpleLightbox('.card-container a', {
                captionsData: 'alt',
                captionPosition: 'bottom',
                captionDelay: 250,
            });
            lightbox.refresh();
            if (hits.length < queryParams.per_page || hits.length === totalHits) {
                hide(loadMoreBtn);
                iziToast.error({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight"
                });
            } else {
                show(loadMoreBtn);
            }
        } else {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please, try again!',
                position:"topRight"
            });
            hide(loadMoreBtn);
        }
    } catch (err) {
        console.log(err);
    } finally {
        hideLoadingIndicator();
        form.reset();
    }
}

async function searchPicture(picture, page = 1) {
    return axios.get(URL, {
        params: {
            key: API_KEY,
            q: picture,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: queryParams.per_page, 
            page,
        }
    }).then((res) => {
        return res.data;
    });
}

async function handleLoadMore() {
    queryParams.page += 1;
    disable(loadMoreBtn, preloader);
    try {
        const { hits } = await searchPicture(currentSearchQuery, queryParams.page);
        if (hits.length > 0) {
            createPictureMarkup(hits, containerEl);
            const lightbox = new SimpleLightbox('.card-container a', {
                captionsData: 'alt',
                captionPosition: 'bottom',
                captionDelay: 250,
            });
            lightbox.refresh();
        } else {
            hide(loadMoreBtn);
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position:"topRight"
            });
            loadMoreBtn.removeEventListener("click", handleLoadMore);
        }
    } catch (err) {
        console.log(err);
    } finally {
        enable(loadMoreBtn, preloader);
    }
}

function createPictureMarkup(hits, containerEl) {
    const markup = hits.map(({ webformatURL, likes, views, comments, downloads, largeImageURL }) => `<a href="${largeImageURL}" class="picture-link">
    <img src="${webformatURL}">
    <div class="picture-content">
        <div class="picture-text">
            <span class="picture-title">Likes</span>
            <span class="picture-sub-title">${likes}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Views</span>
            <span class="picture-sub-title">${views}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Comments</span>
            <span class="picture-sub-title">${comments}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Downloads</span>
            <span class="picture-sub-title">${downloads}</span>
        </div>
    </div>
</a>`).join("");
    containerEl.insertAdjacentHTML("beforeend", markup);
}

form.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

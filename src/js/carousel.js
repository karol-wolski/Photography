let slideIndex = 0

function showSlides() {
  const slides = document.getElementsByClassName('carousel__item')

  if (slides.length > 0) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('carousel__item--active')
    }
    slideIndex++
    if (slideIndex > slides.length) slideIndex = 1

    slides[slideIndex - 1].classList.add('carousel__item--active')
    setTimeout(showSlides, 5000)
  }
}

export default showSlides

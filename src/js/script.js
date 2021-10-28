import '../scss/style.scss'
import showSlides from './carousel'
import { contactForm } from './contact'
import mobileMainNavigation from './navigation'

const init = () => {
  mobileMainNavigation()
  showSlides()
  contactForm()
}

init()

import { createFocusTrap } from 'focus-trap'

function mobileMainNavigation() {
  const mobileBtn = document.querySelector('#mobile-nav-button')
  const menu = document.querySelector('.nav')
  const navigation = document.querySelector('.navigation')
  const focusTrap = createFocusTrap('.navigation', {
    onActivate: function () {
      navigation.className = 'navigation navigation--mobile'
    },
    onDeactivate: function () {
      navigation.className = 'navigation'
    },
  })

  mobileBtn.addEventListener('click', function () {
    mobileBtn.classList.toggle('hamburger--active')
    if (menu.classList.contains('nav--mobile')) {
      this.setAttribute('aria-expanded', 'false')
      menu.classList.remove('nav--mobile')
      focusTrap.deactivate()
    } else {
      menu.classList.add('nav--mobile')
      this.setAttribute('aria-expanded', 'true')
      focusTrap.activate()
    }
  })
}

export default mobileMainNavigation

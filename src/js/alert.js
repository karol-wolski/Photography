const alert = (type, str, hide = false) => {
  const el = document.createElement('div')
  el.classList.add('alert')

  if (type === 'error') {
    el.classList.add('alert--error')
  } else if (type === 'success') {
    el.classList.add('alert--success')
  }

  if (hide) {
    setTimeout(function () {
      el.remove()
    }, 3000)
  }

  el.append(str)
  return el
}

export { alert }

let div = document.createElement('div')
div.style.position = 'fixed'
div.style.right = '.5rem'
div.style.top = '5rem'
div.style.zIndex = 98
div.style.backgroundColor = 'rgba(0,0,0,.25)'
div.style.paddingLeft = '.25rem'
div.style.paddingRight = '.25rem'
div.style.borderRadius = '5px'
div.style.color = 'var(--node-title)'

div.pre = '<div><div style = "display:flex;justify-content:space-between;align-items:center;"><p style = "margin:none;"><strong>LAYERS</strong></p><div style = "display:flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/></svg></div></div>'
div.inner = ''
div.post = "</div>"

export default div
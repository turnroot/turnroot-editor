const updateTheme = (theme) => {
    const main = document.querySelector('#main')
    main.classList.remove('ocean_waves', 'turnroot', 'charcoal', 'charcoal_blue', 'charcoal_green', 'chocolate', 'midnight_spark', 'snowdrift', 'tokyo_night', 'pink_dream', 'forest_mist', 'sunset_glow', 'pine_coast')
    main.classList.add(theme)
    main.dataset.theme = theme
    window.MainEditorWindow.refresh()
    window.EditorWindowSidebar.refresh()
    localStorage.setItem('theme', theme)
}

export default updateTheme
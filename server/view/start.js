import { w2layout, w2grid, query } from './lib/w2ui.es6.min.js'
import './lib/globals.js'
import EditorWindowSidebar from './components/editorwindow/EditorWindowSidebar.js'
import EditorWindowTopMenu from './components/editorwindow/EditorWindowTopMenu.js'
import EditorWindowStatusBar from './components/editorwindow/EditorWindowStatusBar.js'
import EditorWindow from './components/editorwindow/EditorWindow.js'
import DefaultStart from './components/editorwindow/default.js'

window.w2layout = w2layout
window.w2grid = w2grid
window.query = query
window.EditorWindowSidebar = EditorWindowSidebar
window.EditorWindowTopMenu = EditorWindowTopMenu
window.EditorWindowStatusBar = EditorWindowStatusBar
window.EditorWindow = EditorWindow
window.DefaultStart = DefaultStart
import { w2layout, w2grid, query, w2alert } from './lib/w2ui.es6.min.js'
import './lib/globals.js'
import EditorWindowSidebar from './components/editorwindow/EditorWindowSidebar.js'
import EditorWindowTopMenu from './components/editorwindow/EditorWindowTopMenu.js'
import EditorWindowStatusBar from './components/editorwindow/EditorWindowStatusBar.js'
import EditorWindow from './components/editorwindow/EditorWindow.js'
import DefaultStart from './components/editorwindow/default.js'
import { initQueue, sendQueue, updateQueue } from './functions/edits/queue.js'
import getAllIcons from './functions/gets/getAllIcons.js'

import IconPicker from './components/utils/iconPicker.js'
import ImageIconComponentPicker from './components/utils/graphicStacks/imageIconComponentPicker.js'
let iconPicker = new IconPicker({y: 0, x: 0}, [])
let imageIconComponentPicker = new ImageIconComponentPicker({y: 0, x: 0}, [])
window.IconPicker = iconPicker
window.ImageIconComponentPicker = imageIconComponentPicker

window.w2layout = w2layout
window.w2alert = w2alert
window.w2grid = w2grid
window.query = query
window.EditorWindowSidebar = EditorWindowSidebar
window.EditorWindowTopMenu = EditorWindowTopMenu
window.EditorWindowStatusBar = EditorWindowStatusBar
window.EditorWindow = EditorWindow
window.DefaultStart = DefaultStart
initQueue()
window.updateQueue = updateQueue
window.sendQueue = sendQueue

window.allIcons = await getAllIcons()
window.IconPicker.icons = window.allIcons
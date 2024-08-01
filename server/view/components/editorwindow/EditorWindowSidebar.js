import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'
import UnitEditor from '../uniteditor/UnitEditor.js'
import ClassEditor from '../classeditor/ClassEditor.js'
import GameEditor from '../gameeditor/GameEditor.js'
import ObjectEditor from '../objecteditor/ObjectEditor.js'
import IconEditor from '../iconeditor/IconEditor.js'

window.UnitEditor = UnitEditor
window.ClassEditor = ClassEditor
window.GameEditor = GameEditor
window.ObjectEditor = ObjectEditor
window.IconEditor = IconEditor

let sidebar = new w2sidebar({
    name: 'EditorWindowSidebar',
    flatButton: true,
    icon: {
        text(node) {
            if (node.id === 'sidebar-editors-unit-editor') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`}
            else if (node.id === 'sidebar-editors-class-editor') {
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drama"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>`
            } else if (node.id === 'sidebar-editors-game-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`
            } else if (node.id === 'sidebar-editors-object-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sword"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>`
            } else if (node.id === 'sidebar-editors-level-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid-3x3"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>`
            } else if (node.id === 'sidebar-editors-map-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>`
            } else if (node.id === 'sidebar-editors-skill-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`
            } else if (node.id === 'sidebar-editors-battalion-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-component"><path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"/><path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"/><path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"/><path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"/></svg>`
            } else if (node.id === 'sidebar-editors-combatarts-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-arrow"><path d="M19 2v3h3"/><path d="M13.4 10.6 22 2"/><circle cx="12" cy="12" r="2"/><path d="M12.3 6H12a6 6 0 1 0 6 6v-.3"/><path d="M15 2.5A9.93 9.93 0 1 0 21.5 9"/><path d="M5.3 19.4 4 22"/><path d="M18.7 19.4 20 22"/></svg>`
            } else if (node.id === 'sidebar-editors-shop-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`
            } else if (node.id === 'sidebar-editors-cutscenes-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`
            } else if (node.id === 'sidebar-editors-gameflow-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>`
            } else if (node.id === 'sidebar-editors-dialogue-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`
            } else if (node.id === 'sidebar-editors-menus-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-menu"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>`
            } else if (node.id === 'sidebar-editors-activities-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bath-bubble"><path d="M15 3h.01"/><circle cx="11.5" cy="6.5" r=".5"/><circle cx="16.5" cy="7.5" r=".5"/><path d="M2 12h6"/><path d="M13 15H8v-3c0-.6.4-1 1-1h3c.6 0 1 .4 1 1Z"/><path d="M13 12h9"/><path d="M4 12v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M7 19v2"/><path d="M17 19v2"/></svg>`
            } else if (node.id === 'sidebar-editors-portraits-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>`
            } else if (node.id === 'sidebar-editors-icons-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dot"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>`
            } else if (node.id === 'sidebar-editors-visual-effects-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`
            } else if (node.id === 'sidebar-editors-music-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`
            } else if (node.id === 'sidebar-editors-sound-effects-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drum"><path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/></svg>`
            } else if (node.id === 'sidebar-editors-animations-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>`
            } else if (node.id === 'sidebar-editors-sprites-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pac-man-ghost"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>`
            } else if (node.id === 'sidebar-editors-tiles-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-forest"><path d="m9 5 3-3 3 3"/><path d="m9 10 3-3 3 3"/><path d="M12 12V2"/><path d="m2 15 3-3 3 3"/><path d="m2 20 3-3 3 3"/><path d="M5 22V12"/><path d="m16 15 3-3 3 3"/><path d="m16 20 3-3 3 3"/><path d="M19 22V12"/></svg>`
            } else if (node.id === 'sidebar-editors-models-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`
            } else if (node.id === 'sidebar-editors-filters-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`
            }
        }
    },
    nodes: [
        {id: 'sidebar-editors-list', text: 'Simple Editors', expanded: true, group: true, groupShowHide: true,
        nodes: [
            {id: 'sidebar-editors-game-editor', text: 'Project'},
            {id: 'sidebar-editors-unit-editor', text: 'Units', disabled: true},
            {id: 'sidebar-editors-class-editor', text: 'Classes', disabled: true},
            {id: 'sidebar-editors-object-editor', text: 'Objects', disabled: true},
            {id: 'sidebar-editors-skill-editor', text: 'Skills', disabled: true},
            {id: 'sidebar-editors-battalion-editor', text: 'Battalions', disabled: true},
            {id: 'sidebar-editors-combatarts-editor', text: 'Combat Arts', disabled: true},
        ],
    },
    {id: 'sidebar-map-editors-list', text: 'Map Editors', expanded: false, group: true, groupShowHide: true,
    nodes: [
        {id: 'sidebar-editors-level-editor', text: 'Battlefields', disabled: true},
        {id: 'sidebar-editors-map-editor', text: 'World Map', disabled: true},
        {id: 'sidebar-editors-shop-editor', text: 'Shops', disabled: true},
    ],
    },
    {id: 'sidebar-editors-flow-list', text: 'Flow Editors', expanded: false, group: true, groupShowHide: true, nodes:[
        {id: 'sidebar-editors-cutscenes-editor', text: 'Cutscenes', disabled: true},
        {id: 'sidebar-editors-gameflow-editor', text: 'Game Flow', disabled: true},
        {id: 'sidebar-editors-dialogue-editor', text: 'Dialogue', disabled: true},
        {id: 'sidebar-editors-menus-editor', text: 'Menus', disabled: true},
        {id: 'sidebar-editors-activities-editor', text: 'Activities', disabled: true},
    ]},
    {
        id: 'sidebar-editors-visuals-list', text: 'Image Creators', expanded: false, group: true, groupShowHide: true, nodes:[
            {id: 'sidebar-editors-portraits-editor', text: 'Portraits', disabled: true},
            {id: 'sidebar-editors-icons-editor', text: 'Icons', disabled: true},
        ]
    },
    {
        id: 'sidebar-editors-presentation-list', text: 'Presentation', expanded: false, group: true, groupShowHide: true, nodes:[
            {id: 'sidebar-editors-visual-effects-editor', text: 'Visual Effects', disabled: true},
            {id: 'sidebar-editors-music-editor', text: 'Music', disabled: true},
            {id: 'sidebar-editors-sound-effects-editor', text: 'Sound Effects', disabled: true},
            {id: 'sidebar-editors-animations-editor', text: 'Animations', disabled: true},
            {id: 'sidebar-editors-sprites-editor', text: 'Sprites', disabled: true},
            {id: 'sidebar-editors-tiles-editor', text: 'Tiles', disabled: true},
            {id: 'sidebar-editors-models-editor', text: 'Models', disabled: true},
            {id: 'sidebar-editors-filters-editor', text: 'Filters', disabled: true},
        ]
    }
],
onFlat(event) {
    let layout = w2ui.EditorWindowLayout
    layout.sizeTo('left', (event.detail.goFlat ? '4rem' : '12%'), true)
},
})

sidebar.on('render:after', function(event) {
    if (window.newUserOnboardingGameDetails === false){
        sidebar.enable('sidebar-editors-unit-editor')
        sidebar.enable('sidebar-editors-class-editor')
        sidebar.enable('sidebar-editors-object-editor')
        sidebar.enable('sidebar-editors-level-editor')
        sidebar.enable('sidebar-editors-map-editor')
        sidebar.enable('sidebar-editors-skill-editor')
        sidebar.enable('sidebar-editors-cutscenes-editor')
        sidebar.enable('sidebar-editors-gameflow-editor')
        sidebar.enable('sidebar-editors-dialogue-editor')
        sidebar.enable('sidebar-editors-shop-editor')
        sidebar.enable('sidebar-editors-menus-editor')
        sidebar.enable('sidebar-editors-activities-editor')
        sidebar.enable('sidebar-editors-sound-effects-editor')
        sidebar.enable('sidebar-editors-music-editor')
        sidebar.enable('sidebar-editors-portraits-editor')
        sidebar.enable('sidebar-editors-icons-editor')
        sidebar.enable('sidebar-editors-visual-effects-editor')
        sidebar.enable('sidebar-editors-filters-editor')
        sidebar.enable('sidebar-editors-animations-editor')
        sidebar.enable('sidebar-editors-sprites-editor')
        sidebar.enable('sidebar-editors-tiles-editor')
        sidebar.enable('sidebar-editors-models-editor')
        sidebar.enable('sidebar-editors-battalion-editor')
        sidebar.enable('sidebar-editors-combatarts-editor')
    }
    if (!combatCombatArts){
        sidebar.disable('sidebar-editors-combatarts-editor')
    }
    if (!combatBattalions){
        sidebar.disable('sidebar-editors-battalion-editor')
    }
    if (sessionStorage.getItem('startupView')){
        let startupView = sessionStorage.getItem('startupView')
        if (startupView === 'default-editor-unit-editor'){
            sidebar.click('sidebar-editors-unit-editor')
        } else if (startupView === 'default-editor-class-editor'){
            sidebar.click('sidebar-editors-class-editor')
        } else if (startupView === 'default-editor-object-editor'){
            sidebar.click('sidebar-editors-object-editor')
        } else {
            sidebar.click('sidebar-editors-game-editor')
        }
    }
})

sidebar.on('click', function(event) {
    if (event.object.disabled) return
    let layout = w2ui.EditorWindowLayout
    if (event.target === 'sidebar-editors-unit-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('unit-editor-bottom-toolbar-basic')
        layout.html('main', UnitEditor).removed()
        window.activeEditor = 'unit-editor'
    } else if (event.target === 'sidebar-editors-class-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('class-editor-bottom-toolbar-basic')
        layout.html('main', ClassEditor).removed()
        window.activeEditor = 'class-editor'
    } else if (event.target === 'sidebar-editors-game-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('game-editor-bottom-toolbar-game-settings')
        layout.html('main', GameEditor).removed()
        window.activeEditor = 'game-editor'
    } else if (event.target === 'sidebar-editors-object-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('object-editor-bottom-toolbar-basic')
        layout.html('main', ObjectEditor).removed()
        window.activeEditor = 'object-editor'
    } else if (event.target === 'sidebar-editors-icons-editor'){
        layout.html('main', IconEditor).removed()
        window.activeEditor = 'icon-editor'
    }
})

window.goFlat = function () {
    sidebar.goFlat()
}

export default sidebar
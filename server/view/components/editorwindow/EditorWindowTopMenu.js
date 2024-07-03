import {
    w2toolbar,
    w2ui
} from '../../lib/w2ui.es6.min.js'
import topMenu from '../../functions/ui/topMenu.js'

let startupView = 'welcome-message'

let toolbar = new w2toolbar({
    name: 'EditorWindowTopMenu',
    tooltip: 'bottom',
    items: [
        {type: 'menu',
        id: 'settings',
        text: 'Settings',
        items: [
            {
                type: 'menu',
                id: 'themes',
                text: 'Themes',
                items: [{
                        text: 'Ocean Waves',
                        id: 'ocean_waves',
                    },
                    {
                        text: 'Turnroot',
                        id: 'turnroot'
                    },
                    {
                        text: 'Charcoal',
                        id: 'charcoal'
                    },
                    {
                        text: 'Charcoal Blue',
                        id: 'charcoal_blue'
                    },
                    {
                        text: 'Charcoal Green',
                        id: 'charcoal_green'
                    },
                    {
                        text: 'Chocolate',
                        id: 'chocolate'
                    },
                    {
                        text: 'Snowdrift',
                        id: 'snowdrift'
                    },
                    {
                        text: 'Tokyo Night',
                        id: 'tokyo_night'
                    },
                    {
                        text: 'Pink Dream',
                        id: 'pink_dream'
                    },
                    {
                        text: 'Sunset Glow',
                        id: 'sunset_glow'
                    },
                    {
                        text: 'Pine Coast',
                        id: 'pine_coast'
                    }
                ]
            },
            {
                type: 'menu-radio',
        id: 'default-editor',
        text: 'Startup view',

        items: [
            {
                text: 'Welcome message',
                id: 'default-editor-welcome-message',
                style: 'background-color: var(--window-background-alt);',
                checked: true
            },
            {
                text: 'Unit Editor',
                id: 'default-editor-unit-editor',
            },
            {
                text: 'Class Editor',
                id: 'default-editor-class-editor',
            }
        ]
    },
        ]
    }
        ,
        {
            type: 'check',
            id: 'collapseSidebar',
            text: 'Collapse sidebar',
            class: 'w2ui-tb-check'
        },
        {
            type: 'check',
            id: 'show-status-bar',
            text: 'Status bar',
            checked: true,
            class: 'w2ui-tb-check'
        },
    {
        type: 'spacer'
    },
        {
            type: 'menu',
            id: 'import-menu',
            text: 'Import assets',
            tooltip: 'Import graphics, models, music, sound effects, tilesets, or other assets from the market or your computer.',
            items: [{
                    text: 'Import from Turnroot Market',
                    id: 'import-marketplace'
                },
                {
                    text: 'Import from file',
                    id: 'import-file'
                },
                
            ]
        },
        {type: 'button',
        id: 'check-build',
        text: 'Check for issues',
        style: 'margin:0!important;',
        icon: `<div style="width:100%;height:100%;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug-play"><path d="M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"/><path d="M14.12 3.88 16 2"/><path d="M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M6 13H2"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/></svg></div>`
        
    },
        {
            type: 'spacer'
        },
        {
            type: 'button',
            id: 'account',
            style: 'margin:0!important;',
            icon: `<div style="width:100%;height:100%;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`,
        },
        {type: 'break'},
        {
            type: 'button',
            id: 'help',
            text: 'Help',
            style: 'margin:0!important;',
            icon: `<div style="width:100%;height:100%;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>`
        },
        {
            type: 'button',
            id: 'forums',
            text: 'Forums',
            style: 'margin:0!important;',
            icon: `<div style="width:100%;height:100%;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-speech"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg></div>`
        }
    ]
})

toolbar.on('click', function (event) {
    event.done(() => {
        topMenu(event, toolbar)
    })
})

let savedTheme = localStorage.getItem('theme')
if (savedTheme) {
    toolbar.get('settings:themes').items.forEach(item => {
        if (item.id === savedTheme) {
            main.classList.remove('ocean_waves', 'turnroot', 'charcoal', 'charcoal_blue', 'charcoal_green', 'chocolate', 'midnight_spark', 'forest_mist', 'snowdrift', 'tokyo_night', 'pink_dream', 'sunset_glow', 'pine_coast')
            main.classList.add(savedTheme)
            main.dataset.theme = savedTheme
            item.style = 'background-color: var(--window-background-alt);'
        } else {
            item.style = ''
        }
    })
    
}

export default toolbar
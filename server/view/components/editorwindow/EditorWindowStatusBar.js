import { w2toolbar, w2ui } from '../../lib/w2ui.es6.min.js'

const autosavedIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-check"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg></div>'

const autoSavingIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg></div>'

let toolbar = new w2toolbar({
    name: 'EditorWindowStatusBar',
    tooltip: 'top',
    items: [
        { type: 'label', id: 'status-bar-project-status', text: 'Required project settings missing', class: 'status-bar' },
        { type: 'break'},
        {type: 'label', id: 'status-bar-autosave-status', class: 'status-bar', icon: autosavedIcon,},
        {type: 'spacer'},
        {type: 'label', id: 'status-bar-turnroot-version', class: 'status-bar', text: `Turnroot Editor v0.0.8 Weekly`},
        {type: 'spacer'},
        {type: 'label', id: 'status-bar-report-issue', class: 'status-bar report-issue', text: 'Report an issue', style:'margin:0!important;padding:0!important;'},
    ]
})

toolbar.on('render', function(event) {
    if (window.newUserOnboardingGameDetails === false){
        toolbar.hide('status-bar-project-status')
    }
})

toolbar.on('click', function (event) {
    event.done(() => {
        window.turnrootEditorLogs.push(`${new Date()}||info||Status bar button clicked: ${JSON.stringify(event.target)}`)
        if (event.target === 'status-bar-report-issue') {
            window.open('https://community.turnroot.com/c/turnroot-editor/editor-support/6', '_blank')
        }
        else if (event.target === 'status-bar-project-status'){
            let sidebar = w2ui.EditorWindowSidebar
            sidebar.click('sidebar-editors-game-editor')

        }
    })

})

export default toolbar
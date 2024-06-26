import {
    w2form, w2ui, w2alert
} from "../../../lib/w2ui.es6.min.js"
import handleGameDetails from '../functions/handleGameDetails.js'
import Globals from './globals.js'


let config = {
    name: 'gameEditorRequiredGameDetails',
    fields: [{
            type: 'html',
            html: {
                html: '<h2>Basic Game Details</h2><p>You must fill out these fields before any other editors are available.</p>',
                style: 'text-align:left;font-size:150%;overflow:hidden;margin:auto;margin-bottom:2rem;'
            }
        },
        {
            field: 'gameName',
            type: 'text',
            required: true,
            html: {
                label: 'Game Name',
                attr: 'style="width: 100%;font-size:150%;"',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            field: 'gameSubtitle',
            type: 'text',
            required: true,
            html: {
                label: 'Game Subtitle',
                attr: 'style="width: 100%;font-size:150%;"',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            type: 'html',
            html: {
                html: '<p style = "width:100%;max-width:100%!important;">The game subtitle is for long, multi-part titles (say for example you wanted to name your game something like Icy Shield: Lineage of the Evil War - Heirs of Photonic Rays, "Heirs of Photonic Rays" would be your subtitle. A subtitle is optional.</p>',
                class: 'full-width-field'

            }
        },
        {
            field: 'gameAuthorDisplayName',
            type: 'textarea',
            required: true,
            html: {
                label: 'Game Creator Credits',
                attr: 'style="width: 100%;font-size:150%;"',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            type: 'html',
            html: {
                html: '<p style = "width:100%;max-width:100%!important;">Put one credit per line:<br/> Main creator: username<br/>Music: username 2</br>If you\'re not sure of all credits yet, that\'s fine, just list yourself. You can edit this later.</small>',
                class: 'full-width-field'
            }
        },
        {
            type: 'file',
            field: 'gameIcon',
            required: false,
            html: {
                label: 'Game Icon',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            type: 'html',
            html: {
                html: '<p style = "width:100%;max-width:100%!important;">The game icon should be a square image, at least 200px on each side. If you don\'t provide one, a default will be used. You can replace this later by uploading an image here.</p>',
                class: 'full-width-field'
            }
        },
        {
            type: 'checks',
            field: 'gameDifficulty',
            required: true,
            options: {
                items: ['Beginner', 'Easy', 'Normal', 'Hard', 'Insane', 'Maddening'],
                checked: ['Normal']
            },
            html: {
                label: 'Game Difficulties',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            type: 'html',
            html: {
                html: '<p style = "width:100%;max-width:100%!important;">When working on units or other game components, you will have the option to change things by difficulty (i.e., add reinforcements to a level on Hard or above), but the base stats, growth rates, etc, you will be setting are for Normal difficulty. You can set scalars that impact these stats for different difficulty levels- just bear in mind that if, for example, you\'re using stats on a wiki for an existing game as a guide, you should use the Normal stats at all times.</p>',
            },
        },
        {
            type: 'checks',
            field: 'gameMode',
            required: true,
            options: {
                items: ['Casual', 'Classic', 'Casual (Lose Items)', 'Casual (Stat Penalty)']
            },
            html: {
                label: 'Game Modes',
                class: 'emphasized-field full-width-field',
            }
        },
        {
            type: 'html',
            html: {
                html: '<ul><li>Casual: "dead" units retreat and rejoin you in the next battle</li><li>Classic: dead units are gone forever</li><li>Casual (Lose Items): "dead" units retreat and rejoin, but lose their inventory at time of death</li><li>Casual (Stat Penalty): "dead" units retreat and rejoin, but come back with lowered stats.</li></ul>',
                class: 'full-width-field'
            }
        },
        {
            type: 'html',
            html: {
                html: '<div><p>When you\'re happy with the settings above, click Next to move on to more advanced game settings. Clicking Next will also unlock the other editors.</p><button class="w2ui-btn" onclick="window.gameEditorGameDetailsFinishInitialAndNext()" style="width:100%;font-size:150%;">Next</button></div>',
            }
        }
    ]
}

window.gameEditorGameDetailsFinishInitialAndNext = () => {
    let gameEditor = w2ui['GameEditor']
    let gameEditorTabs = w2ui['game-editor-bottom-toolbar']
    gameEditorTabs.show('game-editor-bottom-toolbar-game-settings')
    gameEditorTabs.show('game-editor-bottom-toolbar-assets')
    gameEditorTabs.show('game-editor-bottom-toolbar-build-and-export')
    gameEditorTabs.click('game-editor-bottom-toolbar-game-settings')
    let statusbar = w2ui['EditorWindowStatusBar']
    statusbar.set('status-bar-project-status', {text: 'game details saved'})
    setTimeout(() => {
        statusbar.set('status-bar-project-status', {text: ''})
        statusbar.hide('status-bar-project-status')
    }, 5000)
    gameEditor.html('main', Globals)
    let sidebar = w2ui['EditorWindowSidebar']
    let nodes = sidebar.get('sidebar-editors-list').nodes
    nodes.forEach(element => {
        sidebar.enable(element.id)
    })
    w2alert('<p>You can now access the other editors in the left sidebar, as well as more advanced game settings. Please see <a href = "https://docs.turnroot.com/getting-started/your-first-hour-in-the-turnroot-editor" style = "display:inline;color:var(--accent)">your first hour</a> for a guided tour on what to do next and where everything is.</p> <div style = "height:2rem;"/>', '<h3>Game details saved</h3>')
}

let form = new w2form(config)
form.on('change', function(event) {
    handleGameDetails(event, form)
})

export default form
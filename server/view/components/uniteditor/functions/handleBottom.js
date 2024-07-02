import { w2ui, w2form } from "../../../lib/w2ui.es6.min.js"
import unitEditorBasicFields from '../tabs/basic.js'
import uniteditorFriendFields from '../tabs/friend.js'
import unitEditorAvatarFields from '../tabs/avatar.js'
import unitEditorEnemyFields from '../tabs/enemy.js'
import unitEditorNPCFields from '../tabs/npc.js'
import unitEditorBehaviorContainer from '../tabs/behavior.js'
import unitEditorRelationshipContainer from '../tabs/relationship.js'
import updateCurrentUnitRecord from '../functions/utils/updateCurrentUnitRecord.js'

const handleBottom = (event, toolbar) => {
    window.turnrootEditorLogs.push(`${new Date()}||info||Unit editor bottom toolbar item clicked: ${event.detail.item.id}`)
    let unitEditor = w2ui['UnitEditor']
    if (event.detail.item.id === 'unit-editor-bottom-toolbar-basic'){
        unitEditor.html('main', unitEditorBasicFields)
        window.UnitEditorActiveTab = 'basic'
    }
    else if (event.detail.item.id === 'unit-editor-bottom-toolbar-subtype'){
        window.UnitEditorActiveTab = 'subtype'
        let subtype = w2ui['unit-editor-basic-fields'].record.subtype
        if (subtype === 'Friend'){
            unitEditor.html('main', uniteditorFriendFields)
        } else if (subtype === 'Avatar'){
            unitEditor.html('main', unitEditorAvatarFields)
        } else if (subtype === 'Enemy'){
            unitEditor.html('main', unitEditorEnemyFields)
        } else if (subtype === 'NPC'){
            unitEditor.html('main', unitEditorNPCFields)
        }
    } else if (event.detail.item.id === 'unit-editor-bottom-toolbar-behavior'){
        unitEditor.html('main', unitEditorBehaviorContainer)
        window.UnitEditorActiveTab = 'behavior'
    } else if (event.detail.item.id === 'unit-editor-bottom-toolbar-relationship'){
        updateCurrentUnitRecord(window.currentUnit)
        unitEditor.html('main', unitEditorRelationshipContainer)
        window.UnitEditorActiveTab = 'relationship'
    }
    
}

export default handleBottom
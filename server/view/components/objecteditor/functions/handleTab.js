import {updateQueue} from '../../../functions/edits/queue.js'

import updateNodes from './sidebar/updateNodes.js'

const handleTab = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current
    let subtype = window.objectEditorBasicFields.record.subtype

    if (subtype === 'Weapon'){
        let comprehensiveRecord = {
            ...window.objectEditorBasicFields.record,
            ...window.objectEditorValueFields.record,
            ...window.objectEditorUsageFields.record,
            ...window.objectEditorForgeRepairFields.record,
        }
        updateQueue('objectWeapon', 'update', comprehensiveRecord)
    } else if (subtype === 'Gift'){
        let comprehensiveRecord = {
            ...window.objectEditorBasicFields.record,
            ...window.objectEditorValueFields.record,
            ...window.objectEditorGiftFields.record,
        }
        updateQueue('objectGift', 'update', comprehensiveRecord)
    } else if (subtype === 'Consumable'){
        let comprehensiveRecord = {
            ...window.objectEditorBasicFields.record,
            ...window.objectEditorValueFields.record,
            ...window.objectEditorUsageFields.record,
        }
        updateQueue('objectConsumable', 'update', comprehensiveRecord)
    } else if (subtype === 'Equipable'){
        let comprehensiveRecord = {
            ...window.objectEditorBasicFields.record,
            ...window.objectEditorValueFields.record,
            ...window.objectEditorUsageFields.record,
        }
        updateQueue('objectEquipable', 'update', comprehensiveRecord)
    } else if (subtype === 'Magic'){
        let comprehensiveRecord = {
            ...window.objectEditorBasicFields.record,
            ...window.objectEditorValueFields.record,
            ...window.objectEditorUsageFields.record,
        }
        updateQueue('objectMagic', 'update', comprehensiveRecord)
    }
    updateNodes()
}

export default handleTab
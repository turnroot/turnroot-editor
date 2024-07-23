import {updateQueue} from '../../../functions/edits/queue.js'

import {
    subtypeWeaponRecord,
    subtypeConsumableRecord,
    subtypeEquipableRecord,
    subtypeGiftRecord
} from '../records/subtypeRecords.js'

import commonRecord from '../records/commonRecord.js'

import updateNodes from './sidebar/updateNodes.js'

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current
}

export default handleEvent
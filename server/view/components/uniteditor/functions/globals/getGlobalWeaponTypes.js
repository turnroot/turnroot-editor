let globalWeaponTypes = window.globalWeaponsTypes.types

const format = () => {
    globalWeaponTypes.forEach(weapon => {
        weapon.html = {}
        weapon.type = weapon.id
        weapon.html.label = weapon.name
    })
}

format()

window.turnrootEditorLogs.push(`${new Date()}||info||Global weapon types loaded`)

export default globalWeaponTypes
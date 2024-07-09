let globalExperiences = []

let useExperienceSublevels = window.useExperienceSublevels || false
let options
if (useExperienceSublevels) {
    options = { items: ['E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S'] }
} else {
    options = { items: ['E', 'D', 'C', 'B', 'A', 'S'] }
}

if (window.statsAptitudesUseRiding){
    globalExperiences.push(
        { field: 'riding', type: 'select', options: options, html: { label: 'Riding', attr: '', column: 0 } }
    )
}

if (window.statsAptitudesUseFlying){
    globalExperiences.push(
        { field: 'flying', type: 'select', options: options, html: { label: 'Flying', attr: '', column: 0 } }
    )
}

if (window.statsAptitudesUseAuthority){
    globalExperiences.push(
        { field: 'authority', type: 'select', options: options, html: { label: 'Authority', attr: '', column: 0 } }
    )
}

if (window.statsAptitudesUseArmor){
    globalExperiences.push(
        { field: 'armor', type: 'select', options: options, html: { label: 'Armor', attr: '', column: 0 } }
    )
}

if (window.globalWeaponTypes){
    for (let weaponType of globalWeaponTypes) {
        globalExperiences.push(
            {
                field: weaponType.type,
                type: 'select',
                options: options,
                html: { label: weaponType.html.label, attr: '', column: 0}
            }
        )
    }
}

window.turnrootEditorLogs.push(`${new Date()}||info||Global experiences loaded`)

export default globalExperiences
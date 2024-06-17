let globalExperiences = []
// get from database

// get global weapon types and add them as well

import globalWeaponTypes from './getGlobalWeaponTypes.js'

let useExperienceSublevels = window.useExperienceSublevels || false
console.log('useExperienceSublevels:', useExperienceSublevels)
let options
if (useExperienceSublevels) {
    options = { items: ['E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S'] }
} else {
    options = { items: ['E', 'D', 'C', 'B', 'A', 'S'] }
}

globalExperiences = [
    { field: 'riding', type: 'select', options: options, html: { label: 'Riding', attr: '', column: 0 } },
    { field: 'flying', type: 'select', options: options, html: { label: 'Flying', attr: '', column: 0 } },
    { field: 'authority', type: 'select', options: options, html: { label: 'Authority', attr: '', column: 0 } },
    { field: 'armor', type: 'select', options: options, html: { label: 'Armor', attr: '', column: 0 } },
]

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

console.log(globalExperiences)

export default globalExperiences
let globalStats = [
    { field: 'hp', type: 'int', html: { label: 'HP', attr: '', column: 1 } },
    { field: 'str', type: 'int', html: { label: 'Strength', attr: '', column: 1 } },
    { field: 'mag', type: 'int', html: { label: 'Magic', attr: '', column: 1 } },
    { field: 'skl', type: 'int', html: { label: 'Skill', attr: '', column: 1 } },
    { field: 'spd', type: 'int', html: { label: 'Speed', attr: '', column: 1 } },
    { field: 'def', type: 'int', html: { label: 'Defense', attr: '', column: 1 } },
    { field: 'res', type: 'int', html: { label: 'Resistance', attr: '', column: 1 } },
    { field: 'mov', type: 'int', html: { label: 'Movement', attr: '', column: 1 } },
]

if (window.statsUseExtraStatWeight) {
    globalStats.push({ field: 'weight', type: 'int', html: { label: 'Weight', attr: '', column: 1 } })
    globalStats.push({ field: 'con', type: 'int', html: { label: 'Constitution', attr: '', column: 1 } })
}

if (window.statsUseExtraStatCharm) {
    globalStats.push({ field: 'cha', type: 'int', html: { label: 'Charisma', attr: '', column: 1 } })
}

if (window.statsUseExtraStatLuck) {
    globalStats.push({ field: 'lck', type: 'int', html: { label: 'Luck', attr: '', column: 1 } },)
}

if (window.statsUseExtraStatAuthority) {
    globalStats.push({ field: 'authority', type: 'int', html: { label: 'Authority', attr: '', column: 1 } })
}

window.turnrootEditorLogs.push(`${new Date()}||info||Global stats loaded`)

export default globalStats
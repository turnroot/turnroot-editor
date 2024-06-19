import {w2popup} from '../../../../lib/w2ui.es6.min.js'

const statGrowthPopup = (stats) => {
    let div = document.createElement('div')
    let unchanged = {...stats} 
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.padding = '1rem'
    div.style.overflowY = 'auto'
    let innerHtml = `
    <table>
        <tr>
            <th>Stat</th>
            <th>Growth</th>
        </tr>
        ${Object.entries(stats).map(([stat, growth]) => `<tr><td>${stat}</td><td><input type="number" class="w2ui-input w2field" value="${growth}" id="growth-rate-modal-${stat}"></td></tr>`).join('')}
    </table>
    </div>`
    div.innerHTML = innerHtml
    w2popup.open({
        title: 'Stat Growth',
        body: div,
        resizable: true,
        actions: {
            save: {
                text: 'Save',
                class: 'w2ui-btn',
                onClick(event) {
                    console.log('changed', stats)
                    w2popup.close()
                }
            },
            Cancel() {
                console.log('unchanged')
                stats = unchanged
                w2popup.close()
            }
        }
    }).then(() => {
        console.log('popup ready', stats)
    })

    Object.keys(stats).forEach((stat) => {
        let input = document.getElementById(`growth-rate-modal-${stat}`)
        input.addEventListener('change', (event) => {
            stats[stat] = Number(event.target.value)
        })
    })
}

export default statGrowthPopup
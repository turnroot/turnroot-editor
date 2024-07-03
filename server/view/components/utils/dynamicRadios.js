const dynamicRadios = (iteratives, name) => {
    let outer = document.createElement('div')
    iteratives.forEach((iterative, i) => {
        let div = document.createElement('div')
        div.style.display = 'flex'
        div.style.gap = '1rem'

        let h3 = document.createElement('h3')
        h3.innerText = iterative.fieldLabel
        div.appendChild(h3)
        let container = document.createElement('div')
        container.className = 'w2ui-field'
        div.appendChild(container)

        iterative.fieldOptions.forEach((option, j) => {
            
            let label = document.createElement('label')
            label.className = 'w2ui-box-label'
            label.style.paddingLeft = '.5rem'
            label.style.gap = '.25rem'

            let input = document.createElement('input')
            input.type = 'radio'
            input.name = iterative.fieldLabel + name
            input.id = option
            input.setAttribute('data-value', option)
            input.setAttribute('data-index', j)
            input.style.maxWidth = '12.5rem'

            if (option === iterative.fieldValue) {
                input.checked = true
            }

            label.appendChild(input)

            let span = document.createElement('span')
            span.innerText = option
            label.appendChild(span)

            container.appendChild(label)
        })
        outer.appendChild(div)
    })
    return outer
}

export default dynamicRadios
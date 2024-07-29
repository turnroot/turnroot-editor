class graphicStacksTransformButtons {
    constructor(name){
        let layout = new window.w2layout({
            name: 'graphicStackTranformButtons' + name,
            panels: [
                {
                    type: 'main',
                    content: 'main',
                    style: 'overflow-y: hidden;',
                    html: 'graphicStackTranformButtons' + name
                }
            ]
        })
        this.layout = layout
    }
}

export default graphicStacksTransformButtons



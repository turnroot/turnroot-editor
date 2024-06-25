let style = `
.balanceMeterCircle {
    height: 90px;
    width: 180px;
    background-size: 100% 100%;
    background-position: 0px 0px;
    background-color: var(--slider-0);
    border-radius: 999rem 999rem 0rem 0rem;
    mask-image: radial-gradient(circle at 50% 100%, transparent 40%, black 40%);
    position:relative;
  }
  .balanceMeterNeedle{
    height:100%;
    position:absolute;
    width:6px;
    background-color:var(--node-title);
    z-index:1492;
    left:calc(50% - 3px);
    transform-origin:bottom;
  }
`

let html = `
<div class="balanceMeterCircle">
  <div class="balanceMeterNeedle"></div>
  </div>
  </div>
</div>
`

const balanceMeter = (initialValue, statCount, h3text, pHtml) => {
    let meter = document.createElement('div')
    meter.innerHTML = html
    let styleTag = document.createElement('style')
    styleTag.innerHTML = style
    meter.appendChild(styleTag)
    meter.querySelector('.balanceMeterNeedle').style.transform = `rotate(${initialValue}deg)`
    let h3 = document.createElement('h3')
    h3.innerText = h3text
    let p = document.createElement('p')
    p.innerHTML = pHtml
    meter.appendChild(h3)
    meter.appendChild(p)
    return meter
}

export default balanceMeter
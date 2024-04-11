import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { Application, Texture, Assets, Container, Graphics, Sprite, DisplacementFilter, BlurFilter, AlphaFilter, Text } from 'pixi.js'
import { addBackground } from './js/addBackground.js';
import { addDisplacementEffect } from './js/addDisplacementEffect.js';

import { AdvancedBloomFilter, ShockwaveFilter, AdjustmentFilter } from 'pixi-filters'

import * as dat from 'dat.gui';

const gui = new dat.GUI();

const stageEle = {}

const app = new Application()
// default setup
async function setup() {

  await app.init({
      background: '#000',
      antiAlias: true,
      width: 764,
      height: 1080
  })




  // 764 x 1080

  // app.stage.style.width = width
  // app.stage.style.height = height

  
  
  // console.log()
  // // console.log(app.stage)

  // app.stage.height = window.innerHeight
  // app.stage.width = window.innerHeight * 764/1080

  // app.stage.width = 764
  // app.stage.height = 1080

  // const canvas = document.querySelector('canvas')
  // console.log(canvas)
  // // canvas.style.height = window.innerHeight + 'px'
  // // canvas.style.width = window.innerHeight * 764/1080 + 'px'  
  // // canvas.style.imageRendering = 'pixelated'
  // app.stage.scale.set(1)




  document.body.appendChild(app.canvas)


  
}

class eleBuilder {
  constructor() {
    this.container = new Container()
    this.ele = []
  }
  graphic(instructions, posVals) { 
    const graphic = new Graphics()
    instructions.forEach(v => {
      const { type, props} = v
      if(Array.isArray(props)) {
        graphic[type](...props)
      } else {
        graphic[type](props)
      }
    })
    this.posData(graphic, posVals)
  }

  text(instructions, posVals) {
    const text = new Text({
      text: instructions.text,
      style: instructions.style
    })
    this.posData(text, posVals)
  }

  sprite(instructions, posVals) {    
    const sprite = Sprite.from(instructions)
    this.posData(sprite, posVals)
  }

  posData(element, posVals) {
    this.ele.push(element)
    this.container.addChild(element)
    if(posVals == undefined) return;
    const { position = [0,0], rotation = 0, anchor = 0.5, scale = 1, height, width } = posVals

    if(element.position != undefined) element.position.set(...position)
    if(element.rotation != undefined) element.rotation = rotation
    if(element.anchor != undefined) {
      if(Array.isArray(anchor)) element.anchor.set(...anchor); else element.anchor.set(anchor)
    }
    if(element.scale != undefined) {
      if(Array.isArray(scale)) element.scale.set(...scale); else element.scale.set(scale)
    }
    if(element.height !== undefined) {
      if(height !== undefined) element.height = height
      if(width !== undefined) element.width = width
    }
  }

  contain() {
    this.ele.forEach(v => {
      this.container.addChild(v)
    })
  }

}


class teruzuki {
  constructor() {

    this.w = app.screen.width
    this.h = app.screen.height
    this.midW = app.screen.width/2
    this.midH = app.screen.height/2
    
  }

  default(element, posVals) {
    const { position = [0,0], rotation = 0, anchor = 0.5, scale = 1, height, width } = posVals

    if(element.position != undefined) element.position.set(...position)
    if(element.rotation != undefined) element.rotation = rotation
    if(element.anchor != undefined) {
      if(Array.isArray(anchor)) element.anchor.set(...anchor); else element.anchor.set(anchor)
    }
    if(element.scale != undefined) {
      if(Array.isArray(scale)) element.scale.set(...scale); else element.scale.set(scale)
    }
    if(element.height !== undefined) {
      if(height !== undefined) element.height = height
      if(width !== undefined) element.width = width
    }
  }

  water() {

    const water = Sprite.from('water')
    this.default(water, {
      width: this.w + 30,
      height: this.h + 30,
      position: [this.midW, this.midH]
    })

    return water
  }  

  radar() {
    const container = new Container()

    // set mask
    const radarMask = new Graphics()
    radarMask.circle(0,0, this.w*0.42)
    .fill({fill:'#fff', alpha:0})
    container.addChild(radarMask)
    container.mask = radarMask

    // set outerCircle and triangles
    const outerCircle = new Graphics()
    outerCircle.circle(0,0, this.w*0.42-1)
    .stroke({width:2, color:'#fff', alpha:0.2})
    container.addChild(outerCircle)

    const triWidth = 200
    const radarTriangle1 = new Graphics()
    radarTriangle1.moveTo(0,0)
    .lineTo(triWidth, 350)
    .lineTo(-triWidth,350)
    .fill({fill:'#fff', alpha:0.05})
    container.addChild(radarTriangle1)

    const radarTriangle2 = new Graphics()
    radarTriangle2.moveTo(0,0)
    .lineTo(triWidth, -350)
    .lineTo(-triWidth,-350)
    .fill({fill:'#fff', alpha:0.05})
    container.addChild(radarTriangle2)

    // set inner circle
    const innerCircle = new Graphics()
    innerCircle.circle(0,0, this.w*0.33)
    .fill({fill:'#fff', alpha:0.04})
    .stroke({width:1.5, color:'#fff', alpha:0.2})
    container.addChild(innerCircle)

    container.position.set(this.midW, this.midH)
    return container
  }

  jpBox() {
    const container = new Container()
    const jpCrossMinWidth = Math.round(this.w*0.0015)
    const w = this.w, h = this.h

    // box
    const LBox = new Graphics()
    LBox.rect(-w * 0.135 - w*0.004, 0, w * 0.27, h * 0.088)
    .stroke({width:jpCrossMinWidth, color:'#fff'})
    container.addChild(LBox)

    const RBox = new Graphics()
    RBox.rect(-w * 0.135 + w*0.004, w*0.008, w * 0.27, h * 0.088)
    .stroke({width:jpCrossMinWidth, color:'#fff'})
    container.addChild(RBox)

    // text elements
    const yokosukaTxt = new Text({
      text: 'YOKOSUKA',
      style:{
        fontFamily: 'proximaNovaEC',
        textAlign: 'right',
        fontSize: 11,
        fill: '#FFF',
      }
    })
    this.default(yokosukaTxt, {
      anchor:1,
      position: [w*0.125, h*0.085]
    })
    this.yokosukaTxt = yokosukaTxt // for transforming later
    container.addChild(yokosukaTxt)
 
    const jpTxt = new Text({
      text:'てるづき', 
      style:{
        fontFamily: 'arial',
        textAlign: 'middle',
        fontSize: 40,
        fill: '#FFF',
      }
    })
    this.default(jpTxt, {
      position:[0,50]
    })
    jpTxt.position.set(0,50)
    container.addChild(jpTxt)
  
    // line crosses
    this.jpCross = []
    for(let i = 0; i < 5; i++) {
      
      const tempCross = new Graphics()
      tempCross.moveTo(jpCrossMinWidth*3,0)
      .lineTo(jpCrossMinWidth*3, jpCrossMinWidth*6)
      .moveTo(0, jpCrossMinWidth*3)
      .lineTo(jpCrossMinWidth*6, jpCrossMinWidth*3)
      .stroke({width:jpCrossMinWidth, fill:'#fff'})
      tempCross.position.set(jpCrossMinWidth * 8 * (i-2), h * 0.1)
      this.jpCross.push(tempCross)
      container.addChild(tempCross)
    }
  
    // torpedos
    this.jpTorpedo = []
    for(let i = 0; i < 5; i++) {
      const tempTorp = Sprite.from('torpedo')
      this.default(tempTorp, {
        anchor:[0.5,1],
        scale:0.17,
        position:[60 + (i * 9), -4],
      })
      this.jpTorpedo.push(tempTorp)
      container.addChild(tempTorp)
    }

    container.position.set(this.midW, 930)
    return container  
  }

  edges() {
    const container = new Container()
    const edgeOffset = 10

    const mark3 = Sprite.from('mark3')
    this.default(mark3, {
      anchor:0,
      scale:0.2,
      position:[edgeOffset,edgeOffset],

    })
    container.addChild(mark3)
  
    const mark2 = Sprite.from('mark2')
    this.default(mark2, {
      anchor:[1,0],
      scale:0.2,
      position:[this.w-edgeOffset,edgeOffset]
    })
    container.addChild(mark2)
    
    const mark1 = Sprite.from('mark1')
    this.default(mark1, {
      anchor:1,
      scale:0.2,
      position:[this.w-edgeOffset, this.h-edgeOffset]
    })
    container.addChild(mark1)

    const markText = new Text({
      text:'DD 162', 
      style:{
        fontFamily: 'proximaNovaEC',
        textAlign: 'left',
        fontSize: 15,
        fill: '#FFF',
    }})
    this.default(markText, {
      scale:[1,1.5],
      anchor:[0,1],
      position:[edgeOffset, this.h - edgeOffset]
    })
    container.addChild(markText)    

    return container
  }

  headerText() {
    const container = new Container()

    const headerText = new Text({
      text:'JDS TERUZUKI', 
      style:{
        fontFamily: 'ignite',
        textAlign: 'middle',
        fontSize: 122,
        fill: '#FFF',
    }})
    this.default(headerText, {
      position:[this.midW, 100]
    })
    container.addChild(headerText)

    return container
  }

  sBoat() {

    const sBoat = Sprite.from('boatSmall')
    this.default(sBoat, {
      scale: 0.22,
      position: [this.midW + 73, this.midH + 190]
    })

    return sBoat
  }

  lBoat() {

    const lBoat = Sprite.from('boatBig')
    this.default(lBoat, {
      scale: 0.22,
      position: [this.midW, this.midH - 10]
    })

    return lBoat
  }  

  mask() {
    const spotlightSize = 300
    const canvas = document.createElement('canvas')
    canvas.width = spotlightSize
    canvas.height = spotlightSize
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(spotlightSize/2, spotlightSize/2, 0, spotlightSize/2, spotlightSize/2, spotlightSize/2-30 )
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad
    ctx.fillRect(0,0,spotlightSize,spotlightSize)


    const spotlightSprite = Sprite.from(canvas)
    spotlightSprite.anchor.set(0.5)
    return spotlightSprite
  }



  blank() {
    const container = new Container()



    container.position.set(this.w, this.h)
    return container
  }

  

}


















































async function preload() {

  const assets = [
      { alias: 'background', src: '/img/base.jpg' },
      { alias: 'torpedo', src: '/img/torpedo.svg'},
      { alias: 'mark1', src: '/img/mark1.svg'},
      { alias: 'mark2', src: '/img/mark2.svg'},
      { alias: 'mark3', src: '/img/mark3.svg'},
      { alias: 'radar', src: '/img/radar.svg'},
      { alias: 'water', src: '/img/water.jpg'},
      { alias: 'waterDis', src: '/img/waterDis.jpg'},
      { alias: 'boatBig', src: '/img/boatBig.png'},
      { alias: 'boatSmall', src: '/img/boatSmall.png'},
//      { alias: 'texture1', src: '/img/gau.jpg' },
//      { alias: 'texture2', src: '/img/blockInv.jpg' },
  ]

  Assets.addBundle('fonts', [
    { alias: 'ignite', src: '/public/font/ignite.otf' },
    { alias: 'proximaNovaEC', src: '/public/font/proximaNovaEC.woff' },
]);

//proximaNova-extraCondensed.otf

  await Assets.load(assets)
  await Assets.loadBundle('fonts');

}

// on run
(async () => {
  const containers = []
  await setup()
  await preload()

  // ---- universals
  const w = 764
  const h = 1080
  const midW = app.screen.width/2
  const midH = app.screen.height/2

  // ----
  const build = new teruzuki()


  // ---- set-up background


  const waterLayer = new Container()


  const waterDis = Sprite.from('waterDis')
  waterDis.texture.baseTexture.wrapMode = 'repeat'
  app.stage.addChild(waterDis)


  const majorWaterDis = new DisplacementFilter({
    sprite: waterDis,
    scale: {
        x: 200,
        y: 200
    },
  })

  const minorWaterDis = new DisplacementFilter({
    sprite: waterDis,
    scale: {
        x: 5,
        y: 3
    },
  })

  const inWaterContainerShock = new ShockwaveFilter()
  inWaterContainerShock.center.x = app.screen.width
  inWaterContainerShock.center.y = app.screen.height
  inWaterContainerShock.amplitude = 100
  inWaterContainerShock.wavelength = 50
  inWaterContainerShock.speed = 2000
  inWaterContainerShock.brightness = 2


  const background = Sprite.from('background')
  background.height = app.screen.height
  background.width = app.screen.width
  background.alpha = 0.0
  app.stage.addChild(background)

  // ----

  const inWaterContainer = new Container()

  // in water elements
  const waterEles = []
  for(let i = 0; i < 2; i++) {
    const tempCont = new Container()
    const water = build.water()
    const radar = build.radar()
    const jpEle = build.jpBox()
    const edgeMarks = build.edges()
    const headerText = build.headerText()
    const major = new Container()
    const minor = new Container()
    major.filters = [ majorWaterDis ]
    major.addChild(water)
    minor.filters = [ minorWaterDis ]
    minor.addChild(radar, jpEle, edgeMarks, headerText)
    tempCont.addChild(major, minor)
    waterEles.push(tempCont)
  }

  containers.push(...waterEles)
  containers.push(inWaterContainer)

  // ----

  // ---- boats
  const boats = new Container()
  const boatSmall = build.sBoat() // small
  const boatBig = build.lBoat() // big
  boats.addChild(boatSmall, boatBig)
  containers.push(boats)

  // ----


  containers.forEach(v=> app.stage.addChild(v))



  // post resize
  const height = window.innerHeight
  const width = window.innerHeight * 764/1080
  const resizeFactor = Math.ceil(window.innerHeight/1080)
  app.stage.scale.set(resizeFactor)
  app.renderer.resize(764 * resizeFactor, 1080 * resizeFactor)

  const canvas = document.querySelector('canvas')
  canvas.style.height = height+'px'
  canvas.style.width = width+'px'

  app.stage.children.forEach(child => {
    stageResizeProcessor(child, Text, {fn: (v)=>{ v.resolution = resizeFactor;  }})
  })




  const mouse = {
    enter: false
  }

  const spotlight = build.mask()
  waterEles[1].mask = spotlight
  app.stage.addChild(spotlight)

  const adj = new AdjustmentFilter({
    blue: 1.7,
    green:1.5,
    red: 1,
    brightness: 1.5,
    saturation: 3
  })
  const bloom = new AdvancedBloomFilter({
    threshold: 0.5,
    bloomScale: 0.3,
    blur: 8
})




  const parameters = {}
  parameters.amplitude = 65
  gui.add(parameters, 'amplitude',0, 300, 0.5)
  parameters.radius = 30
  gui.add(parameters, 'radius',-1, 100, 1)
  parameters.speed = 90
  gui.add(parameters, 'speed',0, 1200, 1)
  parameters.wavelength = 60
  gui.add(parameters, 'wavelength',0, 1000, 1)
  parameters.beats = 8
  gui.add(parameters, 'beats',0, 100, 1)


  const shock = [],
  shockInstances = 5
  for(let i = 0; i < shockInstances; i++) {
    const filter = new ShockwaveFilter()
    filter.time = (parameters.beats/shockInstances) * i
    filter.amplitude = 0.0000000000000000001
    filter.radius = app.screen.width * (parameters.radius/100)
    filter.speed = parameters.speed
    filter.wavelength = parameters.wavelength
    shock.push(filter)
  }

  // const shock = new ShockwaveFilter()
  // shock.amplitude = parameters.amplitude
  // shock.radius = parameters.radius
  // shock.speed = parameters.speed
  // shock.wavelength = parameters.wavelength

  waterEles[1].filters = [ adj, bloom, ...shock ]
  waterEles[0].filters = [ ...shock ]

  let oldP = performance.now()
//  const canvas = document.querySelector('canvas')
  app.canvas.addEventListener('mousemove', (e)=> {
    mouse.percX = (e.clientX - e.target.offsetLeft) / e.target.offsetWidth
    mouse.percY = (e.clientY - e.target.offsetTop) / e.target.offsetHeight
    const x = mouse.x = (e.clientX - e.target.offsetLeft) / e.target.offsetWidth * 764
    const y = mouse.y = (e.clientY - e.target.offsetTop) / e.target.offsetHeight * 1080


    spotlight.position.set(x,y)

  })

  app.canvas.addEventListener('mouseenter', ()=> mouse.enter = true)
  app.canvas.addEventListener('mouseleave', ()=> mouse.enter = false)

  let DT = 0;
  const movementSpeed = 0.2;
  app.ticker.add(time => {
    DT += time.deltaTime * 0.01

    const angle = 2 * DT

    let dx = 0.5*30 - waterEles[0].x - 15;
    let dy = 0.5*30 - waterEles[0].y - 15;
    if(mouse.enter) {
      dx = mouse.percX*30 - waterEles[0].x - 15;
      dy = mouse.percY*30 - waterEles[0].y - 15;
    } 
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 1) { // Only move if not already at the target
        // Calculate movement amount based on speed
        const movementAmount = Math.min(movementSpeed, distance);
        const ratio = movementAmount / distance;

        waterEles.forEach(ele => {
          ele.position.x += dx * ratio;
          ele.position.y += dy * ratio;        
        })
        boats.position.x += dx * ratio;
        boats.position.y += dy * ratio;
    }    




    console.log(DT % parameters.beats)

    shock.forEach((filter, index, a) => {
      if(filter.time >= parameters.beats) {
        filter.time = 0
        if(mouse.enter) {
        filter.amplitude = parameters.amplitude
        filter.center = {x: spotlight.position.x/764 * app.screen.width, y: spotlight.position.y/1080 * app.screen.height }
        } else {
          filter.amplitude = 0.0000000000000000001
          filter.center = {x:0, y:0}
        }

        filter.radius = app.screen.width * (parameters.radius/100)
        filter.speed = parameters.speed
        filter.wavelength = parameters.wavelength
      } else {
        filter.amplitude *= 0.99  
        filter.time += 0.1;
      }
    })

    if(mouse.enter) {

//      const angle = 2 * DT

      adj.brightness = 1 + 0.7*Math.abs(Math.cos(angle))
      adj.green = 1.2 + 0.4*Math.abs(Math.sin(angle))
      adj.blue = 1.4 + 0.4*Math.abs(Math.cos(angle))
      waterEles[1].alpha = 0.6
//      waterEles[1].alpha = 0.1 + 0.4*Math.abs(Math.cos(angle))
      spotlight.scale.set(0.5 + 0.5*Math.abs(Math.cos(angle)))

    } else {
      waterEles[1].alpha -= 0.01
    }


    const boatBigWobble = 0.004 * Math.cos(angle)
    boatBig.position.y -= boatBigWobble * 10
    boatBig.rotation = boatBigWobble

    const boatSmallWobble = 0.02 * Math.sin(angle)
    boatSmall.position.y -= boatBigWobble * 10
    boatSmall.rotation = boatSmallWobble

    for(let i = 0; i < 2; i++) {
      waterEles[i].children[1].children[0].rotation += 0.004
    }
    waterDis.y += 1
    

    // shock.amplitude = parameters.amplitude
    // shock.radius = (parameters.radius <= 0) ? -1 : app.screen.width * 0.28
    // shock.speed = parameters.speed
    // shock.wavelength = parameters.wavelength  
  
  })

})();


// Recursive function to traverse the display hierarchy 
function stageResizeProcessor(item, type, action) {
  if (item instanceof type) {
    action.fn(item)
  }

  if (item instanceof Container) {
      item.children.forEach(child => {
        stageResizeProcessor(child, type, action); 
      });
  }
}
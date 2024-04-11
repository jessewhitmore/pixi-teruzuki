import { Sprite } from 'pixi.js'

export function addBackground(app, addto) {
    const background = Sprite.from('background')

    console.log(addto)

    background.anchor.set(0.5)

    if(app.screen.width > app.screen.height) {
        background.width = app.screen.width
        background.scale.y = background.scale.x
    } else {
        background.height = app.screen.height
        background.scale.x = background.scale.y
    }

    background.x = app.screen.width / 2
    background.y = app.screen.height / 2

    addto.addChild(background)
}
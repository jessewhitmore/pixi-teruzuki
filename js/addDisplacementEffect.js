import { Sprite, DisplacementFilter } from 'pixi.js'
import { AdjustmentFilter, AdvancedBloomFilter, DropShadowFilter } from 'pixi-filters'

export function addDisplacementEffect(app, addTo, stageEle) {
    // create sprite from the preloaded shit
    const sprite = Sprite.from('texture2')

    // allow to wrap
    sprite.texture.baseTexture.wrapMode = 'repeat'
    
    // set the displacement filter settings
    
    const filters = []

    const dis = new DisplacementFilter({
        sprite,
        scale: {
            x: 25,
            y: 10
        },
    })
    filters.push(dis)

    const adj = new AdjustmentFilter({
        green:1.08,
        brightness: 1.1,
        saturation: 0.95
    })
    filters.push(adj)

    const bloom = new AdvancedBloomFilter({
        threshold: 0.9,
        bloomScale: 0.7
    })
    filters.push(bloom)
        
    stageEle.sprite = sprite

    // apply filter to stage
    addTo.filters = filters
}
/*
AEB:
- Degradation
- Restoration
- PostStorm

Hex:
- Degradation
- Restoration
- PostStorm

Floodmasks:
- Degradation
- Restoration
- PostStorm
*/

class MapboxPaintManager {
    constructMapboxExpression(array) {
        return [array[0]].concat(
            this.breaks.slice(1).map(
                (x, i) => [x, array[i + 1]]
            ))
    }
}


class DiscreteColorSizeScale extends MapboxPaintManager {
    constructor(info, strokes, scale = 1) {
        super()
        this.breaks = info.breaks
        this.colorRamp = info.colorRamp
        this.sizeRamp = info.sizeRamp
        this.colorHeader = this.colorHeader
        this.legendSize = 100
        this.strokes = strokes
        this.scale = scale
    }

    get SizeRamp() {
        // console.log(this.sizeRamp.breaks.slice(1))
        return this.constructMapboxExpression(this.sizeRamp)
    }

    get ColorRamp() {
        return this.constructMapboxExpression(this.colorRamp)
    }

    get Filter() {
        return this.breaks[0]
    }

    colorHeader(colorValue) {
        return ['step', colorValue]
    }

    get joinedColorSize() {
        return this.colorRamp.map(
            (c, i) => {
                return {
                    color: c,
                    size: this.sizeRamp[i],
                    value: this.breaks[i]
                }
            }
        )
    }

    get Scale() {
        return this.scale
    }
}

class RasterInterpolatedSymbology {
    constructor(symbology) {
        this.breaks = symbology.breaks
        this.colors = symbology.colors
    }
}

class SimpleColorScale {
    constructor(strokes, scale = 1) {
        this.strokes = strokes
        this.scale = scale
    }
}

const BasicStrokes = {
    width: 0.05,
    color: 'white',
    opacity: 0.2,
    selected: {
        width: 10.0,
        color: 'cyan',
        opacity: 0.5,
    }
}

const BasicStrokes_Thick = {
    width: 1.5,
    color: 'white',
    opacity: 0.5,
    selected: {
        width: 10.0,
        color: 'cyan',
        opacity: 0.5,
    }
}

const SelectedTesselaStrokes = {
    width: 0.2,
    color: 'white',
    opacity: 0.5,
    selected: {
        width: 10.0,
        color: 'cyan',
        opacity: 0.5,
    }
}

const _Blue_5Step = {
    breaks: [0, 1000000, 10000000, 100000000, 1000000000],

    colorRamp: [
        'rgba(255, 255, 255, 0)',
        '#bae4bc',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}

const _Blue_5Step_0_1 = {
    breaks: [0, 0.2, 0.4, 0.6, 0.8],

    colorRamp: [
        'rgba(255, 255, 255, 0.35)',
        '#bae4bc',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}


const _YlOrRd_5Step = {
    breaks: [0, 0.02, 0.04, 0.06, 0.08],

    colorRamp: [
        'rgba(255, 255, 255, 0.05)',
        '#EEE02F',
        '#FFAF15',
        '#FF8315',
        '#FF5315'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}

const _YlOrRd_5Step_0_60 = {
    breaks: [0, 10, 20, 40, 60],

    colorRamp: [
        'rgba(255, 255, 255, 0.05)',
        '#EEE02F',
        '#FFAF15',
        '#FF8315',
        '#FF5315'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}


const _Blue_5Step_Small = {
    breaks: [0, 0.02, 0.05, 0.08, 0.1],

    colorRamp: [
        'rgba(255, 255, 255, 0.35)',
        '#bae4bc',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}



const _Blue_5Step_per_ha = {
    breaks: [0, 1000, 5000, 10000, 100000],

    colorRamp: [
        'rgba(255, 255, 255, 0)',
        '#bae4bc',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}

const _Floodmaps_Bathy = {
    breaks: [ 0, 1, 2, 3, 4 ],

    colorRamp: [
        'rgba(255, 255, 255, 0.8)',
        '#bae4bc',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
    ],

    sizeRamp: [10, 10, 10, 10, 10],

    legendScale: 3
}

const _Empty = {
    breaks: [0, 1000000, 10000000, 100000000, 1000000000],

    colorRamp: [
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 0)'
    ],

    sizeRamp: [5, 10, 15, 20, 25],

    legendScale: 3
}

export const Empty = new DiscreteColorSizeScale(_Empty, BasicStrokes)

export const Blue_5Step_0_1 = new DiscreteColorSizeScale(_Blue_5Step_0_1, BasicStrokes)

export const YlOrRd_5Step = new DiscreteColorSizeScale(_YlOrRd_5Step, BasicStrokes)

export const YlOrRd_5Step_0_60 = new DiscreteColorSizeScale(_YlOrRd_5Step_0_60, BasicStrokes)

export const Blue_5Step_Small = new DiscreteColorSizeScale(_Blue_5Step_Small, BasicStrokes)

export const Blue_5Step = new DiscreteColorSizeScale(_Blue_5Step, BasicStrokes)

export const Blue_5Step_per_ha = new DiscreteColorSizeScale(_Blue_5Step_per_ha, BasicStrokes)

export const SelectedTessela = new SimpleColorScale(SelectedTesselaStrokes)

export const FloodMaps_Bathy = new DiscreteColorSizeScale(_Floodmaps_Bathy, BasicStrokes)
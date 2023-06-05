
const canvas = document.querySelector('canvas')
const circleCountSlider = document.querySelector('.dotCount')
const circleSpeedSlider = document.querySelector('.dotSpeed')
const circleSizeSlider = document.querySelector('.dotSize')
const circleColorSlider = document.querySelector('.dotColor')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

var mouse = {x: undefined, y: undefined}
var circleCount = 50
var circleSpeed = 1
var circleSize = 1
var circleColor = 1

var colorArray = ['#F4EEE0', '#F4EEE0', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

draw()

window.addEventListener('mousemove', 
function(event) {
    mouse.x = event.x
    mouse.y = event.y
})

circleCountSlider.addEventListener('mouseup', function() {
    circleCount = circleCountSlider.value
    console.log(circleSpeed)
    draw()
})

circleSpeedSlider.addEventListener('mouseup', function() {
    circleSpeed = circleSpeedSlider.value
    console.log(circleSpeed)
    draw()
})

circleSizeSlider.addEventListener('mouseup', function() {
    circleSize = circleSizeSlider.value
    console.log(circleSpeed)
    draw()
})

circleColorSlider.addEventListener('mouseup', function() {
    circleColor = circleColorSlider.value
    console.log(circleSpeed)
    draw()
})

function circle(x, y, dx, dy, radius, circleArray) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = colorArray[circleColor]
        c.stroke()
        c.fillStyle = colorArray[circleColor]
        c.fill()

        for(var i = 0; i < circleArray.length; i++) {
            var pos = {x: circleArray[i].x, y: circleArray[i].y}
            for(var j = 0; j < circleArray.length; j++) {
                var pos2 = {x: circleArray[j].x, y: circleArray[j].y}
                if(pos.x < pos2.x && pos2.x - 100 < pos.x &&
                    pos.y < pos2.y && pos2.y - 100 < pos.y
                ) {
                    c.beginPath()
                    c.strokeStyle = colorArray[circleColor]
                    c.shadowBlur = 0
                    c.moveTo(pos.x, pos.y)
                    c.lineTo(pos2.x, pos2.y)
                    c.stroke()
                }
            }
        }
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if(this.y + this.radius > innerHeight ||this. y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        if(mouse.x - this.x < 100 && mouse.x - this.x > -100 
            && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
                if(this.radius < 50 * circleSize) {
                    this.radius += 1 * circleSize
                }
        } else if(this.radius > ((Math.random() * 10) + 7) * circleSize) {
            this.radius -= 1
        }

        this.draw()

    }
}

function draw() {
    var circleArray = []

    for(var i = 0; i < circleCount; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius
        var y = Math.random() * (innerHeight - radius * 2) + radius
        var dx = (Math.random() - 0.5) * circleSpeed
        var dy = (Math.random() - 0.5) * circleSpeed
        var radius = ((Math.random() * 6) + 3) * circleSize

        circleArray.push(new circle(x, y, dx, dy, radius, circleArray))
    }

    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, innerWidth, innerHeight)

        for(var i = 0; i < circleArray.length; i++) {
            circleArray[i].update()
        }

    }

    animate()
}
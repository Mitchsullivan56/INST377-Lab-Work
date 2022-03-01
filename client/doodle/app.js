document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let uptimerId
    let downtimerId
    let isJumping = true
    let startPoint = 150
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }
   
    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) { 
            let platGap = 600 / platformCount
            let newPlatformBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }

    function jump() {
        clearInterval(downtimerId)
        isJumping = true
        uptimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        },30)
    }


    function fall() {  
        clearInterval(uptimerId)
        isJumping = false
        downtimerId = setInterval(function () {
            doodlerBottomSpace -= 5 
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) && 
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })

        },30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(uptimerId)
        clearInterval(downtimerId)
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            moveLeft()
        } else if (e.key === "ArrowRight") {
            //move right
        } else if (e.key === "ArrowUp") {
            //moveStraigh
        }
    }

    function moveLeft () {
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
            doodlerLeftSpace -= 5
            doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight()
        },30)
    }

    function moveRight () {
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 50
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
        },30)
    }

    function start() {
            if (!isGameOver) {
                createPlatforms()
                createDoodler()
                setInterval(movePlatforms,30)
                jump()
                document.addEventListener('keyup',control)
            }
    }
    //attach button
    start()
})
const circleCollision = (circle1,circle2 )=> {
    const xDiff = circle1.position.x - circle2.position.x
    const yDiff = circle1.position.y - circle2.position.y
    const distance = Math.sqrt(xDiff**2 + yDiff**2)

    if (distance <= circle1.radius + circle2.radius ) {
        return true 
    }

    return false
}

export default circleCollision
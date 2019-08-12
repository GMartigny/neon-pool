const friction = 0.0035;

export default (component, getForces) => {
    const previous = component.position.clone();

    if (component.previousPosition) {
        const speed = component.position.clone()
            .subtract(component.previousPosition);

        const slowDown = Math.max(Math.exp(-speed.distance() * 25), friction);

        speed.multiply(1 - slowDown);
        component.position.add(speed);
    }

    component.position.add(getForces(component));

    component.previousPosition = previous;
};

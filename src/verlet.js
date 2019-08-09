const friction = 1 - 0.0035;

export default (component, getForces) => {
    const previous = component.position.clone();

    if (component.previousPosition) {
        const speed = component.position.clone()
                .subtract(component.previousPosition);

        speed.multiply(friction);
        component.position.add(speed);
    }

    component.position.add(getForces(component));

    component.previousPosition = previous;
};

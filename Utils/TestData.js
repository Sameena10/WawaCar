export function generateRandomTaskName() {

    const randomNumber = Math.floor(
        Math.random() * 100000
    );

    return `Auto Task ${randomNumber}`;

}
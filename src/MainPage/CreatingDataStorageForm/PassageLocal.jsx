export default function PassageLocal(props) {
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
        const array1 = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (array1.who === props) {
            array.push(array1);
        }
    }
    return array;
}
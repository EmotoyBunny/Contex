export default function CheckData(props) {
    let iChars = "/^[\\-0-9a-zA-Z\\.\\+_]+@[\\-0-9a-zA-Z\\.\\+_]+\\.[a-zA-Z]{2,}$/";
    let bool = true;
    for (let i = 0; i < props.length; i++) {
        if (iChars.indexOf(props.charAt(i)) !== -1) {
            return bool = false;
        }
    }
    return bool;
}
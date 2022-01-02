export default function formatNumber(number) {
    if(number === 0){
        return number
    }
    let k = "";
    while (number >=1000){
        number/=1000;
        k+="K";
    }
    const n = number.toLocaleString('en-US', {
        useGrouping: false,
        maximumFractionDigits: 2
    }).split('.');
    return [n[0],'.',n[1],k].join('')
}
//Bella White
import Mirr from './CarMirr.js';
import NoMirr from './CarNoMirr.js';

export default function CarPicker({mirr, w, h}){
    if(mirr){
        return(<Mirr width={w} height={h}/>);
    } else {
        return(<NoMirr width={w} height={h}/>);
    }
}
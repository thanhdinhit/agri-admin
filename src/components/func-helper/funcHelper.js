/*function encode and decode the code get in firebase
name: decode_encode_string
code: code string
key: key change (note: same as with key in code, example: mode, control,elbow1f, elbow2f,elbow3f, pump )
value: value change
 */
export const decode_encode_string = (code, key, value) => {
    let arrKeyCode = ["mode", "control", "elbow1f", "elbow2f", "elbow3f", "pump"];
    let encode = '';
    if (code != null && code.trim() != "") {
        const deocde = code.split('*');
        let mode = deocde[1].substring(1, 2);
        let control = deocde[2].substring(1, 2);
        let elbow1 = deocde[3].split('#');
        let elbow1f = elbow1[0].substring(2);
        let elbow2 = deocde[4].split('#');
        let elbow2f = elbow2[0].substring(2);
        let elbow3 = deocde[5].split('#');
        let elbow3f = elbow3[0].substring(2);
        let pump = deocde[6].substring(1, 2);
        if (arrKeyCode.indexOf(key) > -1) {
            switch (key) {
                case "mode":
                    mode = value;
                    break;
                case "control":
                    control = value;
                    break;
                case "elbow1f":
                    elbow1f = value;
                    break;
                case "elbow2f":
                    elbow2f = value;
                    break;
                case "elbow3f":
                    elbow3f = value;
                    break;
                case "pump":
                    pump = value;
                    break;
                default:
                    break;
            }
        }
        encode = "*m" + mode + "#m*c" + control + "#c*1e" + elbow1f + "#1e*2e" + elbow2f + "#2e*3e" + elbow3f + "#3e*p" + pump + "#p";
    }
    return encode;
}

export const decode_string_firebase = (code) => {
    let arrVal = [];
    if (code != null && code.trim() != "") {
        const deocde = code.split('*');
        let temp = deocde[1].split('#');
        let tempf = temp[0].substring(1);
        arrVal.push(tempf);
        let humi = deocde[2].split('#');
        let humif = humi[0].substring(1);
        arrVal.push(humif);
        let dis = deocde[3].split('#');
        let disf = dis[0].substring(1);
        arrVal.push(disf);
        let light = deocde[4].split('#');
        let lightf = light[0].substring(1);
        arrVal.push(lightf);
        let gas = deocde[5].split('#');
        let gasf = gas[0].substring(1);
        arrVal.push(gasf);
    }
    return arrVal;
}

export const decode_control_string_firebase = (code) => {
    let arrVal = [];
    if (code != null && code.trim() != "") {
        const deocde = code.split('*');
        let mode = deocde[1].substring(1, 2);
        arrVal.push(mode);
        let control = deocde[2].substring(1, 2);
        arrVal.push(control);
        let elbow1 = deocde[3].split('#');
        let elbow1f = elbow1[0].substring(2);
        arrVal.push(elbow1f);
        let elbow2 = deocde[4].split('#');
        let elbow2f = elbow2[0].substring(2);
        arrVal.push(elbow2f);
        let elbow3 = deocde[5].split('#');
        let elbow3f = elbow3[0].substring(2);
        arrVal.push(elbow3f);
        let pump = deocde[6].substring(1, 2);
        arrVal.push(pump);
    }
    return arrVal;
}
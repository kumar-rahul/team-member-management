export const isEmpty: (obj: any) => boolean = (obj) => {
    if (obj !== null && obj !== undefined) {
        if (typeof obj === "string") {
            if (obj.trim() === "" || obj == "null") {
                return true;
            }          
            return false;
        } else if (obj.length <= 0) {
            return true;
        } else if (typeof obj === 'object') {
            let keys = Object.keys(obj);
            let len = keys.length;
            if (len <= 0) {
                return true;
            }
            return false;
        }
    }
    return true;
}
export default {

    convertObjToUrl(searchReq) {
        let esc = encodeURIComponent;
        return Object.keys(searchReq)
            .map(k => esc(k) + '=' + esc(searchReq[k]))
            .join('&');
    },
}
import CryptoJS from 'crypto-js'

CryptoJS.pad.ZeroPadding = {
    pad: function(e, t) {
        var n = 4 * t;
        e.clamp(),
        e.sigBytes += n - (e.sigBytes % n || n)
    },
    unpad: function(e) {
        var t = e.words
          , n = e.sigBytes - 1;
        for (n = e.sigBytes - 1; n >= 0; n--)
            if (t[n >>> 2] >>> 24 - n % 4 * 8 & 255) {
                e.sigBytes = n + 1;
                break
            }
    }
};
function MXKpayEncrypt(e, t, n) {
    // e: token_timesteamp
    // t: undefined
    // n: undefined

    var l = CryptoJS.enc.Utf8.parse("KEYIVHUIHAOPAY21")
      , d = CryptoJS.enc.Utf8.parse("KEYIVHUIHAOPAY21")
      , c = "mxkpayScoket!@#123,";

    var i = l
      , r = d
      , a = "";
    t && (i = CryptoJS.enc.Utf8.parse(t), r = CryptoJS.enc.Utf8.parse(n)),
    e && (a = e);
    var s = CryptoJS.enc.Utf8.parse(a)
      , c = CryptoJS.AES.encrypt(s, i, {
        iv: r,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(c.ciphertext)
}
export default MXKpayEncrypt
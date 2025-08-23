// ---------- 字符串 -> 十六进制 ----------
function stringToHex(str, { prefix = true, upperCase = false } = {}) {
    // 优先走 Web 标准 API（浏览器/Node18+ 都有）
    const bytes =
        typeof TextEncoder !== "undefined"
            ? new TextEncoder().encode(str)
            : Buffer.from(str, "utf8"); // 旧版 Node 兜底

    let hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
    if (upperCase) hex = hex.toUpperCase();
    return prefix ? "0x" + hex : hex;
}

// ---------- 十六进制 -> 字符串 ----------
function hexToString(hex) {
    if (typeof hex !== "string") throw new TypeError("hex 必须是字符串");
    let s = hex.trim();
    if (s.startsWith("0x") || s.startsWith("0X")) s = s.slice(2);
    if (s.length % 2) s = "0" + s; // 奇数位自动左补 0
    if (!/^[0-9a-fA-F]*$/.test(s)) throw new Error("含非十六进制字符");

    // 转回字节
    const len = s.length / 2;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = parseInt(s.substr(i * 2, 2), 16);
    }

    // 解码 UTF-8
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder("utf-8").decode(bytes);
    } else {
        return Buffer.from(bytes).toString("utf8"); // 旧版 Node 兜底
    }
}


const hex = stringToHex("一年一百万", { prefix: true, upperCase: true });
// 0x48656C6C6F2C20E4B896E7958C
console.log(hex);

const str = hexToString(hex);
console.log(str);

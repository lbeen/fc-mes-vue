export function formatDateTime(date) {
    return format(date, 'yyyy-MM-dd hh:mm:ss')
}

export function format0OClock(date) {
    return format(date, 'yyyy-MM-dd 00:00:00')
}

function format(date, fmt) {
    const opt = {
        'y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
    }
    for (const k in opt) {
        const ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
        }
    }
    return fmt
}
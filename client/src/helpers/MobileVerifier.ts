const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
     /Windows Phone/i
];
        
export const verify = toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
})


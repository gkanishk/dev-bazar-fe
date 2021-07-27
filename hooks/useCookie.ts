export function set_cookie(name, value) {
    document.cookie = name +'='+ value +'; Path=/;';
}

export function delete_cookie(name) {
document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(element) {
      let [key,value] = element.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[name];
}
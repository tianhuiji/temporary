var images_pre = new Array()
function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        images_pre[i] = new Image()
        images_pre[i].src = preload.arguments[i]
    }
}
preload(
    "img/default/default_avatar.png",
    "img/default/no_optional.png"
)
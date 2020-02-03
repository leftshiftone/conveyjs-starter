export function disableLogging() {
    console.log = function () {
    };
    console.info = function () {
    };
    console.debug = function () {
    };
}


var niceErrorsNames = ["TypeError: Failed to fetch"]
var niceErrorsMsgs = ["Failed to fetch server statistics, please reload and try again."]


function getNiceErrorMsg(error){
    if(niceErrorsNames.includes(error)){
        let index = niceErrorsNames.indexOf(error);
        let niceMsg = niceErrorsMsgs[index]
        return niceMsg
    } else {
        return error
    } 
}
export {getNiceErrorMsg}
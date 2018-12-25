const mutations = {
    SHOW_LOADING(state,flag){
        state.show_loading = flag
    },
    SHOW_MSG(state,content){
        state.msg.content = content
        state.msg.show = true
        setTimeout(() => {
            state.msg.show = false
        },state.msg.time)
    },
    SET_USER_END_TIME(state,flag){
        state.userEndTime = flag
    },
    SET_LOGIN_TO(state,flag){
        state.loginTo = flag
    },
    SET_INFO(state,content){
        const infoObj=Object.assign({},state.info,content);
        state.info=infoObj;
        localStorage.setItem('info',JSON.stringify(infoObj))
    },
    SET_CUR_TENDER_INFO(state,content){
        const tenderInfoObj=Object.assign({},content);
        state.curTenderInfo=tenderInfoObj;
        localStorage.setItem('curTenderInfo',JSON.stringify(tenderInfoObj))
    },
    SET_MESSAGE_INFO(state,content){
        const infoObj=Object.assign({},state.messageInfo,content);
        state.messageInfo=infoObj;
        localStorage.setItem('messageInfo',JSON.stringify(infoObj))
    },
}
export default mutations
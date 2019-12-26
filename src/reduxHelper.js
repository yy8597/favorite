const identity = (arg) => arg;

module.exports = {
    createAction,
    createActions,
    createReducer,
    createRedux,
    actionHelper: {
        merge,
        mergeOn,
        replaceWithOn,
    }
    
}

function createAction (type, {...ext}) {
    if(type === undefined) {
        throw('[createAction()] type must be defined.');
        return;
    }

    const payloadReducer = ext.payloadReducer || identity;
    const promiseCreator = ext.promiseCreator;
    const actionCreator = function (...args){
        const action = {
            type: type,
            payload: payloadReducer(...args)
        }

        if(typeof promiseCreator === 'function') {
            action.promise = promiseCreator(...args);
        }
        return action;
    }
    actionCreator.toString = () => type;
    return actionCreator;
}

function createActions(actionNames = [], moduleName = '') {
    return actionNames.reduce((actions, action) => {
        actions[action] = createAction(`@${moduleName}/${action}`)
        return actions
    }, {})
}


function createReducer (handlers = {}, defaultState = {}) {
    function has(actionCreator) {
        return !!handlers[actionCreator.toString()];
    }

    return function (state = defaultState, action) {
        if(has(action.type)){
            return handlers[action.type](
                state, 
                action.ready ? action.result : action.payload, 
                action.ready,
                //action // 不到万不得已不要使用！！！
            );
        }
        else {
            return state;
        }
    }
}

function createRedux (moduleName = '', handlers = {}, defaultState = {}) {
    const redux = Object.keys(handlers).map(actionName => {
        return [actionName, createAction(`@${moduleName}/${actionName}`), handlers[actionName]]
    }).reduce((redux, [actionName, action, reducer]) => {
        redux.actions[actionName] = action
        redux.reducer[action] = reducer
        return redux
    }, {actions: {}, reducer: {}})
    redux.reducer = createReducer(redux.reducer, defaultState)

    return redux
}

function merge() {
    return  (state, payload) => {
        return {
            ...state,
            ...payload
        }
    }
}

function mergeOn(attr, silent) {
    return  (state, payload) => {
        if(!silent) {
            return {
                ...state,
                [attr]: {
                    ...state[attr],
                    ...payload,
                }
            }
        }

        state[attr] = {
            ...state[attr],
            ...payload,
        }
        return state
    }
}


function replaceWithOn(attr) {
    return  (state, payload) => {
        return {
            ...state,
            [attr]: payload
        }
    }
}


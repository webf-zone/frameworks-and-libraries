import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// instantiate the store
const store = createStore(
    combineReducers({ projectReducer: projectReducer }),
    applyMiddleware(createLogger(), thunk)
);

// handlers
document.querySelector('#new').addEventListener('click', () => {
    store.dispatch({
        type: 'ADD', // expression
        payload: {
            project: document.querySelector('#p_name').value,
            goal: document.querySelector('#p_goal').value,
            funded: document.querySelector('#p_funded').value === 'Yes'
        }
    });
});

document.querySelector('#projects').addEventListener('click', evt => {
    const projectId = evt.target.getAttribute('data-project-id');

    if (projectId) {
        store.dispatch({
            type: 'DELETE', // expression
            payload: {
                id: Number(projectId)
            }
        });
    }
});

document.querySelector('#delete_all').addEventListener('click', () => {
    store.dispatch({
        type: 'FETCH',
        payload: {
            idCache: 0,
            projects: []
        }
    });
});

document.querySelector('#reset').addEventListener('click', () => {
    readyOrReset('RESET');
});

// subscriber
function render () {
    const state = store.getState();
    const listEl = document.querySelector('#projects');
    const counterEl = document.querySelector('#counter');
    const loadingText = '... Loading';

    if (state.projectReducer.loading) {
        listEl.innerHTML = loadingText;
        counterEl.innerHTML = loadingText;
    } else {
        const projects = state.projectReducer.projects;

        counterEl.innerText = projects.length;

        const projectList = projects.map(project => {
            return [
                '<li class="list-group-item justify-content-between align-items-center d-flex">',
                project.name,
                '<span class="badge badge-primary badge-pill">',
                project.goal,
                '</span>',
                '<button data-project-id="',
                project.id,
                '" type="button" class="btn btn-outline-danger">X</button>',
                '</li>'
            ].join('');
        });

        listEl.innerHTML = projectList.join('');
    }
}

// assign the subscriber
store.subscribe(render);

// reducer
function projectReducer (
    state = {
        idCache: 0,
        projects: []
    },
    action
) {
    switch (action.type) {
        case 'ADD': // expression
            const newId = state.idCache + 1;

            return {
                ...state,
                loading: !!action.payload.loading,
                idCache: newId,
                projects: [
                    ...state.projects,
                    {
                        id: newId,
                        name: action.payload.project,
                        goal: action.payload.goal,
                        funded: !!action.payload.funded
                    }
                ]
            };
        case 'DELETE': // expression
            return {
                ...state,
                loading: !!action.payload.loading,
                projects: [
                    ...state.projects.filter(project => {
                        return project.id !== action.payload.id;
                    })
                ]
            };
        case 'RESET': // expression
        case 'READY': // expression
        case 'DELETE_ALL': // expression
        case 'FETCH': // expression
            return {
                ...state,
                loading: !!action.payload.loading,
                idCache: action.payload.idCache,
                projects: [...action.payload.projects]
            };
    }

    return state;
}

// on load
readyOrReset('READY');

function readyOrReset (evtType) {
    store.dispatch(dispatch => {
        dispatch({
            type: 'FETCH',
            payload: {
                loading: true,
                idCache: 0,
                projects: []
            }
        });

        fetchProjects().then(projects => {
            dispatch({
                type: evtType,
                payload: {
                    idCache: projects.length,
                    projects: [...projects]
                }
            });
        });
    });
}

function fetchProjects () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Mission to Mars',
                    goal: 1000,
                    funded: false
                },
                {
                    id: 2,
                    name: 'Mission to Venus',
                    goal: 1000,
                    funded: false
                }
            ]);
        }, 2000);
    });
}

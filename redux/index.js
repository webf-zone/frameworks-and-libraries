import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// instantiate the store
const store = createStore(
    combineReducers({ projectReducer: projectReducer }),
    applyMiddleware(createLogger())
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
        type: 'DELETE_ALL' // expression
    });
});

document.querySelector('#reset').addEventListener('click', () => {
    store.dispatch({
        type: 'RESET' // expression
    });
});

// subscriber
function render () {
    const projects = store.getState().projectReducer.projects;

    document.querySelector('#counter').innerText = projects.length;

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

    document.querySelector('#projects').innerHTML = projectList.join('');
}

// assign the subscriber
store.subscribe(render);

// reducer
function projectReducer (
    state = {
        idCache: 2,
        projects: [
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
        ]
    },
    action
) {
    switch (action.type) {
        case 'ADD': // expression
            const newId = state.idCache + 1;

            return {
                ...state,
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
                projects: [
                    ...state.projects.filter(project => {
                        return project.id !== action.payload.id;
                    })
                ]
            };
        case 'RESET': // expression
            return {
                ...state,
                idCache: 2,
                projects: [
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
                ]
            };
        case 'DELETE_ALL': // expression
            return {
                ...state,
                idCache: 0,
                projects: []
            };
    }

    return state;
}

// on load
render();

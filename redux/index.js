// instantiate the store
const store = Redux.createStore(projectReducer);

// handlers
document.querySelector('#new').addEventListener('click', () => {
    store.dispatch({
        type: 'ADD', // expression
        payload: (() => {
            return {
                project: document.querySelector('#p_name').value,
                goal: document.querySelector('#p_goal').value,
                funded: document.querySelector('#p_funded').value === 'Yes'
            };
        })()
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
    document.querySelector(
        '#counter'
    ).innerText = store.getState().projects.length;

    const projectList = store.getState().projects.map(project => {
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
function projectReducer (state, action) {
    const initialProjects = [
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
    ];

    if (typeof state === 'undefined') {
        state = {
            idCache: 2,
            projects: initialProjects
        };
    }

    switch (action.type) {
        case 'ADD': // expression
            return {
                ...state,
                idCache: state.idCache + 1,
                projects: [
                    ...state.projects,
                    {
                        id: state.id + 1,
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
                projects: [...initialProjects]
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
